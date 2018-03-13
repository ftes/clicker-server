import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { saveAs } from 'file-saver';
import yaml from 'js-yaml';

import { console, del } from '@clickr/common/lib/util';

import { deleteOnFileSave } from '../core/reducers';

const SaveComponent = ({ onClick }) => (
  <li
    className="nav-item"
    onClick={onClick}
  >
    <FontAwesome name="save" />
    &nbsp;
    Save
  </li>
);

SaveComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  onClick: () => {
    const stateToSave = del(state, deleteOnFileSave);

    try {
      const content = yaml.dump(stateToSave);
      const file = new File(
        [content],
        `${stateToSave.className}.yaml`,
        { type: 'application/yaml' },
      );
      saveAs(file);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('Error saving file.');
      console.error(error);
    }
  },
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SaveComponent);
