import React, { PropTypes } from 'react'
import _ from 'lodash'

import Button from './buttonC'

const component = ({ style, numberOfButtons }) => (
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

component.propTypes = {
  numberOfButtons: PropTypes.number.isRequired,
  style: PropTypes.object,
}

export default component