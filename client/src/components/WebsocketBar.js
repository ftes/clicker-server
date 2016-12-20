import React from 'react'
import { emit } from '../actions/websocket'
import { messageTypes } from '../../../common/websocket'

const WebsocketBar = () => {

  return (
    <a href="#"
       onClick={e => {
         e.preventDefault()
         emit(messageTypes.getBatteryLevel)
       }}
    >
      Check battery levels
    </a>
  )
}

export default WebsocketBar
