import React, { Component } from 'react';
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"
import YouTube from 'react-youtube';
import { io } from "socket.io-client"; 

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
                <div>
                    <p>Enter the room name</p>
                    <input
                        name="roomname"
                        type="text"
                        placeholder="the room name ..."
                        value={this.state.roomname}
                        onChange={this.handleInputChange}
                        required
                    />
                    <input
                        name="url"
                        type="url"
                        placeholder="the video url"
                        value={this.state.url}
                        onChange={this.handleInputChange}
                        required
                    />
                        <Link to={'/app/'+this.state.roomname+'/'+this.state.url}>
                            <input
                                type="submit"
                                value="create room"
                                onClick={this.onSubmit}
                            />
                        </Link>
                </div>
            )
      }
}