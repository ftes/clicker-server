import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FA from 'react-fontawesome';

import { IdMappingsModal } from '@clickr/common/lib/id-mappings';
import { AskQuestion, Showdown } from '@clickr/common/lib/questions';
import { ShowSettings } from '@clickr/common/lib/show-settings';
import { getState as isSyncEnabled } from '@clickr/common/lib/sync';

import Save from '../save/save';
import Load from '../save/load';
import Reset from '../save/reset';
import { zIndex, tabIndex } from '../core/globals';
import SaveQuestions from '../save/save-questions';
import Sync from './sync';

// Component
export const NavbarComponent = ({ showSettings, syncEnabled }) => {
  let input;
  let idMappings;

  return (
    // in front of countdown
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark  justify-content-between"
      style={{ zIndex: zIndex.navbar }}
    >
      <span className="navbar-brand">Clickr Teacher</span>
      <button className="navbar-toggler" type="button" data-toggle="collapse">
        <span className="navbar-toggler-icon" />
      </button>

      <AskQuestion />

      <Showdown />

      <span className="btn-group">
        {showSettings &&
          <span className="btn-group">
            <SaveQuestions />
            <Reset />
            <Sync enabled={syncEnabled} />
            <button
              className="btn btn-outline-secondary"
              onClick={() => idMappings.open()}
            >
              <FA name="edit" />
              ID Mappings
            </button>
            <Save />
            <Load getInput={() => input} />
          </span>
        }
        <ShowSettings />
      </span>

      <input type="file" style={{ display: 'none' }} ref={(c) => { input = c; }} />
      <IdMappingsModal ref={(c) => { idMappings = c; }} startTabIndex={tabIndex.idMappings} />
    </nav>
  );
};

NavbarComponent.propTypes = {
  showSettings: PropTypes.bool.isRequired,
  syncEnabled: PropTypes.bool.isRequired,
};

// Container
const mapStateToProps = state => ({
  syncEnabled: isSyncEnabled(state),
});

export default connect(mapStateToProps)(NavbarComponent);
