import React from 'react';

import Adapter from 'enzyme-adapter-react-15';

import { shallow, render, mount, configure } from 'enzyme';

configure({ adapter: new Adapter() });
const intl = {
  login: {
    loggedIn: true,
    rememberMe: {
      email: '',
      password: ''
    }
  }
};

global.intl = intl;

global.shallow = shallow;

global.render = render;

global.mount = mount;
