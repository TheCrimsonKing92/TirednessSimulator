var React = require('react');

var LoadScreen = React.createClass({
    getInitialState: function(){
        return({
            loadString: ''
        });
    },
    handleChange: function(e){
        this.setState({loadString: e.target.value});
    },
    handleClick: function(){
        console.log("Click handled by LoadScreen button");
        console.log("LoadString value: " + this.state.loadString);
        this.props.handleLoadCallback(this.state.loadString);
    },
    render: function(){
        return(
            <div className="loadScreen">
                <div classname="col-xs-10">
                    <div className="form-group">
                        <label>Enter or paste your saved string</label>
                        <input className="form-control" type="text" onChange={this.handleChange} value={this.state.loadString} />
                    </div>
                </div>
                <div className="col-xs-12">
                    <button type="button" onClick={this.handleClick}>Load</button>
                </div>
            </div>
        );
    }
});

module.exports = LoadScreen;