var React = require('react');

var MenuText = React.createClass({
    render: function(){
        return (
            <div className="text-center menuButton">
                <h4>
                    <p className="white-text">{this.props.text}</p>
                </h4>
            </div>
        )
    }
});

module.exports = MenuText;