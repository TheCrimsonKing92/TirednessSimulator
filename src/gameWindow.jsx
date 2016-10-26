var React = require('react');

var GameScreen = require('./gameScreen');
var InitializeScreen = require('./initializeScreen');
var LoadScreen = require('./loadScreen');
var StatisticsScreen = require('./statisticsScreen');

var GameWindow = React.createClass({
    componentDidMount: function(){
        console.log("GameWindow props: " + JSON.stringify(this.props));
        console.log("GameWindow state: " + JSON.stringify(this.state));
    },
    render: function() {
        return (
            <div className="gameWindow nudge-up shadow tall">
                {this.props.screen === 1 && <GameScreen environment={this.props.environment} player={this.props.player} />}
                {this.props.screen === 2 && <LoadScreen handleLoadCallback={this.props.handleLoadCallback} />}
                {this.props.screen === 3 && <InitializeScreen environment={this.props.environment} player={this.props.player} initialize={this.props.initializeGameCallback} />}
                {this.props.screen === 4 && <StatisticsScreen environment={this.props.environment} player={this.props.player} />}
            </div>
        );
    }
});

module.exports = GameWindow;