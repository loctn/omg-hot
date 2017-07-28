import React from 'react'
import P from 'prop-types'
import CSSModules from 'react-css-modules'

import styles from './WeatherCalendarDay.scss'


const WeatherCalendarDay = ({ styles, forecast }) => (
  <div styleName="component">
    {JSON.stringify(forecast)}
    <img src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} />
  </div>
)


export default CSSModules(WeatherCalendarDay, styles)