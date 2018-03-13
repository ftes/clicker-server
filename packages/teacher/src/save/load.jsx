import React from 'react';
import PropTypes from 'prop-types';
import yaml from 'js-yaml';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

import { load } from '@clickr/common/lib/save';
import { console } from '@clickr/common/lib/util';

const LoadComponent = ({ onClick }) => (
  <li
    className="nav-item"
    onClick={onClick}
  >
    <FontAwesome name="folder-open" />
    &nbsp;
    Load
  </li>
);

LoadComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

let added = false;

// TODO better handling of event listener (register, deregister with component lifecycle)
const mapDispatchToProps = (dispatch, { getInput }) => ({
  onClick: () => {
    const input = getInput();
    if (!added) {
      added = true;
      input.addEventListener('change', (e) => {
        const { target: { files } } = e;
        if (files.length > 0) {
          const reader = new FileReader();
          reader.onloadend = (event) => {
            if (event.target.readyState === FileReader.DONE) {
              try {
                const state = yaml.load(event.target.result);
                dispatch(load(state));
              } catch (error) {
                // eslint-disable-next-line no-alert
                alert('Error loading file.');
                console.error(error);
              }
            }
          };
          reader.readAsText(files[0]);
        }
      }, false);
    }
    input.click();
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadComponent);
