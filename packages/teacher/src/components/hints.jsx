import React from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';

import './hints.css';

const Hints = ({ showSettings }) => {
  if (!showSettings) return null;

  return (
    <div
      className="card"
      id="hints"
    >
      <div className="card-header">
        <h1>Hints</h1>
      </div>
      <div className="card-body">
        <ul className="list-group">
          <li className="list-group-item">
            Pressing the device button will add it to the list.
          </li>
          <li className="list-group-item">
            You can edit device names by clicking on them.
          </li>
          <li className="list-group-item">
            You can navigate between elements with the &nbsp;
            <FA name="exchange" /> Tab key.
          </li>
          <li className="list-group-item">
            <b>Ctrl + Enter:</b> Ask Question<br />
          </li>
          <li className="list-group-item">
            Reorder devices with drag and drop.
          </li>
          <li className="list-group-item">
            You can edit the class name by clicking on it.
          </li>
          <li className="list-group-item">
            You can map the technical device IDs to something you can understand
            using the <FA name="edit" /> ID Mappings dialog.
          </li>
          <li className="list-group-item">
            Each displayed name has an icon next to it that explains where this
            name is defined. In the list below, each setting overrides the ones
            below it.<br />
            <FA name="user-o" />: Custom Device name<br />
            <FA name="edit" />: ID Mapping<br />
            <FA name="gear" />: Technical Device ID<br />
          </li>
        </ul>
      </div>
    </div>
  );
};

Hints.propTypes = {
  showSettings: PropTypes.bool.isRequired,
};

export default Hints;
