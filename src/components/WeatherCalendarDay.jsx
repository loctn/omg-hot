import React from 'react'
import P from 'prop-types'
import CSSModules from 'react-css-modules'

import { kelvinToFahrenheit, kelvinToCelsius } from '~/lib/temperature'
import styles from './WeatherCalendarDay.scss'


const MONTHS = ['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const WeatherCalendarDay = ({ styles, forecast, isToday }) => {
  const date = new Date(forecast.dt * 1000)
  const dayOfWeek = isToday ? 'Now' : DAYS_OF_WEEK[date.getDay()].substr(0, 3)
  const dateText = MONTHS[date.getMonth()].substr(0, 3) + ' ' + date.getDate()
  const high = kelvinToFahrenheit(isToday ? forecast.main.temp : forecast.temp.max).toFixed(0)
  const low = isToday ? '' : kelvinToFahrenheit(forecast.temp.min).toFixed(0)

  return (
    <div styleName="component" style={{
      marginLeft: isToday ? (100 * date.getDay() / 7) + '%' : '0'
    }}>
      <div styleName="day-of-week">{dayOfWeek}</div>
      <div styleName="date">{dateText}</div>
      <img src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} />
      <div styleName="high">{high}</div>
      {(low || low === 0) &&
        <div styleName="low">{low}</div>
      }
    </div>
  )
}


export default CSSModules(WeatherCalendarDay, styles)