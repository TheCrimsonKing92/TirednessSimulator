var React = require('react');

var StatBar = require('./statBar');

var Stats = React.createClass({
    render: function(){
        return (
            <div className="col-xs-12 nudge-down statsBar">
                <StatBar kind="healthBar" value={this.props.current.health} max={this.props.max.health} />
                <StatBar kind="energyBar" value={this.props.current.energy} max={this.props.max.energy} />
                <StatBar kind="moneyBar" value={this.props.current.money} max={this.props.max.money} />
            </div>
        )
    }
});

module.exports = Stats;