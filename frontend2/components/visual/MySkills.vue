<template>
  <div id="container" class="skills">
    <canvas id="c" ref="canvas"></canvas>
    <div
      id="labels"
      ref="labelContainerElem"
      :style="'transform:' + (controls.isSelected ? 'scale(1.5)' : 'scale(1)')"
    ></div>
    <transition appear name="desc" mode="out-in" :duration="400">
      <div v-if="controls.isSelected" key="desc" class="skills__desc">
        <div class="skills__desc__header">
          <button @click="bulrLabels()">
            <i class="xi-close-thin"></i>
            <span class="ir">닫기</span>
          </button>
          <h3>{{ desc.name }}</h3>
        </div>
        <div class="skills__desc__con">
          <span>{{ desc.title }}</span>
          <p>{{ desc.con }}</p>
        </div>
        <div class="skills__desc__footer">
          <ul>
            <li>
              <a href="#a"> </a>
            </li>
            <li>
              <a href="#a"> </a>
            </li>
            <li>
              <a href="#a"> </a>
            </li>
          </ul>
        </div>
      </div>
      <div v-else key="noti" class="skills__noti">기술을 선택해 주세요!</div>
    </transition>
  </div>
</template>

<script>
import * as THREE from 'three'
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      controls: {
        enabled: true,
        isSelected: false,
        sel_idx: null,
        startTime: null,
        now: null,
        startValue: null,
      },
      desc: {
        idx: 0,
        name: 'Vue.js',
        title: '"가장 많이 쓴 모던프레임워크"',
        con: '설명설명 ',
        rotate: {
          x: 3.561,
          y: 0.464,
        },
      },
      skills: [
        {
          idx: 0,
          name: 'Vue.js',
          title: '"가장 많이 쓴 모던프레임워크"',
          con: '',
          rotate: {
            x: 3.561,
            y: 0.464,
          },
        },
        {
          idx: 1,
          name: 'HTML',
          title: '"웹표준과 접근성을 준수한 마크업"',
          con: '',
          rotate: {
            x: 6.034,
            y: 3.81,
          },
        },
        {
          idx: 2,
          name: 'CSS',
          title: '"가장 많이 쓴 모던프레임워크"',
          con: '설명설명 ',
          rotate: {
            x: 5.129,
            y: 0,
          },
        },
        {
          idx: 3,
          name: 'react.js',
          title: '"가장 많이 쓴 모던프레임워크"',
          con: '설명설명 ',
          rotate: {
            x: 5.074,
            y: 3.233,
          },
        },
        {
          idx: 4,
          name: 'RN',
          title: '"가장 많이 쓴 모던프레임워크"',
          con: '설명설명 ',
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
          name: 'nuxt.js',
          rotate: {
            x: 1.086,
            y: 0.668,
          },
        },
        {
          idx: 10,
          name: 'next.js',
          rotate: {
            x: 0.428,
            y: 1.572,
          },
        },
        {
          idx: 11,
          name: 'nest.js',
          rotate: {
            x: 1.933,
            y: 3.052,
          },
        },
      ],
      group: null,
      camera: null,
      scene: null,
      renderer: null,
      animationFrame: null,
      PI2: Number(Math.PI.toFixed(3)) * 2,
    }
  },
  mounted() {
    const WrapWidth = window.innerWidth * 0.4
    const WrapHeight = window.innerWidth * 0.4
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.$refs.canvas,
      antialias: true,
      alpha: true,
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(WrapWidth, WrapHeight)
    window.skills = this.skills

    // camera

    this.camera = new THREE.PerspectiveCamera(
      40,
      WrapWidth / WrapHeight,
      1,
      1000
    )
    this.camera.position.set(15, 20, 20)
    this.scene.add(this.camera)

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

    this.scene.add(new THREE.AmbientLight('#222222'))

    // point light

    const light = new THREE.PointLight('#ffffff', 0.8)
    light.position.set(25, 50, 50)
    this.camera.add(light)

    // helper

    // scene.add(new THREE.AxesHelper(20))

    // textures

    const loader = new THREE.TextureLoader()

    this.group = new THREE.Group()
    window.group = this.group
    this.group.rotation.x = 1
    this.scene.add(this.group)
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
    this.group.add(points)
    const positionAttribute = points.geometry.getAttribute('position')
    const vertices = []
    for (let i = 0; i < positionAttribute.count; i++) {
      const vertex = new THREE.Vector3()
      vertex.fromBufferAttribute(positionAttribute, i)
      this.group.children[0].localToWorld(vertex)
      const x = ((vertex.x / 10) * 0.5 + 0.5) * this.$refs.canvas.clientWidth
      const y = ((vertex.y / 10) * -0.5 + 0.5) * this.$refs.canvas.clientHeight
      const z = (vertex.z / 10) * -0.5 + 0.5
      const elem = document.createElement('div')
      // elem.textContent = i
      elem.textContent = this.skills[i].name
      elem.dataset.idx = i
      elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`
      this.$refs.labelContainerElem.appendChild(elem)
    }
    this.$refs.labelContainerElem.addEventListener(
      'click',
      onLabelClick.bind(this)
    )
    this.$refs.labelContainerElem.addEventListener(
      'mouseover',
      onLabelMouseOver.bind(this)
    )
    this.$refs.labelContainerElem.addEventListener(
      'mouseleave',
      onLabelMouseLeave.bind(this)
    )
    window.addEventListener('resize', onWindowResize.bind(this))

    function onLabelClick(e) {
      const target = e.target
      const labelList = this.$refs.labelContainerElem.children
      this.controls.enabled = false
      this.controls.sel_idx = target.dataset.idx
      this.controls.isSelected = true

      for (let i = 0; i < labelList.length; i++) {
        if (
          labelList[i].classList.contains('s_selected') &&
          this.controls.sel_idx !== i
        ) {
          labelList[i].classList.remove('s_selected')
        }
      }
      this.$refs.labelContainerElem.children[
        this.controls.sel_idx
      ].classList.add('s_selected')
      this.desc = this.skills[this.controls.sel_idx]
    }
    function onLabelMouseOver() {
      if (this.controls.isSelected === true) return
      this.controls.enabled = false
    }
    function onLabelMouseLeave() {
      if (this.controls.isSelected === true) return
      this.controls.enabled = true
    }
    function onWindowResize() {
      this.camera.aspect = WrapWidth / WrapHeight
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(WrapWidth, WrapHeight)
    }

    this.animate()
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animationFrame)
  },
  methods: {
    render() {
      this.renderer.render(this.scene, this.camera)
    },
    animatePos(idx) {
      const Duration = 100
      function lerp(start, end, l) {
        return start + (end - start) * l
      }
      const timeSinceStart =
        (this.controls.now - this.controls.startTime) * 0.001
      const l = Math.min(timeSinceStart / Duration, 1)
      this.group.rotation.x = lerp(
        this.controls.startValue.x,
        this.skills[idx].rotate.x,
        l
      )
      this.group.rotation.y = lerp(
        this.controls.startValue.y,
        this.skills[idx].rotate.y,
        l
      )
      if (
        this.group.rotation.x.toFixed(2) ===
          this.skills[idx].rotate.x.toFixed(2) &&
        this.group.rotation.y.toFixed(2) ===
          this.skills[idx].rotate.y.toFixed(2)
      ) {
        this.controls.sel_idx = null
        this.controls.startTime = null
      }
    },
    animate(now) {
      if (this.controls.enabled) {
        this.group.rotation.x = (this.group.rotation.x + 0.002) % this.PI2
        this.group.rotation.y = (this.group.rotation.y + 0.002) % this.PI2
      } else if (this.controls.isSelected === true) {
        if (this.controls.startTime === null) {
          this.controls.startTime = performance.now()
        }
        if (this.controls.sel_idx) {
          this.controls.now = now
          this.controls.startValue = {
            x: this.group.rotation.x,
            y: this.group.rotation.y,
          }
          this.animatePos(this.controls.sel_idx)
        }
      }

      if (this.$refs.canvas) {
        this.setLabelsPosition()
      }
      this.animationFrame = requestAnimationFrame(this.animate)
      this.render()
    },
    setLabelsPosition() {
      const pointsGeometry = this.group.children[0].geometry
      const positionAttribute = pointsGeometry.getAttribute('position')
      for (let i = 0; i < positionAttribute.count; i++) {
        const elLabel = this.$refs.labelContainerElem.children[i]
        const vertex = new THREE.Vector3()
        vertex.fromBufferAttribute(positionAttribute, i)
        this.group.children[0].localToWorld(vertex)
        const x = ((vertex.x / 10) * 0.5 + 0.5) * this.$refs.canvas.clientWidth
        const y =
          ((vertex.y / 10) * -0.5 + 0.5) * this.$refs.canvas.clientHeight
        const z = (vertex.z / 10) * -0.5 + 0.5
        elLabel.style.zIndex = ((z + 0.1) / 2 + 0.6) * 10
        elLabel.style.opacity = (z + 0.1) / 2 + 0.6
        elLabel.style.filter = 'blur(' + (2 * (1 - z) - 0.3) + 'px)'
        elLabel.style.transform = `translate(-50%, -50%) translate(${y}px,${x}px)scale(${
          (z + 0.1) / 3 + 0.8
        })`
        elLabel.position = {
          x: (vertex.y / 10) * 0.5 + 0.5,
          y: (vertex.x / 10) * 0.5 + 0.5,
          z: (vertex.z / 10) * 0.5 + 0.5,
        }
      }
    },
    bulrLabels() {
      const labelList = this.$refs.labelContainerElem.children
      for (let i = 0; i < labelList.length; i++) {
        if (labelList[i].classList.contains('s_selected')) {
          labelList[i].classList.remove('s_selected')
        }
      }
      this.controls.isSelected = false
      this.controls.enabled = true
    },
  },
})
</script>

<style lang="scss" scoped>
.skills {
  margin: 0 0 0 80px;
  position: relative;
  display: flex;
  height: 100%;
  & > canvas {
    width: 100%;
    height: 100%;
    max-width: 768px;
    max-height: 768px;
  }
}
.skills__desc {
  position: relative;
  z-index: 9;
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
}
.skills__desc__header {
  animation: slide-ani 0.3s 0.4s forwards;
  transform: translateX(20px);
  opacity: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 30px;
  & > button {
    padding: 0 10px;
    height: 40px;
    & > i {
      font-size: 30px;
    }
  }
}

.skills__desc__con {
  animation: slide-ani 0.3s 0.6s forwards;
  transform: translateX(20px);
  opacity: 0;
  flex: 1;
  width: 100%;
  & > span {
    padding: 20px 10px;
    display: block;
    box-sizing: border-box;
    font-size: 40px;
    font-weight: 500;
    text-align: center;
  }
  & > p {
    font-size: 20px;
  }
}
.skills__desc__footer {
  animation: slide-ani 0.3s 0.8s forwards;
  transform: translateX(20px);
  opacity: 0;
  & > ul {
    display: flex;

    & > li {
      flex: 1;
    }
  }
}
@keyframes slide-ani {
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
.skills__noti {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  font-size: 30px;
}
</style>
