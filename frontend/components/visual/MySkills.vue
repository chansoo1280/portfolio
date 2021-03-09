<template>
  <div id="container">
    <canvas id="c"></canvas>
    <div id="labels"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { Texture } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js'
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {}
  },
  mounted() {
    const raycaster = new THREE.Raycaster()
    const WrapWidth = window.innerWidth * 0.4
    const WrapHeight = window.innerWidth * 0.4
    let group, camera, scene, renderer, controls
    const mouse = {
      x: 0,
      y: 0,
    }
    init()
    animate()

    function init() {
      const canvas = document.querySelector('#c')
      const labelContainerElem = document.querySelector('#labels')
      scene = new THREE.Scene()
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(WrapWidth, WrapHeight)

      // camera

      camera = new THREE.PerspectiveCamera(40, WrapWidth / WrapHeight, 1, 1000)
      camera.position.set(15, 20, 20)
      scene.add(camera)

      // controls

      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableZoom = false
      controls.rotateSpeed = 0.4
      // controls.minDistance = 20
      // controls.maxDistance = 50
      // controls.maxPolarAngle = Math.PI / 2

      // ambient light

      scene.add(new THREE.AmbientLight('#222222'))

      // point light

      const light = new THREE.PointLight('#ffffff', 0.8)
      light.position.set(25, 50, 50)
      camera.add(light)

      // helper

      // scene.add(new THREE.AxesHelper(20))

      // textures

      const loader = new THREE.TextureLoader()

      group = new THREE.Group()
      scene.add(group)

      // points

      let dodecahedronGeometry = new THREE.DodecahedronGeometry(10)

      // if normal and uv attributes are not removed, mergeVertices() can't consolidate indentical vertices with different normal/uv data

      dodecahedronGeometry.deleteAttribute('normal')
      dodecahedronGeometry.deleteAttribute('uv')

      dodecahedronGeometry = BufferGeometryUtils.mergeVertices(
        dodecahedronGeometry
      )
      const material = new THREE.PointsMaterial({
        color: 'transparent',
        size: 0.2, // 글로벌 단위
      })
      const points = new THREE.Points(dodecahedronGeometry, material)
      group.add(points)
      const positionAttribute = points.geometry.getAttribute('position')
      const vertices = []
      for (let i = 0; i < positionAttribute.count; i++) {
        const vertex = new THREE.Vector3()
        vertex.fromBufferAttribute(positionAttribute, i)
        group.children[0].localToWorld(vertex)
        const x = ((vertex.x / 10) * 0.5 + 0.5) * canvas.clientWidth
        const y = ((vertex.y / 10) * -0.5 + 0.5) * canvas.clientHeight
        const z = (vertex.z / 10) * -0.5 + 0.6
        const elem = document.createElement('div')
        elem.textContent = i
        elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)scale(${z})`
        labelContainerElem.appendChild(elem)

        // labelContainerElem.children[
        //   i
        // ].style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`
        // vertices.push(vertex)
      }
      // convex hull

      // const meshMaterial = new THREE.MeshLambertMaterial({
      //   color: '#ffffff',
      //   opacity: 0.5,
      //   transparent: true,
      // })

      // const meshGeometry = new ConvexGeometry(vertices)

      // const mesh1 = new THREE.Mesh(meshGeometry, meshMaterial)
      // mesh1.material.side = THREE.BackSide // back faces
      // mesh1.renderOrder = 0
      // group.add(mesh1)

      // const mesh2 = new THREE.Mesh(meshGeometry, meshMaterial.clone())
      // mesh2.material.side = THREE.FrontSide // front faces
      // mesh2.renderOrder = 1
      // group.add(mesh2)
      labelContainerElem.addEventListener('mouseover', onLabelMouseOver)
      labelContainerElem.addEventListener('mouseleave', onLabelMouseLeave)
      canvas.addEventListener('mousemove', onDocumentMouseMove, false)
      window.addEventListener('resize', onWindowResize)
    }
    function onLabelMouseOver() {
      controls.enabled = false
    }
    function onLabelMouseLeave() {
      controls.enabled = true
    }
    function onWindowResize() {
      camera.aspect = WrapWidth / WrapHeight
      camera.updateProjectionMatrix()

      renderer.setSize(WrapWidth, WrapHeight)
    }
    function onDocumentMouseMove(event) {
      // the following line would stop any other event handler from firing
      // (such as the mouse's TrackballControls)
      // event.preventDefault();

      // update the mouse variable
      mouse.x = (event.offsetX / WrapWidth) * 2 - 1
      mouse.y = -(event.offsetY / WrapHeight) * 2 + 1
    }
    function animate() {
      const canvas = document.querySelector('#c')
      const labelContainerElem = document.querySelector('#labels')
      requestAnimationFrame(animate)
      // raycaster.setFromCamera(mouse, camera)
      // const intersects = raycaster.intersectObjects(group.children, true)
      if (controls.enabled === true) {
        group.rotation.y += 0.002
        group.rotation.x += 0.002
      }
      // if (intersects.length !== 0) {
      //   // controls.enabled = true
      // } else {
      //   // controls.enabled = false
      // }
      const pointsGeometry = group.children[0].geometry
      const positionAttribute = pointsGeometry.getAttribute('position')
      const vertices = []
      for (let i = 0; i < positionAttribute.count; i++) {
        const vertex = new THREE.Vector3()
        vertex.fromBufferAttribute(positionAttribute, i)
        group.children[0].localToWorld(vertex)
        const x = ((vertex.x / 10) * 0.5 + 0.5) * canvas.clientWidth
        const y = ((vertex.y / 10) * -0.5 + 0.5) * canvas.clientHeight
        const z = (vertex.z / 10) * -0.5 + 0.6
        labelContainerElem.children[i].style.zIndex = (z / 3 + 0.8) * 10
        labelContainerElem.children[
          i
        ].style.transform = `translate(-50%, -50%) translate(${y}px,${x}px)scale(${
          z / 3 + 0.8
        })`
      }
      // for (let i = 0; i < vertices.length; i++) {
      //   tempV.project(camera)
      //   const x = (tempV.x * 0.5 + 0.5) * canvas.clientWidth
      //   const y = (tempV.y * -0.5 + 0.5) * canvas.clientHeight
      //   console.log(x, y)
      //   // 이름표 요소를 해당 좌표로 옮깁니다.
      //   labelContainerElem.children[
      //     i
      //   ].style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`
      // }
      render()
    }

    function render() {
      renderer.render(scene, camera)
    }
  },
})
</script>

<style lang="scss" scoped>
#container {
  position: relative;
  width: 100%;
  height: 100%;
  & > canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
