var React = require('react');
var ReactDOM = require('react-dom');
require('babel-polyfill');
require('./style');

var Container = require('./container');

ReactDOM.render(<Container />, document.getElementById('container'));