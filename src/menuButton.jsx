var React = require('react');

var MenuButton = React.createClass({
    render: function(){
        return (
            <div className="text-center menuButton">
                <h4>
                    <a className="white-text" href={this.props.href}>{this.props.text}</a>
                </h4>
            </div>
        );
    }
});

module.exports = MenuButton;