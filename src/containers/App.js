import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import React, { Component } from "react";
import Refresh from "../components/Refresh";
import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: "",
        };
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((users) => this.setState({ robots: this.randoDrop(users) }));
    }

    randoDrop(users) {
        let percentage = 0.5;
        let randomNum = Math.random();
        users.forEach((element) => {
            element.dropRate = percentage;
            percentage -= 0.05;
        });
        return users.filter((element) => element.dropRate < randomNum);
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    };

    reloadState = () => {
        window.location.reload();
    };

    render() {
        const { robots, searchfield } = this.state;
        const filterRobots = robots.filter((robot) => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        });
        return !robots.length ? (
            <h1>Loading...</h1>
        ) : (
            <div className="tc">
                <h1 className="f2">rando-bot</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Refresh refresh={this.reloadState} />
                <Scroll>
                    <CardList robots={filterRobots} />
                </Scroll>
            </div>
        );
    }
}

export default App;
