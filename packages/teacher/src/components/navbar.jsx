import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{ zIndex: zIndex.navbar }}
    >
      <span className="navbar-brand">Clickr Teacher</span>
      <button className="navbar-toggler" type="button" data-toggle="collapse">
        <span className="navbar-toggler-icon" />
      </button>

      <form className="form-inline">
        <AskQuestion />
      </form>

      <ul className="navbar-nav">
        <Showdown />
      </ul>

      <ul className="navbar-nav">
        <ShowSettings />
        {showSettings &&
          <span>
            <SaveQuestions />
            <Reset />
            <Sync enabled={syncEnabled} />
            <li
              className="nav-item"
              onClick={() => idMappings.open()}
              faIcon="edit"
            >ID Mappings
            </li>
            <Save />
            <Load getInput={() => input} />
          </span>
        }
      </ul>

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
