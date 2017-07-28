import React, { Component } from 'react'
import P from 'prop-types'
import CSSModules from 'react-css-modules'

import { kelvinToFahrenheit, kelvinToCelsius } from '~/lib/temperature'
import skyconsMap from './skyconsMap.json'
import styles from './WeatherCalendarDay.scss'


const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

class WeatherCalendarDay extends Component {
  componentDidMount() {
    const weather = this.props.forecast.weather[0]
    const skyconsFunction = Skycons[skyconsMap[weather.icon] || skyconsMap[weather.id]]
    if (!skyconsFunction) return
    
    this.skycons = new Skycons({ color: '#0af' })
    this.skycons.set(this.canvas, skyconsFunction)
    this.skycons.play()
  }

  componentWillUnmount() {
    if (this.skycons) {
      this.skycons.remove(this.canvas)
    }
  }

  render() {
    const forecast = this.props.forecast
    const isToday = this.props.isToday
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
        <canvas styleName="icon" ref={canvas => this.canvas = canvas} width="40" height="40"></canvas>
        <div styleName="high">{high}</div>
        {low &&
          <div styleName="low">{low}</div>
        }
      </div>
    )
  }
}


export default CSSModules(WeatherCalendarDay, styles)