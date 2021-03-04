<template>
  <main class="l_main">
    <h1><button @click="setPage(0)">Chansoo's Web</button></h1>
    <div class="wrap">
      <ol ref="slider" class="slider">
        <transition name="fade">
          <li v-show="nav.active_idx === 0">
            <h2 class="ir">Home</h2>
            <div class="slide">
              <MySkills />
            </div>
          </li>
        </transition>
        <transition name="fade">
          <li v-show="nav.active_idx === 1">
            <h2>Home2</h2>
          </li>
        </transition>
        <transition name="fade">
          <li v-show="nav.active_idx === 2">
            <h2>Home3</h2>
          </li>
        </transition>
        <transition name="fade">
          <li v-show="nav.active_idx === 3">
            <h2>Home4</h2>
          </li>
        </transition>
        <transition name="fade">
          <li v-show="nav.active_idx === 4">
            <h2>Home5</h2>
          </li>
        </transition>
      </ol>
    </div>
    <nav class="paging">
      <ol>
        <li v-for="obj in nav.list" :key="obj.idx">
          <button
            :class="{ s_active: obj.idx === nav.active_idx }"
            @click="setPage(obj.idx)"
          >
            <em></em>
            <div>
              <span>{{ obj.title }}</span>
            </div>
          </button>
        </li>
      </ol>
    </nav>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import MySkills from '~/components/visual/MySkills.vue'

export default Vue.extend({
  name: 'Index',
  components: {
    MySkills,
  },
  data() {
    return {
      nav: {
        active_idx: 0,
        isMoving: false,
        duration: 500,
        list: [
          {
            idx: 0,
            title: 'Home',
          },
          {
            idx: 1,
            title: 'FE Developer',
          },
          {
            idx: 2,
            title: 'Interaction Animation',
          },
          {
            idx: 3,
            title: 'Works',
          },
          {
            idx: 4,
            title: 'Connect',
          },
        ],
      },
    }
  },
  mounted() {
    const slider = this.$refs.slider as HTMLElement
    slider.addEventListener('wheel', (e: any) => {
      if (e.wheelDelta < 0) {
        this.moveNextPage()
      } else {
        this.movePrevPage()
      }
    })
  },
  methods: {
    setPage(idx: number) {
      this.nav.active_idx = idx
    },
    moveNextPage() {
      if (this.nav.isMoving === true) return
      this.nav.isMoving = true
      if (this.nav.list.length - 1 === this.nav.active_idx) {
        console.log('last page')
        this.nav.isMoving = false
        return
      }
      this.nav.active_idx = this.nav.active_idx + 1
      setTimeout(() => {
        this.nav.isMoving = false
      }, this.nav.duration)
    },
    movePrevPage() {
      if (this.nav.isMoving === true) return
      this.nav.isMoving = true
      if (this.nav.active_idx === 0) {
        console.log('first page')
        this.nav.isMoving = false
        return
      }
      this.nav.active_idx = this.nav.active_idx - 1
      setTimeout(() => {
        this.nav.isMoving = false
      }, this.nav.duration)
    },
  },
})
</script>
<style lang="scss" scoped>
.wrap {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.slider {
  position: relative;
  & > li {
    position: absolute;
    padding: 60px;
    width: 100%;
    height: 100vh;
    & > h2 {
      font-size: 20px;
    }
  }
}
.slide {
  width: 100%;
  height: 100%;
}

.paging {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  & > ol {
    & > li {
      margin: 20px;
      display: flex;
      align-items: center;
      height: 30px;
      & > button {
        outline: 0;
        display: flex;
        align-items: center;
        height: 100%;
        & > em {
          z-index: 2;
          transition: transform 0.3s;
          display: block;
          width: 10px;
          height: 10px;
          background: #000;
          border-radius: 100%;
        }
        & > div {
          padding-right: 10px;
          overflow: hidden;
          & > span {
            display: block;
            transition: transform 0.3s;
            transform: translate(-100%, 0);
          }
        }
        &.s_active > em,
        &:hover > em {
          transform: scale(1.5);
        }
        &:hover > em + div {
          & > span {
            transform: translate(10px, 0);
          }
        }
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
