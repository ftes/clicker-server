import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Edit from './edit'
import Unlock from './unlock'
import { getState as local } from './'

import './settings.css'

// COMPONENT
const Settings = ({ unlocked }) => (
  <div className='settings' style={{
    width: '100%',
    height: '100%',
    // transform: 'translateY(50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }}>
    {unlocked &&
      <Edit/>
    }
    {!unlocked &&
      <Unlock/>
    }
  </div>
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