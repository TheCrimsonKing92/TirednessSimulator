var React = require('react');

var TraitsType = React.createClass({
    render: function() {
        return (
            <div className="traitsType">
                <div className="col-xs-12 nudge-down">
                    <p>First, choose how you'd like your traits to be generated.</p>
                    <p>Random generation adds a starting money bonus, but not all traits are beneficial</p>
                </div>
                <div className="col-xs-6">
                    <button type="button" className="form-control" value="Manual" onClick={this.props.onClickCallback}>Manual</button>
                </div>
                <div className="col-xs-6">
                    <button type="button" className="form-control" value="Random" onClick={this.props.onClickCallback}>Random</button>
                </div>
            </div>
        );
    }
});

module.exports = TraitsType;