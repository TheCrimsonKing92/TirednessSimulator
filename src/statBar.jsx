var React = require('react');

var StatBar = React.createClass({
    render: function(){
        return (
            <div className="col-xs-4 text-center">
                <meter className={"statBar " + this.props.kind} title={this.props.value} min="0" low="25" optimum="50" high="75" max={this.props.max} value={this.props.value}></meter>
            </div>
        )
    }
});

module.exports = StatBar;