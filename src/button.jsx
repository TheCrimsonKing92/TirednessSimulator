var React = require('react');

var Button = React.createClass({
    render: function() {
        return (
          <div className="text-center">
            <h4>
                <a className="white-text" href={this.props.href}>{this.props.text}</a>
            </h4>
          </div>  
        );
    }  
});

module.exports = Button;