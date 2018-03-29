import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { unlock, getState as local, toggleShow } from './';

// Component
export class UnlockComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pin: '' };
  }

  unlock() {
    this.props.unlock(this.state.pin);
  }

  render() {
    const { unlockFailed } = this.props;
    return (
      <div>
        <div className="form-group">
          <label htmlFor="unlock">
            PIN (default: 0000)
            <input
              id="unlock"
              className={classNames({
                'is-invalid': unlockFailed,
              })}
              type="number"
              onChange={e => this.setState({ pin: e.target.value })}
              onKeyPress={e => e.key === 'Enter' && this.unlock()}
            />
          </label>
        </div>
        <div className="btn-group">
          <button className="btn" onClick={() => this.unlock()}>Unlock</button>
          <button className="btn float-right" onClick={this.props.toggleShow}>Close</button>
        </div>
      </div>
    );
  }
}

UnlockComponent.propTypes = {
  unlock: PropTypes.func.isRequired,
  unlockFailed: PropTypes.bool.isRequired,
  toggleShow: PropTypes.func.isRequired,
};

// Container`
const mapStateToProps = state => ({
  unlockFailed: local(state).unlockFailed,
});

const mapDispatchToProps = dispatch => ({
  unlock: pin => dispatch(unlock(pin)),
  toggleShow: () => dispatch(toggleShow()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UnlockComponent);
