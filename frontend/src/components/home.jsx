import React, { Component } from 'react';
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"
import YouTube from 'react-youtube';
import { io } from "socket.io-client"; 
import './home.css'

const socket = io('http://localhost:4000');

export default class home extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            roomname:"",
            url:""
        };
      }
    componentDidMount(){
        socket.on('info',message =>{
            console.log(message)
        })
    }

      handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
      }
      onSubmit = () =>{
          //console.log(this.state.roomname, this.state.url)

      }

    render() {
            return (
                <div className="home-corps"> 
                    <div className="home-top">
                        <p className="home-titre">Youtube Party</p>
                    </div>
                    <div className="home-formulaire">
                        <input
                            className="home-roomname-inp"
                            name="roomname"
                            type="text"
                            placeholder="Enter the room name ..."
                            value={this.state.roomname}
                            onChange={this.handleInputChange}
                            required
                        />
                        <input
                            className="home-url-inp"
                            name="url"
                            type="url"
                            placeholder="Enter the video url ..."
                            value={this.state.url}
                            onChange={this.handleInputChange}
                            required
                        />
                            <Link to={'/app/'+this.state.roomname+'/'+this.state.url}>
                                <input
                                    className="home-submit-inp"
                                    type="submit"
                                    value="Create room"
                                    onClick={this.onSubmit}
                                />
                            </Link>
                    </div>
                </div>
            )
      }
}