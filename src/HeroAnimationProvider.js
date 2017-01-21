import React, { PropTypes, Component } from 'react'

export default class HeroAnimationProvider extends Component {
  static childContextTypes = {
    heroAnimationProvider: PropTypes.object
  }

  heroes = []

  getChildContext () {
    return {
      heroAnimationProvider: this
    }
  }

  render () {
    return <div>{this.props.children}</div>
  }

  register (id, hero) {
    const heroPair = this.heroes[id]
    if (heroPair == null) {
      this.heroes[id] = {
        heroes: [hero],
        visible: hero.props.show ? hero : null
      }
    } else {
      heroPair.heroes.push(hero)
    }
  }

  unregister (id, hero) {
    const heroPair = this.heroes[id]
    if (heroPair) {
      if (heroPair.length === 1 && heroPair.heroes[0] === hero) {
        delete this.heroes[id]
      } else {
        heroPair.heroes = heroPair.heroes.filter((h) => h !== hero)
        if (heroPair.visible === hero) {
          heroPair.visible = null
        }
      }
    }
  }

  animate (id, show) {
    const visibleHero = this.heroes[id].visible

    if (visibleHero) {
      visibleHero.animateTo(show, () => {
        this.heroes[id].heroes.filter((h) => h !== show).forEach((h) => h.setState({
          visible: false,
          animating: false
        }))
        show.setState({
          visible: true
        })
        this.heroes[id].visible = show
      })
    } else {
      this.heroes[id].heroes.filter((h) => h !== show).forEach((h) => h.setState({
        visible: false
      }))
      show.setState({
        visible: true
      })
      this.heroes[id].visible = show
    }
  }

  findOther (id, hero) {
    const heroPair = this.heroes[id]
    if (heroPair) {
      return heroPair.find((h) => h !== hero)
    }
  }
}
