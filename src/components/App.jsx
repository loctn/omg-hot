import React, { Component } from 'react'
import P from 'prop-types'
import CSSModules from 'react-css-modules'

import WeatherSwitcher from './WeatherSwitcher'
import styles from './App.scss'


const App = ({ styles }) => (
  <div styleName="component">
    <WeatherSwitcher />
  </div>
)


export default CSSModules(App, styles)