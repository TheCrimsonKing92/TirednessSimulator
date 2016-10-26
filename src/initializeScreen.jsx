var React = require('react');

var TraitsType = require('./traitsType');
var TraitsSelector = require('./traitsSelector');

var InitializeScreen = React.createClass({
    componentDidMount: function(){
        console.log("InitializeScreen props: " + JSON.stringify(this.props));
        console.log("InitializeScreen state: " + JSON.stringify(this.state));
    },
    getInitialState: function(){
        return({
            randomTraits: null,
            traits: {
                sleep: {
                    cycle: null,
                    maintenanceMinimum: null,
                    recoveryMinimum: null,
                    sensitivity: null
                },

                sleepSupplementation: {
                    caffeine: {
                        sensitivity: null,
                        tolerance: null
                    }
                }
            }
        });
    },
    generateRandomTraits: function(){
        console.log("Generating random traits");
    },
    render: function() {
        return (
            <div className="initializeScreen">
                {this.state.randomTraits == null && <TraitsType onClickCallback={this.traitSelectionCallback} />}
                {!this.state.randomTraits && (this.state.traits.length < 1) && <TraitsSelector traits={this.state.traits} />}
            </div>
        );
    },

    traitSelectionCallback: function(e){
        var val = e.target.value;

        var random = (val === 'Random');

        if (random){
            this.generateRandomTraits();
        }

        this.setState({randomTraits: random});
    }
});

module.exports = InitializeScreen;