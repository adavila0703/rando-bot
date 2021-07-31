import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import React, { useState, useEffect } from "react";
import Refresh from "../components/Refresh";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css";

const App = () => {
    const [robots, setRobots] = useState([]);
    const [searchField, setSearchField] = useState('');

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(users => setRobots(randoDrop(users)));
    }, []);

    const onSearchChange = (event) => {
        setSearchField(event.target.value);
    };

    const reloadPage = () => {
        window.location.reload();
    };

    const filterRobots = robots.filter((robot) => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    const randoDrop = (users) => {
        let percentage = 0.5;
        let randomNum = Math.random();
        users.forEach((element) => {
            element.dropRate = percentage;
            percentage -= 0.05;
        });
        return users.filter((element) => element.dropRate < randomNum);
    }

    return !robots.length ? (
        <h1>Loading...</h1>
    ) : (
        <div className="tc">
            <h1 className="f2">rando-bot</h1>
            <SearchBox searchChange={onSearchChange} />
            <Refresh refresh={reloadPage} />
            <Scroll>
                <ErrorBoundary>
                    <CardList robots={filterRobots} />
                </ErrorBoundary>
            </Scroll>
        </div>
    );
}

export default App;
