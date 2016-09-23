//mixin
var DisposingIntervalMixin = {
    componentWillMount: function(){
        this.interval = null;
    },

    setInterval: function() {
        this.interval = setInterval.apply(null, arguments);
    },

    componentWillUnmount: function() {
        clearInterval(this.interval);
    }
};
//Feed-style "story" holder, updates frequently to add "new" stories
var StoryPane = React.createClass({
    mixins: [DisposingIntervalMixin],

    componentDidMount: function() {
        this.refresh();
        this.setInterval(this.refresh, this.props.refreshTime);
    },

    checkServiceResponse: function(response){
        if (response.code === 200){
            if (response.payload != null){
                console.log("Service payload: " + JSON.stringify(response.payload));
                var tempState = this.state.stories.slice();
                tempState.push(response.payload);

                this.setState({stories: tempState});
            }
        }

        else{
            console.log("Non-200 response");
            console.log("Code: " + response.code);
            console.log("Message: " + response.msg);
        }
    },    
    
    getInitialState: function() {
        return {closed: [], stories: []};
    },
    
    refresh: function() {
        var currLen = this.state.stories.length;
        var maxLen = service.countStories();        
        
        if (currLen < maxLen){
            console.log("Missing " + (maxLen - currLen) + " stories from data service");
            var contained = this.state.stories.map(function(story){ return story.key;});
            console.log("Contained keys: " + JSON.stringify(contained));

            this.checkServiceResponse(service.getNewStory(contained));
        }
    },
    
    render: function() {
        console.log("Storypane props: " + JSON.stringify(this.props));
        return (
          <div className="storyPane nudge-down">
            <h1 className="nudge-down">Welcome to the Story Feed</h1>
            <h4 className="nudge-down">This page simulates dynamic data retrieval, storage, and rendering through ReactJS</h4>
            <h4 className="nudge-down">You may use the X to hide stories from view at any time</h4>
            <StoryList data={this.state.stories} refreshTime={this.props.refreshTime} />
            <SubmitBox handleSubmitCallback={this.submitStory} />
            <TimeStamp refreshTime="1000" />
          </div>  
        );
    },

    submitStory: function(story){
        service.addStory(story);
    }  
});

var StoryList = React.createClass({
    excludeStory: function(key){
        var tmp = this.state.excluded;

        if (tmp.indexOf(key) < 0){
            tmp.push(key);
            this.setState({excluded: tmp});
        }
    },

    filterExcluded: function(story){
        return this.state.excluded.indexOf(story.key) < 0;
    },

    getInitialState: function() {
        return {excluded: [], stories: []};
    },

    mapStory: function(story){
        return(
                <Story id={story.key} author={story.author} title={story.title} onCloseCallback={this.excludeStory} />
            );
    },
    
    render: function() {
        var stories = this.props.data.filter(this.filterExcluded).map(this.mapStory);
        return (
          <div className="nudge-down-2x row text-center">
            <div className="col-xs-12">
                {stories}
            </div>
          </div>  
        );
    }  
});

var Story = React.createClass({ 
    close: function(){
        this.props.onCloseCallback(this.props.id);
    },   
    render: function() {
        return (
          <div className="story shadow">
            <div className="col-xs-11">
                <h4 className="storyAuthor">
                Author: {this.props.author}
            </h4>
            </div>
            <div className="col-xs-1">
                <span onClick={this.close}>X</span>
            </div>
            <div className="col-xs-11">
                <h4 className="storyTitle">
                    Title: {this.props.title}
                </h4>
            </div>            
          </div>  
        );
    }  
});

var SubmitBox = React.createClass({
    createStory: function(author, title){
        var hash = author + title;

        return {
            author: author,
            title: title,
            hash: hash
        };
    },
    getInitialState: function() {
        return {author: '', title: ''};
    },

    handleAuthorChange: function(e){
        this.setState({author: e.target.value});
    },

    handleSubmit: function(e){
        e.preventDefault();
        var author = this.state.author.trim();
        var title = this.state.title.trim();

        if (!author || !title) return;

        this.props.handleSubmitCallback(this.createStory(author, title));

        this.setState({author: '', title: ''});
    },

    handleTitleChange: function(e){
        this.setState({title: e.target.value});
    },

    render: function(){
        return (
            <div className="row nudge-down">
                <div className="col-xs-12">
                    <h3>Use the form below to add new stories</h3>
                </div>
                <div className="col-xs-12">
                    <label>Author</label>
                    <input type="text" className="form-control" value={this.state.author} onChange={this.handleAuthorChange}/>
                </div>
                <div className="col-xs-12">
                    <label>Title</label>
                    <input type="text" className="form-control" value={this.state.title} onChange={this.handleTitleChange}/>
                </div>
                <div className="col-xs-2 nudge-down">
                    <button type="button" className="button" onClick={this.handleSubmit}>Submit</button> 
                </div>
            </div>            
        );
    }
});

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

var Menu = React.createClass({
    render: function() {
        return (
          <div className="menu">
            <MenuButton text="Home" href="https://thecrimsonking.net/" />
            <MenuButton text="Patreon" href="https://www.patreon.com/TheDecentTech" />
            <MenuButton text="Progressive Game" href="https://thecrimsonking.net/ProgressiveGame" />
            <MenuButton text="ReactJS Demo" href="https://thecrimsonking.net/React-ion" />
          </div>  
        );
    }  
});

var Banner = React.createClass({
    render: function() {
        return (
          <div className="col-xs-12 banner shadow">
            <div className="col-xs-2 text-right">
                <NameButton text="Miles Grimes" href="https://thecrimsonking.net/About" />
            </div>
            <div className="col-xs-8">
                <Menu />
            </div>
            <div className="col-xs-2">
                <MenuText text="Tiredness Simulator" />
            </div>
          </div>  
        );
    }  
});

var StatsBar = React.createClass({
    render: function() {
        <div className="col-xs-12 statsBar">
            <HealthBar health={this.props.health} />
            <EnergyBar energy={this.props.energy} />
            <MoneyBar money={this.props.money} />
        </div>
    }
});

var GameWindow = React.createClass({
    render: function() {
        return (
            <div className="gameWindow nudge-up shadow tall">
                {this.renderConditional()}
            </div>
        );
    },

    renderConditional: function(){
        if (this.props.screen === 2) return(<LoadScreen />);
        else if (this.props.screen === 3) return(<StatisticsScreen environment={this.props.environment} player={this.props.player} />);
        else return(<GameScreen environment={this.props.environment} player={this.props.player} />);
    }
});

var GameScreen = React.createClass({
    render: function(){
        return (
            <div className="gameScreen">
                <StatsBar energy={this.props.player.energy} health={this.props.player.health} money={this.props.player.money} />
            </div>
        )
    }
});

var GameMenuButton = React.createClass({
    render: function(){
        return (
            <div className="menuButton">
                <h4 className="text-center">{this.props.text}</h4>
            </div>
        )
    }
});

var GameMenu = React.createClass({
    render: function() {
        return (
            <div className="gameMenu shadow">
                <GameMenuButton text="New Game" onClickCallback={this.props.newGameCallback} />
                <GameMenuButton text="Load Game" onClickCallback={this.props.loadGameCallback} />
                <GameMenuButton text="Save Game" onClickCallback={this.props.saveGameCallback} />
                <GameMenuButton text="Statistics" onClickCallback={this.props.statisticsCallback} />
            </div>
        );
    }
});

var Game = React.createClass({
    componentDidMount: function(){
        this.interval = setInterval(this.saveGame, 20000);
    },

    componentWillUnmount: function(){
        clearInterval(this.interval);
    },

    decodeString: function(value){
        var decoded = atob(value);
        return JSON.parse(decoded);
    },

    deleteGame: function() {
        localStorage.clear();
    },

    getInitialState: function(){
        return this.loadLocal();
    },

    handleLoadGameSubmit: function(value){
        this.tryLoad(value, true);
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
        this.deleteGame();

        return({
            environment: {
                generated: false
            },

            lastSelected: null,

            player: {
                energy: 20,
                generated: false,
                health: 20,
                money: 5000
            },

            selected: 1
        })
    },

    propagateChange: function(store, value){
        if (store.toLowerCase() === 'environment') this.setState({environment: value});
        else this.setState({environment: value});
    },

    render: function() {
        return (
            <div className="game container nudge-down">
                <GameMenu loadGameCallback={this.loadScreen} newGameCallback={this.newGame} saveGameCallback={this.saveGame} statisticsCallback={this.statistics} />
                <GameWindow environment={this.state.environment} player={this.state.player} lastScreen={this.state.lastSelected} screen={this.state.selected} />
            </div>
        );
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
        this.setSelected(3);
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

var Container = React.createClass({
    render: function() {
        return (
            <div className="main">
                <Banner />
                <div className="col-xs-12 nudge-down">
                    <Game />
                </div>
            </div>
        );
    }  
});

//TODO: Banner, StoryList, Story, Timestamp components
//CSS classes

ReactDOM.render(<Container />, document.getElementsByTagName('body')[0]);