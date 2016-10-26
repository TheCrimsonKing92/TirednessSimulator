var React = require('react');

var MenuButton = require('./menuButton');

var Menu = React.createClass({
    render: function() {
        return (
          <div className="menu">
            <MenuButton text="Home" href="https://thecrimsonking.net/" />
            <MenuButton text="Patreon" href="https://www.patreon.com/TheDecentTech" />
            <MenuButton text="Progressive Game" href="https://thecrimsonking.net/ProgressiveGame" />
            <MenuButton text="ReactJS Demo" href="https://thecrimsonking.net/React-ion" />
          </div>  
        );
    }  
});

module.exports = Menu;