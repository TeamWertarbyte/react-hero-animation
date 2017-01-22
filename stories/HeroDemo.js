import React, { Component } from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import { HeroAnimationProvider, Hero } from '../src'

export default class HeroDemo extends Component {
  constructor (props) {
    super(props)
    this.state = { index: 0 }
  }

  render () {
    const { index } = this.state
    return (
      <HeroAnimationProvider>
        <button onClick={() => this.setState({ index: index + 1 })}>Next</button>
        <Hero id='hero-1' show={index % 3 === 0}>
          <div style={{ background: '#cfc', width: 200, height: 100 }}>A</div>
        </Hero>

        <Hero id='hero-1' show={index % 3 === 1}>
          <div style={{ background: '#ccf', width: 400, height: 200 }}>B</div>
        </Hero>

        {index % 3 === 2 && <Hero id='hero-1' show>
          <div style={{ background: '#fcc', width: 100, height: 300 }}>C</div>
        </Hero>}
      </HeroAnimationProvider>
    )
  }
}
