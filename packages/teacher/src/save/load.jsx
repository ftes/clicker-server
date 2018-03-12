import React from 'react';
import PropTypes from 'prop-types';
import yaml from 'js-yaml';
import { connect } from 'react-redux';

import { Button } from '@clickr/common/lib/components';
import { load } from '@clickr/common/lib/save';
import { console } from '@clickr/common/lib/util';

// getInput must not be passed to Button
// eslint-disable-next-line no-unused-vars
export const LoadComponent = ({ getInput, ...props }) => (
  <Button {...props} />
);

LoadComponent.propTypes = {
  getInput: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

let added = false;

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
  label: 'Load',
  glyph: 'open',
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadComponent);
