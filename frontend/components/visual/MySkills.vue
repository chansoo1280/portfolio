<template>
  <div id="container">
    <canvas id="c"></canvas>
    <div
      id="labels"
      :style="'transform:' + (controls.isSelected ? 'scale(1.5)' : 'scale(1)')"
    ></div>

    <div class="controls">
      <input
        v-model="inputX"
        onchange="group.rotation.x = this.value"
        type="range"
        max="6.28"
        min="0"
        step="0.001"
      />
      <input
        v-model="inputX"
        onchange="group.rotation.x = this.value"
        type="number"
        step="0.001"
      />
      <input
        v-model="inputY"
        onchange="group.rotation.y = this.value"
        type="range"
        max="6.28"
        min="0"
        step="0.001"
      />
      <input
        v-model="inputY"
        onchange="group.rotation.y = this.value"
        type="number"
        step="0.001"
      />
      <button @click="bulrLabels()">exit</button>
    </div>
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
    return {
      inputX: 0,
      inputY: 0,
      controls: {
        isSelected: false,
      },
    }
  },
  mounted() {
    const skills = [
      {
        idx: 0,
        name: 'Vue.js',
        rotate: {
          x: 3.561,
          y: 0.464,
        },
      },
      {
        idx: 1,
        name: 'HTML',
        rotate: {
          x: 6.034,
          y: 3.81,
        },
      },
      {
        idx: 2,
        name: 'CSS',
        rotate: {
          x: 5.129,
          y: 0,
        },
      },
      {
        idx: 3,
        name: 'react.js',
        rotate: {
          x: 5.074,
          y: 3.233,
        },
      },
      {
        idx: 4,
        name: 'RN',
        rotate: {
          x: 4.228,
          y: 2.474,
        },
      },
      {
        idx: 5,
        name: 'THREE.js',
        rotate: {
          x: 3.561,
          y: 1.573,
        },
      },
      {
        idx: 6,
        name: 'node.js',
        rotate: {
          x: 0.42,
          y: 2.675,
        },
      },
      {
        idx: 7,
        name: 'c3.js',
        rotate: {
          x: 1.084,
          y: 3.808,
        },
      },
      {
        idx: 8,
        name: 'Github',
        rotate: {
          x: 2.057,
          y: 0.11,
        },
      },
      {
        idx: 9,
        name: 'vue',
        rotate: {
          x: 1.086,
          y: 0.668,
        },
      },
      {
        idx: 10,
        name: 'vue',
        rotate: {
          x: 0.428,
          y: 1.572,
        },
      },
      {
        idx: 11,
        name: 'vue',
        rotate: {
          x: 1.933,
          y: 3.052,
        },
      },
    ]
    const raycaster = new THREE.Raycaster()
    const WrapWidth = window.innerWidth * 0.4
    const WrapHeight = window.innerWidth * 0.4
    let group, camera, scene, renderer
    const mouse = {
      x: 0,
      y: 0,
    }
    const controls = {
      enabled: true,
      isSelected: false,
      sel_idx: null,
      startTime: null,
      now: null,
      startValue: null,
    }
    window.controls = controls

    init.call(this)
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
      window.camera = camera

      // controls

      // controls = new OrbitControls(camera, renderer.domElement)
      // controls.enableZoom = false
      // controls.rotateSpeed = 0.4
      // controls.autoRotate = true
      // controls.enableDamping = true
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
      group.rotation.x = 1
      scene.add(group)
      window.group = group
      // points

      let dodecahedronGeometry = new THREE.IcosahedronGeometry(8)

      // if normal and uv attributes are not removed, mergeVertices() can't consolidate indentical vertices with different normal/uv data

      dodecahedronGeometry.deleteAttribute('normal')
      dodecahedronGeometry.deleteAttribute('uv')

      dodecahedronGeometry = BufferGeometryUtils.mergeVertices(
        dodecahedronGeometry
      )
      const material = new THREE.PointsMaterial({
        color: '#000',
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
        const z = (vertex.z / 10) * -0.5 + 0.5
        const elem = document.createElement('div')
        // elem.textContent = i
        elem.textContent = skills[i].name
        elem.dataset.idx = i
        elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`
        labelContainerElem.appendChild(elem)
      }
      labelContainerElem.addEventListener('click', onLabelClick.bind(this))
      labelContainerElem.addEventListener('mouseover', onLabelMouseOver)
      labelContainerElem.addEventListener('mouseleave', onLabelMouseLeave)
      canvas.addEventListener('mousemove', onDocumentMouseMove, false)
      window.addEventListener('resize', onWindowResize)
    }
    function onLabelClick(e) {
      controls.enabled = false
      const target = e.target
      controls.sel_idx = target.dataset.idx
      controls.isSelected = true
      this.controls.isSelected = true
    }
    function onLabelMouseOver() {
      if (controls.isSelected === true) return
      controls.enabled = false
    }
    function onLabelMouseLeave() {
      if (controls.isSelected === true) return
      controls.enabled = true
    }
    function onWindowResize() {
      camera.aspect = WrapWidth / WrapHeight
      camera.updateProjectionMatrix()

      renderer.setSize(WrapWidth, WrapHeight)
    }
    function onDocumentMouseMove(event) {
      mouse.x = (event.offsetX / WrapWidth) * 2 - 1
      mouse.y = -(event.offsetY / WrapHeight) * 2 + 1
    }
    function setLabelsPosition(canvas) {
      const labelContainerElem = document.querySelector('#labels')
      const pointsGeometry = group.children[0].geometry
      const positionAttribute = pointsGeometry.getAttribute('position')
      for (let i = 0; i < positionAttribute.count; i++) {
        const vertex = new THREE.Vector3()
        vertex.fromBufferAttribute(positionAttribute, i)
        group.children[0].localToWorld(vertex)
        const x = ((vertex.x / 10) * 0.5 + 0.5) * canvas.clientWidth
        const y = ((vertex.y / 10) * -0.5 + 0.5) * canvas.clientHeight
        const z = (vertex.z / 10) * -0.5 + 0.5
        labelContainerElem.children[i].style.zIndex = ((z + 0.1) / 2 + 0.6) * 10
        labelContainerElem.children[i].style.filter =
          'blur(' + 2 * (1 - z) + 'px)'
        labelContainerElem.children[
          i
        ].style.transform = `translate(-50%, -50%) translate(${y}px,${x}px)scale(${
          (z + 0.1) / 3 + 0.8
        })`
        labelContainerElem.children[i].position = {
          x: (vertex.y / 10) * 0.5 + 0.5,
          y: (vertex.x / 10) * 0.5 + 0.5,
          z: (vertex.z / 10) * 0.5 + 0.5,
        }
      }
    }
    const Duration = 100
    function lerp(start, end, l) {
      return start + (end - start) * l
    }
    function animatePos(idx) {
      console.log(idx)
      const timeSinceStart = (controls.now - controls.startTime) * 0.001
      const l = Math.min(timeSinceStart / Duration, 1)
      group.rotation.x = lerp(controls.startValue.x, skills[idx].rotate.x, l)
      group.rotation.y = lerp(controls.startValue.y, skills[idx].rotate.y, l)
      if (
        group.rotation.x.toFixed(2) === skills[idx].rotate.x.toFixed(2) &&
        group.rotation.y.toFixed(2) === skills[idx].rotate.y.toFixed(2)
      ) {
        controls.sel_idx = null
        controls.startTime = null
      }
    }
    function animate(now) {
      const canvas = document.querySelector('#c')
      const labelContainerElem = document.querySelector('#labels')
      if (controls.enabled) {
        group.rotation.x = (group.rotation.x + 0.002) % (Math.PI * 2)
        group.rotation.y = (group.rotation.y + 0.002) % (Math.PI * 2)
      } else if (controls.isSelected === true) {
        if (controls.startTime === null) {
          controls.startTime = performance.now()
        }
        if (controls.sel_idx) {
          controls.now = now
          controls.startValue = {
            x: Number(group.rotation.x),
            y: Number(group.rotation.y),
          }
          animatePos(controls.sel_idx)
        }
      }

      if (canvas) {
        setLabelsPosition(canvas)
      }
      requestAnimationFrame(animate)
      render()
    }

    function render() {
      renderer.render(scene, camera)
    }
  },
  methods: {
    bulrLabels() {
      this.controls.isSelected = false
      controls.isSelected = false
      controls.enabled = true
    },
  },
})
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
}
#container {
  position: relative;
  width: 768px;
  height: 768px;
  /* &::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    position: absolute;
    top: 174px;
    left: 217px;
    background: #000;
  } */
  & > canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
