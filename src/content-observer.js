class ContentObserver {
  constructor(targets = null, options = {}) {
    if (!targets) throw new Error('No targets defined')
    this.options = {
      offset: 0,
      direction: 'vertical',
      ...options
    }
    this.targets = targets
    this.init()
    window.addEventListener(
      'resize',
      this.debounce(() => this.handleResize(), 300)
    )
  }

  init() {
    const margin = this.calculateMargin()
    // console.log(margin)
    this.io = new IntersectionObserver(
      entries => {
        // console.table(entries);
        entries.forEach(observedEl => {
          if (this.options.callback) this.options.callback(observedEl.target, observedEl.isIntersecting)
          if (observedEl.isIntersecting) {
            if (this.options.enableLocationHash)
              this.updateHash(observedEl.target)
          }
        })
      },
      {
        threshold: 0,
        rootMargin: margin
      }
    )
    const elementToObserve =
      this.targets.length > 0 ? this.targets : new Array(this.targets)
    ;[...elementToObserve].forEach(el => this.io.observe(el))
  }

  handleResize() {
    this.disconnect()
    this.init()
  }

  disconnect() {
    if (this.io) this.io.disconnect()
  }

  calculateMargin() {
    const vertical = this.options.direction === 'vertical'
    const screenSize = vertical ? window.innerHeight : window.innerWidth

    const offset = this.options.offset

    if (isNaN(offset) && offset.indexOf('%') > -1) {
      if (vertical) return `-${screenSize / 2}px 0px -${screenSize / 2}px 0px`
      else return `0px -${screenSize / 2}px 0px -${screenSize / 2}px`
    }

    const offsetTop = vertical ? `${-offset}px` : '0px'
    const offsetLeft = vertical ? '0px' : `${-offset}px`
    const offsetBottom = vertical ? `${-(screenSize - offset)}px` : '0px'
    const offsetRight = vertical ? '0px' : `${-(screenSize - offset)}px`

    const margin = `${offsetTop} ${offsetRight} ${offsetBottom} ${offsetLeft}`

    return margin
  }

  updateHash(el) {
    if (!el.id || !history.replaceState) return
    history.replaceState(null, null, `#${el.id}`)
  }

  debounce(func, wait, immediate) {
    var timeout
    return function() {
      var context = this,
        args = arguments
      var later = function() {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }
}
export default ContentObserver
