import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import App from './config/App';
import './utilities/prototypes.js';
require('dotenv').config();
/*************** Render App ********/
ReactDOM.render(<App />, document.getElementById('app'));
