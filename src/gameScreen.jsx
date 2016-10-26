var React = require('react');

var Stats = require('./stats');

var GameScreen = React.createClass({
    render: function(){
        return (
            <div className="gameScreen">
                <Stats current={this.wrapCurrent()} max={this.wrapMax()} />
            </div>
        )
    },

    wrapCurrent: function(){
        return({
            energy: this.props.player.energy.current,
            health: this.props.player.health.current,
            money: this.props.player.money.current
        });
    },

    wrapMax: function(){
        return({
            energy: this.props.player.energy.max,
            health: this.props.player.health.max,
            money: this.props.player.money.max
        });
    }
});

module.exports = GameScreen;