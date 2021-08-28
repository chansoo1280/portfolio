<template>
  <div id="container" class="m_skills-view">
    <canvas
      id="c"
      ref="canvas"
      :style="
        'transform:' + (controls_opt.isSelected ? 'scale(1.3)' : 'scale(1)')
      "
    ></canvas>
    <transition appear name="desc" mode="out-in" :duration="400">
      <div
        v-if="controls_opt.isSelected"
        key="desc"
        class="m_skills-view__desc"
      >
        <div class="m_skills-view__desc__header">
          <Button type="text" size="lg" @click="bulrLabels()">
            <i class="xi-close-thin"></i>
            <span class="ir">닫기</span>
          </Button>
          <Title as="h3">{{ desc.name }}</Title>
        </div>
        <div class="m_skills-view__desc__con">
          <Span>{{ desc.title }}</Span>
          <p>{{ desc.con }}</p>
        </div>
        <div class="m_skills-view__desc__footer">
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
      <div v-else key="noti" class="m_skills-view__noti">
        기술을 선택해 주세요!
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import * as THREE from 'three'
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import Vue from 'vue'
import { OrbitControls } from '../../src/three/OrbitControls.js'
export default Vue.extend({
  data() {
    return {
      controls_opt: {
        enabled: true,
        isSelected: false,
        sel_idx: null,
      },
      skills: [
        {
          idx: 0,
          name: 'Vue.js',
          title: '"자바스크립트 프론트엔드 프레임워크"',
          con: 'vue는 공식적인 팀이 제작한 프론트엔드 프레임워크로써 훌륭한 품질의 가이드와 커뮤니티가 구성되어 있습니다. 이는 제가 처음으로 프론트엔드 개발에 입문하기에 엄청난 이점이 되었습니다.',
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
      desc: null as any,
      mouse: null as any,
      group: null as any,
      camera: null as any,
      scene: null as any,
      controls: null as any,
      renderer: null as any,
      raycaster: null as any,
      animationFrame: null as any,
    }
  },
  mounted() {
    this.initCanvas()
    this.animate()
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animationFrame)
  },
  methods: {
    initCanvas() {
      this.scene = new THREE.Scene()
      {
        const near = 15
        const far = 40
        const color = 'white'
        this.scene.fog = new THREE.Fog(color, near, far)
      }
      // CAMERA
      const SCREEN_WIDTH = 600
      const SCREEN_HEIGHT = 500
      const VIEW_ANGLE = 45
      const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT
      const NEAR = 0.1
      const FAR = 20000
      this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)
      // window.camera = camera
      this.camera.position.set(0, 0, 25)
      this.camera.lookAt(this.scene.position)
      this.scene.add(this.camera)

      this.raycaster = new THREE.Raycaster()
      this.mouse = new THREE.Vector2()
      document!
        .querySelector('#c')!
        .addEventListener('mousemove', this.onMouseMove, false)
      document!
        .querySelector('#c')!
        .addEventListener('click', this.onMouseClick, false)

      // RENDERER
      //   if (Detector.webgl)
      //     renderer = new THREE.WebGLRenderer({ antialias: true })
      //   else renderer = new THREE.CanvasRenderer()
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.$refs.canvas,
        antialias: true,
        alpha: true,
      } as any)

      this.renderer.setPixelRatio(window.devicePixelRatio * 1.5)
      this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)
      // CONTROLS
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableZoom = false
      this.controls.enableDamping = true
      this.controls.autoRotate = true
      this.controls.setRotateUp(0.1)

      /// /////////
      // CUSTOM //
      /// /////////

      this.group = new THREE.Group()
      this.scene.add(this.group)

      let geometry: any = new THREE.IcosahedronGeometry(8)
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
          const spritey = this.makeTextSprite(this.skills[i].name, {
            fontsize: 120,
          })
          spritey.position.set(vertex.x, vertex.y, vertex.z)
          spritey.idx = i
          this.group.add(spritey)
        }
      }
    },
    makeTextSprite(message: string, parameters: any) {
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
      const context: any = canvas.getContext('2d')
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

      context.setColor = function (color: string) {
        context!.fillStyle = color
        context!.fillText(message, textWidth / 2, fontsize / 2)
      }

      // context.scale(100, 100)
      // canvas contents will be used for a texture
      const texture = new THREE.Texture(canvas)
      texture.needsUpdate = true

      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        useScreenCoordinates: false,
      } as any)
      const sprite: any = new THREE.Sprite(spriteMaterial)
      // context.translate(textWidth / 2, fontsize / 2)
      sprite.scale.set(textWidth / fontsize, 1, 0)
      sprite.context = context
      sprite.texture = texture
      return sprite
    },
    animate() {
      this.animationFrame = requestAnimationFrame(this.animate)
      this.render()
      this.controls.update()
    },
    render() {
      // update the picking ray with the camera and mouse position
      this.raycaster.setFromCamera(this.mouse, this.camera)

      // calculate objects intersecting the picking ray
      const intersects = this.raycaster.intersectObjects(
        this.group.children,
        true
      )
      if (intersects.length) {
        document.body.style.cursor = 'pointer'
        this.controls.autoRotate = false
      } else {
        document.body.style.cursor = 'unset'
        if (this.controls_opt.isSelected !== true) {
          this.controls.autoRotate = true
        }
      }

      const vertices = this.group.children
      for (let i = 0; i < vertices.length; i++) {
        let idx = null
        if (intersects.length) {
          idx = intersects[0].object.idx
        }
        if (idx === i || this.controls_opt.sel_idx === i) {
          vertices[i].context.setColor('#ff0000')
        } else {
          vertices[i].context.setColor('#000000')
        }
        vertices[i].texture.needsUpdate = true
      }

      this.renderer.render(this.scene, this.camera)
    },
    getDiffDegree(childrenPos: any) {
      const getTopDegree = function ({ x, y, z }: any) {
        const planePos = Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2))
        const TopDegree = Math.atan2(planePos, -y) / (Math.PI / 180) - 90
        return TopDegree
      }
      const getLeftDegree = function ({ x, y, z }: any) {
        const planePos = Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2))
        let leftDegree = Math.asin(z / planePos) / (Math.PI / 180) - 90
        if (x >= 0) {
          leftDegree = -leftDegree
        } else if (x < 0) {
          leftDegree = leftDegree + 180 + 180
        }
        return leftDegree
      }
      const cameraPos = this.camera.position
      const cameraTopDegree = getTopDegree(cameraPos)
      const cameraLeftDegree = getLeftDegree(cameraPos)

      const tartgetTopDegree = getTopDegree(childrenPos)
      const tartgetLeftDegree = getLeftDegree(childrenPos)

      const TopDiffRadian =
        (tartgetTopDegree - cameraTopDegree) * (Math.PI / 180)
      let leftDiffRadian =
        (tartgetLeftDegree - cameraLeftDegree) * (Math.PI / 180)
      this.controls.setRotateUp(TopDiffRadian - 0.2)

      if (Math.PI < leftDiffRadian) {
        leftDiffRadian = leftDiffRadian - Math.PI * 2
      }
      this.controls.setRotateLeft(-leftDiffRadian - 0.4)
    },
    onMouseMove(event: any) {
      // calculate mouse position in normalized device coordinates
      // (-1 to +1) for both components
      // console.log(event)
      const wrap = event.path[0]
      this.mouse.x = (event.offsetX / wrap.offsetWidth) * 2 - 1
      this.mouse.y = -(event.offsetY / wrap.offsetHeight) * 2 + 1
    },
    onMouseClick() {
      this.raycaster.setFromCamera(this.mouse, this.camera)

      // calculate objects intersecting the picking ray
      const intersects = this.raycaster.intersectObjects(
        this.group.children,
        true
      )

      if (intersects.length) {
        const idx = intersects[0].object.idx
        this.getDiffDegree(this.group.children[idx].position)
        this.controls.enabled = false
        this.controls_opt.sel_idx = idx
        this.controls_opt.isSelected = true
        this.desc = this.skills[idx]
      }
    },
    bulrLabels() {
      this.controls_opt.sel_idx = null
      this.controls_opt.isSelected = false
      if (this.controls !== null) {
        this.controls.enabled = true
      }
    },
  },
})
</script>
<style lang="scss" scoped>
.m_skills-view {
  margin: 80px 50px 140px;
  height: 500px;
  display: flex;
  & > canvas {
    transform-origin: 70% 70%;
    transition: transform 0.7s;
    width: 100%;
    height: 100%;
  }
  &__desc {
    position: relative;
    z-index: 9;
    padding: 10px;
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    backdrop-filter: blur(10px);
    &__header {
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
    &__con {
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
    &__footer {
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
  }
  &__noti {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 100%;
    font-size: 30px;
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
</style>
