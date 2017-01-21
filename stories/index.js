import React, { Component } from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import HeroDemo from './HeroDemo'
import ResizeHeroDemo from './ResizeHeroDemo'

storiesOf('Hero animation', module)
  .add('scale hero element', () => (
    <HeroDemo />
  ))
  .add('resize hero element', () => (
    <ResizeHeroDemo />
  ))
