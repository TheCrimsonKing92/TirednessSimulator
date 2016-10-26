var React = require('react');

var NameButton = React.createClass({
    render: function() {
        return (
          <div className="text-center nameButton">
            <h4>
                <a className="white-text" href={this.props.href}>{this.props.text}</a>
            </h4>
          </div>  
        );
    }  
});

module.exports = NameButton;