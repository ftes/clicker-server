import React, { PropTypes } from 'react'
import { Button, Panel } from 'react-bootstrap'

class Updates extends React.Component{
  componentWillMount() {
    this.props.checkUpdates()
  }

  render() {
    const { state, update, showSettings } = this.props

    if (!showSettings) return null
    if (state.checkRequestPending)
      return <Panel bsStyle='warning' header='Updates not yet checked'/>
    if (state.behindCommits === 0) return null
    let updateStyle = state.updateSuccessful ? 'default' : 'danger'

    return (
      <Panel header='Updates available' bsStyle='info'>
        {state.behindCommits} commit(s) behind<br/>
        <Button
          onClick={update}
          bsStyle={updateStyle}
          active={state.updateRequestPending}
        >
          {state.updateSuccessful ? 'Update' : 'Update (failed)'}
        </Button>
      </Panel>
    )
  }
}

Updates.propTypes = {
  state: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  checkUpdates: PropTypes.func.isRequired,
  showSettings: PropTypes.bool.isRequired,
}

export default Updates