import React from 'react';
import ReactDOM from 'react-dom';
import IdMappings from './id-mappings';

class IdMappingsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  close = () => {
    this.setState({ show: false });
  }

  open = () => {
    this.setState({ show: true });
  }

  render() {
    const { show } = this.state;

    return show && ReactDOM.createPortal(
      <div
        className="modal"
        style={{
          display: show ? 'block' : undefined,
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">ID Mappings</h5>
              <button type="button" className="close" onClick={this.close}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <IdMappings {...this.props} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={this.close}>Close</button>
            </div>
          </div>
        </div>
      </div>,
      document.body,
    );
  }
}

export default IdMappingsModal;
