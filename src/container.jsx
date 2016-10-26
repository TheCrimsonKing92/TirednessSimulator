var React = require('react');

var Banner = require('./banner');
var Game = require('./game');

var Container = React.createClass({
    render: function() {
        return (
            <div className="main">
                <Banner />
                <div className="col-xs-12 nudge-down">
                    <Game />
                </div>
            </div>
        );
    }  
});

module.exports = Container;