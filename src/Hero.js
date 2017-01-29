import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'

export default class Hero extends Component {
  static contextTypes = {
    heroAnimationProvider: React.PropTypes.object.isRequired
  }

  static propTypes = {
    children: React.PropTypes.element.isRequired,
    id: PropTypes.string.isRequired,
    resize: PropTypes.bool,
    show: PropTypes.bool
  }
  
  constructor (props) {
    super(props)
    this.state = {
      animating: false,
      animateTo: {},
      visible: props.show
    }
  }

  componentDidMount () {
    this.context.heroAnimationProvider.register(this.props.id, this)
  }

  componentWillReceiveProps ({ id, show }) {
    if (id !== this.props.id) {
      this.context.heroAnimationProvider.unregister(this.props.id, this)
      this.context.heroAnimationProvider.register(this.props.id, this)

      if (show && !this.props.show) {
        this.context.heroAnimationProvider.animate(id, this)
      }
    } else if (show && !this.props.show) {
      this.context.heroAnimationProvider.animate(this.props.id, this)
    }
  }

  componentWillEnter (callback) {
    if (this.props.show) {
      this.context.heroAnimationProvider.animate(this.props.id, this)
    }

    this.setState({ visible: false })
    setTimeout(() => {
      if (this.context.heroAnimationProvider.heroes[this.props.id].visible === this) {
      this.setState({ visible: true })
      }
      callback()
    }, 400)
  }

  componentWillLeave (callback) {
    if (this.context.heroAnimationProvider.heroes[this.props.id].visible === this) {
      if (this.props.show) {
        // TODO add a smarter and deterministic way to get the next hero
        const nextHero = this.context.heroAnimationProvider.heroes[this.props.id].heroes.find((h) => h !== this)
        this.context.heroAnimationProvider.animate(this.props.id, nextHero)
      }
      setTimeout(callback, 400)
    } else {
      callback()
    }
  }

  componentDidLeave () {
    if (this._animationTimeout != null) {
      clearTimeout(this._animationTimeout)
    }
    this.context.heroAnimationProvider.unregister(this.props.id, this)
  }

  animateTo (hero, callback) {
    if (this._animationTimeout != null) {
      clearTimeout(this._animationTimeout)
    }
    const otherSize = hero.getSize()
    const size = this.getSize()
    if (this.props.resize) {
      this.setState({
        animating: true,
        animateTo: {
          top: otherSize.top - size.top,
          left: otherSize.left - size.left,
          width: otherSize.width,
          height: otherSize.height
        }
      })
    } else {
      this.setState({
        animating: true,
        animateTo: {
          top: otherSize.top - size.top,
          left: otherSize.left - size.left,
          scaleX: otherSize.width / size.width,
          scaleY: otherSize.height / size.height
        }
      })
    }
    this._animationTimeout = setTimeout(() => {
      this._animationTimeout = null
      callback()
    }, 400)
  }

  getSize () {
    if (this.state.animating) {
      return this._size
    } else {
      return this._size = findDOMNode(this.childElement).getBoundingClientRect()
    }
  }

  setChild = (element) => {
    this.childElement = element
  }

  render () {
    const { animating, animateTo, visible } = this.state
    const { left, top, scaleX, scaleY, width, height } = animateTo

    let transform = null
    if (animating) {
      if (scaleX != null && scaleY != null) {
        transform = `translate(${left}px, ${top}px) scale(${scaleX}, ${scaleY})`
      } else {
        transform = `translate(${left}px, ${top}px)`
      }
    }

    const element = React.Children.only(this.props.children)
    return React.cloneElement(element, {
      ref: this.setChild,
      style: {
        ...(element.props.style || {}),
        transition: animating ? 'all 400ms cubic-bezier(0.4, 0.0, 0.2, 1)' : element.props.style.transition,
        width: animating && width ? width : element.props.style.width,
        height: animating && height ? height : element.props.style.height,
        visibility: animating || visible ? 'visible' : 'hidden',
        transformOrigin: 'top left',
        transform: transform,
        zIndex: animating ? 2000 : element.props.style.zIndex
      }
    })
  }
}
