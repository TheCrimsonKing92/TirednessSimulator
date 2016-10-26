var React = require('react');

var GameMenuButton = React.createClass({
    render: function(){
        return (
            <div className="menuButton">
                <h4 className="text-center" onClick={this.props.onClickCallback}>{this.props.text}</h4>
            </div>
        )
    }
});

module.exports = GameMenuButton;