var React = require('react');

var GameMenuButton = require('./gameMenuButton');

var GameMenu = React.createClass({
    render: function() {
        return (
            <div className="gameMenu shadow">
                <GameMenuButton text="New Game" onClickCallback={this.props.newGameCallback} />
                <GameMenuButton text="Load Game" onClickCallback={this.props.loadGameCallback} />
                <GameMenuButton text="Save Game" onClickCallback={this.props.saveGameCallback} />
                <GameMenuButton text="Statistics" onClickCallback={this.props.statisticsCallback} />
            </div>
        );
    }
});

module.exports = GameMenu;