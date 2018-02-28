import React, { PropTypes } from 'react'
import { Subject } from 'rxjs'
import { connect } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css'

import { toggleShow } from './'

// COMPONENT
export class FiveClick extends React.Component {
  /**
   * On 5-click show settings.
   */
  componentDidMount() {
    const clickStream = new Subject()

    clickStream
      .bufferWhen(() => clickStream.debounceTime(200)) // 200ms
      .map(list => list.length)
      .filter(length => length === 5) // 5 clicks
      .subscribe(() => this.props.toggleShow())

    this.clickStream = clickStream
  }

  onClick() {
    this.clickStream.next()
  }

  render() {
    const { children } = this.props
    return (
      <div onClick={() => this.onClick()}>
        {children}
      </div>
    )
  }
}

FiveClick.propTypes = {
  children: PropTypes.any.isRequired,
  toggleShow: PropTypes.func.isRequired,
}

// CONTAINER
const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  toggleShow: () => dispatch(toggleShow()),
})

export default connect(mapStateToProps, mapDispatchToProps)(FiveClick)