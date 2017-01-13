import React, { PropTypes } from 'react'
import _ from 'lodash'

class Button extends React.Component {
  constructor(props) {
    super(props)
    this.state = { height: 0, width: 0 }
    this.updateDimensions = this.updateDimensions.bind(this)
  }

  updateDimensions() {
    this.setState({ height: window.innerHeight, width: window.innerWidth })
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  onPress(e, pressed) {
    e.preventDefault() // prevent touch from also triggering onMouseDown
    this.props.onPress(this.props.number, pressed)
  }

  render() {
    const { numberOfButtons, number, pressed } = this.props

    const marginPercent = 0.1
    let totalSize = _.min([this.state.width / numberOfButtons])
    let margin = totalSize * marginPercent
    let size = totalSize - margin * 2

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: pressed ? 'darkRed' : 'red',
          width: size + 'px',
          height: size + 'px',
          color: 'white',
        }}
        onTouchStart={(e) => this.onPress(e,true)}
        onTouchEnd={(e) => this.onPress(e,false)}
        onMouseDown={(e) => this.onPress(e,true)}
        onMouseUp={(e) => this.onPress(e,false)}
        // do not pass onClick to parent
        // app listens for 5-click, which should be outside the buttons
        onClick={e => e.stopPropagation()}
      >
        {number}
      </div>
    )
  }
}

Button.propTypes = {
  numberOfButtons: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  pressed: PropTypes.bool,
}

export default Button