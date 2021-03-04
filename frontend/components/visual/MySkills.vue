<template>
  <div id="container">
    <canvas id="c"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
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
    let group, camera, scene, renderer, controls
    const mouse = {
      x: 0,
      y: 0,
    }

    init()
    animate()

    function init() {
      const canvas = document.querySelector('#c')
      scene = new THREE.Scene()
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)

      // camera

      camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        1000
      )
      camera.position.set(15, 20, 30)
      scene.add(camera)

      // controls

      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableZoom = false
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

      //   scene.add(new THREE.AxesHelper(20))

      // textures

      const loader = new THREE.TextureLoader()
      const texture = loader.load('textures/sprites/disc.png')

      group = new THREE.Group()
      scene.add(group)

      // points

      let dodecahedronGeometry = new THREE.IcosahedronGeometry(8)

      // if normal and uv attributes are not removed, mergeVertices() can't consolidate indentical vertices with different normal/uv data

      dodecahedronGeometry.deleteAttribute('normal')
      dodecahedronGeometry.deleteAttribute('uv')

      dodecahedronGeometry = BufferGeometryUtils.mergeVertices(
        dodecahedronGeometry
      )

      const vertices = []
      const positionAttribute = dodecahedronGeometry.getAttribute('position')

      for (let i = 0; i < positionAttribute.count; i++) {
        const vertex = new THREE.Vector3()
        vertex.fromBufferAttribute(positionAttribute, i)
        vertices.push(vertex)
      }

      const pointsMaterial = new THREE.PointsMaterial({
        color: '#0080ff',
        map: texture,
        size: 1,
        alphaTest: 0.5,
      })

      const pointsGeometry = new THREE.BufferGeometry().setFromPoints(vertices)

      const points = new THREE.Points(pointsGeometry, pointsMaterial)
      group.add(points)

      // convex hull

      const meshMaterial = new THREE.MeshLambertMaterial({
        color: '#ffffff',
        opacity: 0.5,
        transparent: true,
      })

      const meshGeometry = new ConvexGeometry(vertices)

      const mesh1 = new THREE.Mesh(meshGeometry, meshMaterial)
      mesh1.material.side = THREE.BackSide // back faces
      mesh1.renderOrder = 0
      // group.add(mesh1)

      const mesh2 = new THREE.Mesh(meshGeometry, meshMaterial.clone())
      mesh2.material.side = THREE.FrontSide // front faces
      mesh2.renderOrder = 1
      group.add(mesh2)

      //

      document.addEventListener('mousemove', onDocumentMouseMove, false)
      window.addEventListener('resize', onWindowResize)
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    function onDocumentMouseMove(event) {
      // the following line would stop any other event handler from firing
      // (such as the mouse's TrackballControls)
      // event.preventDefault();

      // update the mouse variable
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    function animate() {
      requestAnimationFrame(animate)

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(group.children, true)

      if (intersects.length !== 0) {
        controls.enabled = true
      } else {
        controls.enabled = false
        group.rotation.y += 0.002
        group.rotation.x += 0.002
      }

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
  width: 100%;
  height: 100%;
  & > canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
