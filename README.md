# react-hero-animation
With this library, you can easily create Hero animations in your React apps. A demo is available [here][gh-pages].

## Usage
The `HeroAnimationProvider` needs to wrap all components. It tracks the registered heroes and which one to animate.

Also, every animatable element (the heroes) need to be wrapped with a `Hero` component.

```jsx
import { HeroAnimationProvider, Hero } from 'react-hero-animation'

<HeroAnimationProvider>
  <Hero id='hero-1' show={true}>
    <YourChildComponent />
  </Hero>
  <Hero id='hero-1' show={false}>
    <YourChildComponent />    
  </Hero>
</HeroAnimationProvider>
```

## `Hero` properties
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| children* | `element` | | One child element, must be either a dom element or a `React.Component` instance (it gets a `ref`, so pure functional components are not supported). |
| id* | `string` | | A unique ID of this hero. Every hero with the same ID is treated as one animatable element and only one of it can be visible at once. |
| resize | `bool` | `false` | If true, the wrapped component will be resized (using `width` and `height`) instead of scaled. |
| show | `bool` | `false` | Displays the wrapped component, using a hero animation. Only one `Hero` can be displayed at a time. |

## License
The files included in this repository are licensed under the MIT license.

[gh-pages]: https://teamwertarbyte.github.io/react-hero-animation/