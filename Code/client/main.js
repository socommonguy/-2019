import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '../imports/pages/App';
// import '../imports/startup/accounts-config';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
