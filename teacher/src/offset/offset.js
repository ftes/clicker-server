import React, { PropTypes } from 'react'

import OffsetButton from './offset-button'

export const component = ({ children, deviceKey, ...props }) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <OffsetButton label='-' deviceKey={deviceKey}  by={-1} {...props}/>
    {children}
    <OffsetButton label='+' deviceKey={deviceKey}  by={1} {...props}/>
  </div>
)

component.propTypes = {
  children: PropTypes.any,
  deviceKey: PropTypes.string.isRequired,
}

export default component