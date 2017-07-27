import React from 'react'
import P from 'prop-types'
import CSSModules from 'react-css-modules'

import styles from './App.scss'


const App = ({ styles }) => (
  <div styleName="component">
    the quick brown fox jumps over the lazy dog
  </div>
)


export default CSSModules(App, styles)