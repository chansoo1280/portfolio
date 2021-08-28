<template>
  <div id="container"></div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {}
  },
  mounted() {
    const Bf = function (x, y) {
      this.el = null
      this.pos = {
        x: 0,
        y: 0,
      }
      this.zoom = null

      function getRandomIntInclusive(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min // 최댓값도 포함, 최솟값도 포함
      }
      function init() {
        const elBf = document.createElement('div')
        elBf.classList.add('bf-wrap')
        this.zoom = getRandomIntInclusive(4, 12) / 10

        elBf.style.width = this.zoom * 50 + 'px'
        elBf.style.height = this.zoom * 50 + 'px'
        this.pos.y = y
        if (isNaN(this.pos.y)) {
          this.pos.y = (getRandomIntInclusive(0, 9) / 10) * window.innerHeight
        }
        this.pos.y = this.pos.y - this.zoom * 25
        this.pos.x = x
        if (isNaN(this.pos.x)) {
          this.pos.x = (getRandomIntInclusive(0, 9) / 10) * window.innerWidth
        }
        this.pos.x = this.pos.x - this.zoom * 25
        elBf.style.transform =
          'translate(' + this.pos.x + 'px,' + this.pos.y + 'px)'
        elBf.style.filter =
          ' brightness(1.6)hue-rotate(' +
          getRandomIntInclusive(50, 260) +
          'deg)'
        elBf.innerHTML = `
       <div class="bf">
          <em></em>
          <em></em>
       </div>
       `
        elBf.querySelector('em:first-child').style.animation =
          'bf ' + (4 * (1.3 * this.zoom)) / 10 + 's infinite'
        elBf.querySelector('em:last-child').style.animation =
          'bf ' +
          (4 * (1.3 * this.zoom)) / 10 +
          's ' +
          (2 * (1.3 * this.zoom)) / 10 +
          's infinite'
        document.querySelector('.l_main').appendChild(elBf)
        this.el = elBf
      }

      function animate(timestamp) {
        if (this.el) {
          const moveX = getRandomIntInclusive(-200, 200)
          let duration = (moveX > 0 ? moveX : -moveX) * 10
          duration = duration * (1.2 / this.zoom)

          this.pos.x = this.pos.x + moveX
          if (this.pos.x < 0) {
            this.pos.x = 0
          } else if (this.pos.x >= window.innerWidth) {
            this.pos.x = window.innerWidth - 50
          }

          this.pos.y = this.pos.y + getRandomIntInclusive(-50, 50)
          if (this.pos.y < 0) {
            this.pos.y = 0
          } else if (this.pos.y >= window.innerHeight) {
            this.pos.y = window.innerHeight - 50
          }

          this.el.children[0].style.transform =
            'scaleX(' + (moveX > 0 ? '' : '-') + '1)rotate(77deg)'
          this.el.animate(
            [
              {
                transform: this.el.style.transform,
              },
              {
                transform:
                  'translate(' + this.pos.x + 'px,' + this.pos.y + 'px)',
              },
            ],
            {
              duration,
              easing: 'linear',
              fill: 'forwards',
            }
          )
          setTimeout(() => {
            this.el.style.transform =
              'translate(' + this.pos.x + 'px,' + this.pos.y + 'px)'
            requestAnimationFrame(animate.bind(this))
          }, duration)
        }
      }
      init.call(this)
      requestAnimationFrame(animate.bind(this))
    }
    const bfList = []
    document.onclick = function (e) {
      const a = new Bf(e.pageX, e.pageY)
      bfList.push(a)
    }
    const a = new Bf()
  },
  destroyed() {
    document.onclick = null
  },
})
</script>

<style lang="scss" scoped>
#container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
