var React = require('react');

var Menu = require('./menu');
var MenuText = require('./menuText');
var NameButton = require('./nameButton');

var Banner = React.createClass({
    render: function() {
        return (
          <div className="col-xs-12 banner shadow">
            <div className="col-xs-2 text-right">
                <NameButton text="Miles Grimes" href="https://thecrimsonking.net/About" />
            </div>
            <div className="col-xs-8">
                <Menu />
            </div>
            <div className="col-xs-2">
                <MenuText text="Tiredness Simulator" />
            </div>
          </div>  
        );
    }  
});

module.exports = Banner;