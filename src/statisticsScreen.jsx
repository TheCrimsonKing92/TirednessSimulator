var React = require('react');

var StatisticsScreen = React.createClass({
    render: function() {
        return (
            <div className="statsScreen">
                <div className="col-xs-4">
                    <p>Current Energy:</p>
                    <p>{this.props.player.energy.current}</p>
                </div>
                <div className="col-xs-4">
                    <p>Current Health:</p>
                    <p>{this.props.player.health.current}</p>
                </div>
                <div>
                    <p>Current Money:</p>
                    <p>{this.props.player.money.current}</p>
                </div>
            </div>
        );
    }
});

module.exports = StatisticsScreen;