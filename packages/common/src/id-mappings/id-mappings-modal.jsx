import React from 'react';
import { Modal } from 'react-bootstrap';
import IdMappings from './id-mappings';

class IdMappingsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  close() {
    this.setState({ show: false });
  }

  open() {
    this.setState({ show: true });
  }

  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={() => this.close()}
      >
        <Modal.Header closeButton>
          <Modal.Title>ID Mappings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <IdMappings {...this.props} />
        </Modal.Body>
      </Modal>
    );
  }
}

export default IdMappingsModal;
