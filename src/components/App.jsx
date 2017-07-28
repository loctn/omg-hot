import React, { Component } from 'react'
import P from 'prop-types'
import CSSModules from 'react-css-modules'
import { withRouter } from 'react-router-dom'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import styles from './App.scss'


class App extends Component {
  state = {
    address: 'San Francisco, CA'
  }

  constructor(props) {
    super(props)
    this.onPlaceChange = address => this.setState({ address: address })
  }
  
  getCoordinates(address) {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.props.history.push(encodeURIComponent(address).replace(/%20/g, '+'))
      })
      .catch(error => console.error('Error', error))
  }

  handlePlaceEnterKeyDown = () => {
    this.getCoordinates(this.state.address)
  }

  handlePlaceSelect = (address) => {
    this.onPlaceChange(address)
    this.getCoordinates(address)
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onPlaceChange,
    }

    return (
      <div styleName="component">
        <PlacesAutocomplete inputProps={inputProps}
          onEnterKeyDown={this.handlePlaceEnterKeyDown}
          onSelect={this.handlePlaceSelect}
        />
      </div>
    )
  }
}


export default withRouter(CSSModules(App, styles))