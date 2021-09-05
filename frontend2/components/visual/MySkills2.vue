<template>
  <div id="container" class="skills">
    <canvas
      id="c"
      ref="canvas"
      :style="'transform:' + (controls.isSelected ? 'scale(1.5)' : 'scale(1)')"
    ></canvas>
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
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      controls: {
        enabled: true,
        isSelected: false,
        sel_idx: null,
      },
      desc: null,
      skills: [
        {
          idx: 0,
          name: 'Vue.js',
          title: '"가장 많이 쓴 모던프레임워크"',
          con: '',
        },
        {
          idx: 1,
          name: 'HTML',
          title: '"웹표준과 접근성을 준수한 마크업"',
          con: '',
        },
        {
          idx: 2,
          name: 'CSS',
          title: '"가장 많이 쓴 모던프레임워크"',
          con: '설명설명 ',
        },
        {
          idx: 3,
          name: 'react.js',
          title: '"가장 많이 쓴 모던프레임워크"',
          con: '설명설명 ',
        },
        {
          idx: 4,
          name: 'RN',
          title: '"가장 많이 쓴 모던프레임워크"',
          con: '설명설명 ',
        },
        {
          idx: 5,
          name: 'THREE.js',
        },
        {
          idx: 6,
          name: 'node.js',
        },
        {
          idx: 7,
          name: 'c3.js',
        },
        {
          idx: 8,
          name: 'Github',
        },
        {
          idx: 9,
          name: 'nuxt.js',
        },
        {
          idx: 10,
          name: 'next.js',
        },
        {
          idx: 11,
          name: 'nest.js',
        },
      ],
      mouse: null,
      group: null,
      camera: null,
      scene: null,
      renderer: null,
      animationFrame: null,
    }
  },
  mounted() {
    // standard global variables
    let camera, renderer, controls

    // custom global variables

    init.call(this)
    animate.call(this)
    // FUNCTIONS
    function init() {
      // SCENE
      this.scene = new THREE.Scene()
      {
        const near = 15
        const far = 40
        const color = 'white'
        this.scene.fog = new THREE.Fog(color, near, far)
      }
      // CAMERA
      const SCREEN_WIDTH = window.innerWidth * 0.4
      const SCREEN_HEIGHT = window.innerWidth * 0.4
      const VIEW_ANGLE = 45
      const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT
      const NEAR = 0.1
      const FAR = 20000
      camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)
      // window.camera = camera
      camera.position.set(0, 0, 25)
      camera.lookAt(this.scene.position)
      this.scene.add(camera)

      this.raycaster = new THREE.Raycaster()
      this.mouse = new THREE.Vector2()
      // window.mouse = mouse
      function onMouseMove(event) {
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        // console.log(event)
        const wrap = event.path[0]
        this.mouse.x = (event.offsetX / wrap.offsetWidth) * 2 - 1
        this.mouse.y = -(event.offsetY / wrap.offsetHeight) * 2 + 1
      }
      document
        .querySelector('#c')
        .addEventListener('mousemove', onMouseMove.bind(this), false)
      document
        .querySelector('#c')
        .addEventListener('click', onMouseClick.bind(this), false)

      function onMouseClick(event) {
        this.raycaster.setFromCamera(this.mouse, camera)

        // calculate objects intersecting the picking ray
        const intersects = this.raycaster.intersectObjects(group.children, true)

        if (intersects.length) {
          const idx = intersects[0].object.idx
          setPos(idx)
          controls.enabled = false
          this.controls.sel_idx = idx
          this.controls.isSelected = true
          this.desc = this.skills[this.controls.sel_idx]
        }
      }
      // RENDERER
      //   if (Detector.webgl)
      //     renderer = new THREE.WebGLRenderer({ antialias: true })
      //   else renderer = new THREE.CanvasRenderer()
      renderer = new THREE.WebGLRenderer({
        canvas: this.$refs.canvas,
        antialias: true,
        alpha: true,
      })

      renderer.setPixelRatio(window.devicePixelRatio * 1.5)
      renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)
      // CONTROLS
      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableZoom = false
      controls.enableDamping = true
      controls.autoRotate = true
      window.controls = controls

      /// /////////
      // CUSTOM //
      /// /////////

      const group = new THREE.Group()
      this.group = group
      this.scene.add(group)

      let geometry = new THREE.IcosahedronGeometry(8)
      geometry.deleteAttribute('normal')
      geometry.deleteAttribute('uv')

      geometry = BufferGeometryUtils.mergeVertices(geometry)
      const material = new THREE.MeshPhongMaterial({
        color: '#000000',
        opacity: 0,
        alphaTest: 0.5,
        transparent: true,
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(0, 0, 0)
      this.scene.add(mesh)
      {
        const positionAttribute = mesh.geometry.getAttribute('position')
        for (let i = 0; i < positionAttribute.count; i++) {
          const vertex = new THREE.Vector3()
          vertex.fromBufferAttribute(positionAttribute, i)
          mesh.localToWorld(vertex)
          const spritey = makeTextSprite(this.skills[i].name, {
            fontsize: 120,
          })
          spritey.position.set(vertex.x, vertex.y, vertex.z)
          spritey.idx = i
          group.add(spritey)
        }

        window.setPos = function (number) {
          getDiffDegree(group.children[number].position, camera.position)
        }

        window.getTopDegree = function ({ x, y, z }) {
          const planePos = Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2))
          const TopDegree = Math.atan2(planePos, -y) / (Math.PI / 180) - 90
          return TopDegree
        }
        window.getLeftDegree = function ({ x, y, z }) {
          const planePos = Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2))
          let leftDegree = Math.asin(z / planePos) / (Math.PI / 180) - 90
          if (x >= 0) {
            leftDegree = -leftDegree
          } else if (x < 0) {
            leftDegree = leftDegree + 180 + 180
          }
          return leftDegree
        }
        window.getDiffDegree = function ({ x, y, z }, cameraPos) {
          const cameraTopDegree = getTopDegree(cameraPos)
          const cameraLeftDegree = getLeftDegree(cameraPos)

          const tartgetTopDegree = getTopDegree({ x, y, z })
          const tartgetLeftDegree = getLeftDegree({ x, y, z })

          const TopDiffRadian =
            (tartgetTopDegree - cameraTopDegree) * (Math.PI / 180)
          let leftDiffRadian =
            (tartgetLeftDegree - cameraLeftDegree) * (Math.PI / 180)

          controls.setRotateUp(-TopDiffRadian + 0.2)

          if (Math.PI < leftDiffRadian) {
            leftDiffRadian = leftDiffRadian - Math.PI * 2
          }
          controls.setRotateLeft(leftDiffRadian + 0.4)
        }
      }
    }
    function makeTextSprite(message, parameters) {
      if (parameters === undefined) parameters = {}

      const fontface = Object.prototype.hasOwnProperty.call(
        parameters,
        'fontface'
      )
        ? parameters.fontface
        : 'Arial'

      const fontsize = Object.prototype.hasOwnProperty.call(
        parameters,
        'fontsize'
      )
        ? parameters.fontsize
        : 18

      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      context.font = 'Bold ' + fontsize + 'px ' + fontface
      // get size data (height depends only on font size)
      const metrics = context.measureText(message)
      const textWidth = metrics.width
      canvas.width = textWidth
      canvas.height = fontsize
      context.font = 'Bold ' + fontsize + 'px ' + fontface
      context.lineWidth = 0
      // text color
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillStyle = 'rgba(0, 0, 0, 1)'

      context.fillText(message, textWidth / 2, fontsize / 2)

      context.setColor = function (color) {
        context.fillStyle = color
        context.fillText(message, textWidth / 2, fontsize / 2)
      }

      // context.scale(100, 100)
      // canvas contents will be used for a texture
      const texture = new THREE.Texture(canvas)
      texture.needsUpdate = true

      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        useScreenCoordinates: false,
      })
      const sprite = new THREE.Sprite(spriteMaterial)
      // context.translate(textWidth / 2, fontsize / 2)
      sprite.scale.set(textWidth / fontsize, 1, 0)
      sprite.context = context
      sprite.texture = texture
      return sprite
    }

    // function for drawing rounded rectangles
    // function roundRect(ctx, x, y, w, h, r) {
    //   ctx.beginPath()
    //   ctx.moveTo(x + r, y)
    //   ctx.lineTo(x + w - r, y)
    //   ctx.quadraticCurveTo(x + w, y, x + w, y + r)
    //   ctx.lineTo(x + w, y + h - r)
    //   ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    //   ctx.lineTo(x + r, y + h)
    //   ctx.quadraticCurveTo(x, y + h, x, y + h - r)
    //   ctx.lineTo(x, y + r)
    //   ctx.quadraticCurveTo(x, y, x + r, y)
    //   ctx.closePath()
    //   ctx.fill()
    //   ctx.stroke()
    // }

    function animate() {
      this.animationFrame = requestAnimationFrame(animate.bind(this))
      render.call(this)
      update()
    }

    function update() {
      controls.update()
    }

    function render() {
      // update the picking ray with the camera and mouse position
      this.raycaster.setFromCamera(this.mouse, camera)

      // calculate objects intersecting the picking ray
      const intersects = this.raycaster.intersectObjects(
        this.group.children,
        true
      )
      if (intersects.length) {
        document.body.style.cursor = 'pointer'
        controls.autoRotate = false
      } else {
        document.body.style.cursor = 'unset'
        if (this.controls.isSelected !== true) {
          controls.autoRotate = true
        }
      }

      const vertices = this.group.children
      for (let i = 0; i < vertices.length; i++) {
        let idx = null
        if (intersects.length) {
          idx = intersects[0].object.idx
        }
        if (idx === i || this.controls.sel_idx === i) {
          vertices[i].context.setColor('#ff0000')
        } else {
          vertices[i].context.setColor('#000000')
        }
        vertices[i].texture.needsUpdate = true
      }

      renderer.render(this.scene, camera)
    }
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animationFrame)
  },
  methods: {
    bulrLabels() {
      this.controls.sel_idx = null
      this.controls.isSelected = false
      window.controls.enabled = true
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
    transform-origin: left top;
    transition: transform 0.7s;
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
