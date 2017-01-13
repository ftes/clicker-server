import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Edit from './editC'
import Unlock from './unlockC'
import { getState as local } from './'

// COMPONENT
const Settings = ({ unlocked }) => (
  unlocked ? <Edit/> : <Unlock/>
)

Settings.propTypes = {
  unlocked: PropTypes.bool.isRequired,
}

// CONTAINER
const mapStateToProps = (state) => ({
  unlocked: local(state).unlocked,
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)