<template>
  <div class="l_wrap">
    <h1 class="l_wrap__title">
      <!-- <button @click="addTodo('123123')">Chansoo's Web</button> -->
    </h1>
    <nav class="l_wrap__paging">
      <ol>
        <li v-for="obj in nav.list" :key="obj.idx">
          <button
            :class="{ s_active: obj.idx === active_idx }"
            @click="goPage(obj.idx)"
          >
            <em></em>
            <div>
              <span>{{ obj.title }}</span>
            </div>
          </button>
        </li>
      </ol>
    </nav>
    <Nuxt keep-alive :keep-alive-props="{ include: ['Works'] }" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
export default Vue.extend({
  data() {
    return {
      nav: {
        duration: 400,
        list: [
          {
            idx: 0,
            title: 'Home',
          },
          {
            idx: 1,
            title: 'Skills',
          },
          {
            idx: 2,
            title: 'Works',
          },
          {
            idx: 3,
            title: 'Blog',
          },
          {
            idx: 4,
            title: 'Contact',
          },
        ],
      },
    }
  },
  watch: {
    $route() {
      setTimeout(() => {
        this.setDisabled(false)
      }, this.nav.duration)
    },
  },
  computed: {
    ...mapState('nav', ['active_idx', 'disabled']),
  },
  created() {
    for (let i = 0; i < this.nav.list.length; i++) {
      if (this.$route.path.includes(this.nav.list[i].title)) {
        this.setIdx(this.nav.list[i].idx)
        break
      }
    }
  },
  mounted() {
    document.addEventListener('wheel', (e: any) => {
      if (e.wheelDelta > 0) {
        this.goPrevPage()
      } else {
        this.goNextPage()
      }
    })
  },
  methods: {
    goPage(idx: number) {
      this.setDisabled(true)
      this.setIdx(idx)
      this.$router.push('/' + this.nav.list[idx].title)
    },
    goNextPage() {
      if (this.disabled === true) return
      if (this.active_idx < this.nav.list.length - 1) {
        this.goPage(this.active_idx + 1)
      }
    },
    goPrevPage() {
      if (this.disabled === true) return
      if (this.active_idx > 0) {
        this.goPage(this.active_idx - 1)
      }
    },
    ...mapActions({
      setIdx: 'nav/setIdx',
      setDisabled: 'nav/setDisabled',
    }),
  },
})
</script>

<style lang="scss" scoped>
.l_wrap__title {
  position: absolute;
  top: 20px;
  left: 20px;
}
.l_wrap__paging {
  z-index: 999;
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
          line-height: 20px;
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
</style>
