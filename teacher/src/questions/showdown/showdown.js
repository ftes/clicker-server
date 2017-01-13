import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Button from '../../components/button'
import { start } from './'
import { getState as deviceList } from '../../devices/device-list'
import { getState as devicesSettings } from '../../devices/settings'

// Component
export const Showdown = ({ startCallback, devices,
  devicesSettings, ...props }) => (
  <Button
    {...props}
    onClick={() => startCallback(devices, devicesSettings)}
    title='Randomly choose a person who knows the answer.'
  />
)

Showdown.propTypes = {
  startCallback: PropTypes.func.isRequired,
  devices: PropTypes.array.isRequired,
  devicesSettings: PropTypes.object.isRequired,
}

// Container
const mapStateToProps = (state) => ({
  devices: deviceList(state),
  devicesSettings: devicesSettings(state),
})

const mapDispatchToProps = (dispatch) => ({
  startCallback: (devices, settings) => dispatch(start(devices, settings)),
  label: 'Pick',
  faIcon: 'play',
})

export default connect(mapStateToProps, mapDispatchToProps)(Showdown)