import React, { Component } from 'react';
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"
import app from './components/app';
import home from './components/home'

class App extends Component {
    // différente route renvoyant un composant react
    render() {
        return ( <
            BrowserRouter >
            <
            div >
            <
            Switch >
            <
            Route path = "/"
            exact component = { home }
            /> <
            Route path = "/app/:roomid/:vurl"
            exact component = { app }
            /> <
            /Switch> <
            /div> <
            /BrowserRouter>
        );
    }
}

export default App;