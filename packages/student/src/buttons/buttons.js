import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import Button from './button'
import { getState as settings, get } from '../settings'

// Component
export const Buttons = ({ style, numberOfButtons }) => (
  <div
    style={{
      ...style,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
    }}
  >
    {_.range(0, numberOfButtons).map(i =>
      <Button key={i} number={i+1} numberOfButtons={numberOfButtons}/>
    )}
  </div>
)

Buttons.propTypes = {
  numberOfButtons: PropTypes.number.isRequired,
  style: PropTypes.object,
}

// Container
const mapStateToProps = (state) => ({
  numberOfButtons: get(settings(state), 'nButtons'),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Buttons)