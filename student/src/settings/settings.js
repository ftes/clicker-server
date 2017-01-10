import React, { PropTypes } from 'react'
import Edit from './editC'
import Unlock from './unlockC'

const component = ({ unlocked }) => (
  unlocked ? <Edit/> : <Unlock/>
)

component.propTypes = {
  unlocked: PropTypes.bool.isRequired,
}

export default component