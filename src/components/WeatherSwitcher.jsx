import React, { Component } from 'react'
import P from 'prop-types'
import CSSModules from 'react-css-modules'
import { withRouter } from 'react-router-dom'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import styles from './WeatherSwitcher.scss'


class WeatherSwitcher extends Component {
  state = {
    address: 'San Francisco, CA'
  }
  
  getCoordinates(address) {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.props.history.push(encodeURIComponent(latLng.lat + ',' + latLng.lng))
      })
      .catch(error => console.error('Error', error))
  }
  
  handlePlaceChange = (address) => {
    this.setState({ address })
  }

  handlePlaceEnterKeyDown = () => {
    this.getCoordinates(this.state.address)
  }

  handlePlaceSelect = (address) => {
    this.handlePlaceChange(address)
    this.getCoordinates(address)
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.handlePlaceChange,
    }

    return (
      <div styleName="component">
        <PlacesAutocomplete
          inputProps={inputProps}
          onEnterKeyDown={this.handlePlaceEnterKeyDown}
          onSelect={this.handlePlaceSelect}
        />
      </div>
    )
  }
}


export default withRouter(CSSModules(WeatherSwitcher, styles))