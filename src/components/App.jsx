import React from 'react'
import P from 'prop-types'
import CSSModules from 'react-css-modules'

import WeatherSwitcher from './WeatherSwitcher'
import WeatherCalendar from './WeatherCalendar'
import styles from './App.scss'


const App = ({ styles }) => (
  <div styleName="component">
    <WeatherSwitcher />
    <WeatherCalendar />
  </div>
)


export default CSSModules(App, styles)