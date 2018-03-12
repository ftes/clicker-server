import React from 'react';

export default class Insomnia extends React.Component {
  componentWillMount() {
    if (window.plugins && window.plugins.insomnia) { window.plugins.insomnia.keepAwake(); }
  }

  componentWillUnmount() {
    if (window.plugins && window.plugins.insomnia) { window.plugins.insomnia.allowSleepAgain(); }
  }

  render() {
    return null;
  }
}
