import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { press, getState as local } from './';


// Component
export class ButtonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  onPress(e, pressed) {
    e.preventDefault(); // prevent touch from also triggering onMouseDown
    this.props.onPress(this.props.number, pressed);
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { numberOfButtons, number, pressed } = this.props;

    const marginPercent = 0.1;
    const totalSize = _.min([this.state.width / numberOfButtons]);
    const margin = totalSize * marginPercent;
    const size = totalSize - (margin * 2);

    return (
      // eslint-disable-next-line
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: pressed ? 'darkRed' : 'red',
          width: `${size}px`,
          height: `${size}px`,
          color: 'white',
        }}
        onTouchStart={e => this.onPress(e, true)}
        onTouchEnd={e => this.onPress(e, false)}
        onMouseDown={e => this.onPress(e, true)}
        onMouseUp={e => this.onPress(e, false)}
        // do not pass onClick to parent
        // app listens for 5-click, which should be outside the buttons
        onClick={e => e.stopPropagation()}
      >
        {number}
      </div>
    );
  }
}

ButtonComponent.propTypes = {
  numberOfButtons: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  pressed: PropTypes.bool,
};

ButtonComponent.defaultProps = {
  pressed: false,
};

// Container
const mapStateToProps = (state, ownProps) => ({
  pressed: local(state)[ownProps.number],
});

const mapDispatchToProps = dispatch => ({
  onPress: (number, pressed) => {
    dispatch(press(number, pressed));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonComponent);
