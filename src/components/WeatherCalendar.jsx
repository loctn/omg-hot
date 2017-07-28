import React, { Component } from 'react'
import P from 'prop-types'
import CSSModules from 'react-css-modules'
import { withRouter } from 'react-router-dom'

import { get16DayForecast } from '~/apiClient'
import WeatherCalendarDay from './WeatherCalendarDay'
import styles from './WeatherCalendar.scss'


class WeatherCalendar extends Component {
  state = {
    forecasts: []
  }

  componentWillReceiveProps(nextProps) {
    const pathname = nextProps.history.location.pathname

    if (pathname !== '/') {
      const latLngString = decodeURIComponent(pathname.substr(1)).split(',')
      const lat = parseInt(latLngString[0])
      const lng = parseInt(latLngString[1])

      get16DayForecast(lat, lng)
        .then(data => {
          this.setState({ forecasts: data.list })
        })
    }
  }

  render() {
    return (
      <div styleName="component">
        {this.state.forecasts.map(fc =>
          <WeatherCalendarDay key={fc.dt} forecast={fc} />
        )}
      </div>
    )
  }
}


export default withRouter(CSSModules(WeatherCalendar, styles))