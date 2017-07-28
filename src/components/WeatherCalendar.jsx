import React, { Component } from 'react'
import P from 'prop-types'
import CSSModules from 'react-css-modules'
import { withRouter } from 'react-router-dom'

import { getCurrentWeather, get16DayForecast } from '~/apiClient'
import WeatherCalendarDay from './WeatherCalendarDay'
import styles from './WeatherCalendar.scss'


class WeatherCalendar extends Component {
  state = {
    currentWeather: {},
    forecasts: [],
  }

  componentWillReceiveProps(nextProps) {
    const pathname = nextProps.history.location.pathname
    if (pathname === '/') return

    const latLngString = decodeURIComponent(pathname.substr(1)).split(',')
    const lat = parseInt(latLngString[0])
    const lng = parseInt(latLngString[1])

    Promise.all([getCurrentWeather(lat, lng), get16DayForecast(lat, lng)])
      .then(data => {
        this.setState({
          currentWeather: data[0],
          forecasts: data[1].list.slice(1),
        })
      })
  }

  render() {
    const currentWeather = this.state.currentWeather
    const forecasts = this.state.forecasts
    const firstDate = currentWeather.dt ? new Date(currentWeather.dt * 1000) : new Date()
    const forecastsPadLeft = new Array(firstDate.getDay()).fill({})

    return (
      <div styleName="component">
        {forecastsPadLeft.map((fc, i) =>
          <WeatherCalendarDay key={i} forecast={fc} />
        )}
        {currentWeather.dt &&
          <WeatherCalendarDay forecast={currentWeather} isToday={true} />
        }
        {forecasts.map(fc =>
          <WeatherCalendarDay key={fc.dt} forecast={fc} />
        )}
      </div>
    )
  }
}


export default withRouter(CSSModules(WeatherCalendar, styles))