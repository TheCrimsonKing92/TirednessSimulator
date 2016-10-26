var React = require('react');

var GameMenu = require('./gameMenu');
var GameWindow = require('./gameWindow');

var Game = React.createClass({
    componentDidMount: function(){
        this.interval = setInterval(this.saveGame, 20000);
        console.log("Game props: " + JSON.stringify(this.props));
        console.log("Game state: " + JSON.stringify(this.state));
    },

    componentWillUnmount: function(){
        clearInterval(this.interval);
    },

    decodeString: function(value){
        var decoded = atob(value);
        return JSON.parse(decoded);
    },

    deleteGame: function() {
        console.log("Deleting game");
        localStorage.clear();
    },

    getInitialState: function(){
        return this.loadLocal();
    },

    handleLoadGameSubmit: function(value){
        this.tryLoad(value, true);
    },

    initializeGame: function(ob){
        this.setState({environment: ob.environment, player: ob.player});
        this.setSelected(1);
    },

    initializeScreen: function(){
        this.setSelected(3);
    },

    loadGame: function(ob){
        this.setState({
            environment: ob.environment,
            player: ob.player,
            selected: 1
        });
    },

    loadLocal: function(){
        var storage = localStorage.getItem('TirednessSimulator');
        
        if (storage == null || storage == undefined) return this.newGame();
        else return this.decodeString(storage);   
    },

    loadScreen: function(){
        this.setSelected(2);
    },

    newGame: function(save){
        return({
            environment: {
                generated: false
            },

            lastSelected: null,

            player: {
                energy: {
                    current: 20,
                    max: 100
                },
                generated: false,
                health: {
                    current: 20,
                    max: 100
                },
                money: {
                    current: 5000,
                    max: 100000
                }
            },

            selected: 3
        })
    },

    propagateChange: function(store, value){
        if (store.toLowerCase() === 'environment') this.setState({environment: value});
        else this.setState({environment: value});
    },

    render: function() {
        return (
            <div className="game container nudge-down">
                <GameMenu loadGameCallback={this.loadScreen} 
                          newGameCallback={this.resetGame} 
                          saveGameCallback={this.saveGame} 
                          statisticsCallback={this.statistics} />
                <GameWindow environment={this.state.environment} 
                            handleLoadCallback={this.handleLoadGameSubmit} 
                            initializeGameCallback={this.initializeGame} 
                            player={this.state.player} 
                            lastScreen={this.state.lastSelected} 
                            screen={this.state.selected} />
            </div>
        );
    },

    resetGame: function(){
        console.log("Reset game called");
        this.deleteGame();

        console.log("Setting state to new game");
        this.setState(this.newGame());
    },

    saveGame: function(){
        var current = JSON.stringify(this.state);
        var encoded = btoa(current);
        localStorage.setItem('TirednessSimulator', encoded);
    },

    setSaveInterval: function(val){
        clearInterval(this.interval);
        this.interval = setInterval(val * 1000);
    },

    setSelected: function(val){
        this.setState({lastSelected: this.state.selected, selected: val});
    },

    statistics: function() {
        this.setSelected(4);
    },

    tryLoad: function(value, save){
        var ob = this.decodeString(value);

        if (this.validateState(ob)) return this.loadGame(ob, true);
        else return this.newGame(true);
    },

    validateState: function(ob){
        return ob.player.generated && ob.environment.generated;
    }
});

module.exports = Game;