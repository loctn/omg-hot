import React from 'react'
import P from 'prop-types'
import CSSModules from 'react-css-modules'

import styles from './WeatherCalendarDay.scss'


const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const WeatherCalendarDay = ({ styles, forecast, isToday }) => {
  const date = forecast.dt ? new Date(forecast.dt * 1000) : new Date()
  const dayOfWeek = isToday ? 'Today' : DAYS_OF_WEEK[date.getDay()].substr(0, 3)

  return (
    <div styleName="component">
      {forecast.dt &&
        <div>
          <div styleName="day-of-week">{dayOfWeek}</div>
          <img src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} />
          <div styleName="high">{isToday ? forecast.main.temp : forecast.temp.max}</div>
          <div styleName="low">{isToday ? '' : forecast.temp.min}</div>
        </div>
      }
    </div>
  )
}


export default CSSModules(WeatherCalendarDay, styles)