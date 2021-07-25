import React, { Component } from 'react';
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"
import  { Redirect } from 'react-router-dom'
import YouTube from 'react-youtube';
import { io } from "socket.io-client"; 
import './home.css'

const socket = io('http://localhost:4000');

export default class home extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            roomname:"",
            url:"",
            error:false,
            error_contexte:""
        };
      }
    componentDidMount(){
        socket.on('info',message =>{
            console.log(message)
        })
    }
    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }
      handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
      }
      onSubmit = async () =>{
          //console.log(this.state.roomname, this.state.url)
        try{
            let url = new URL(this.state.url);
            let c = url.searchParams.get("v");
            if(c === null){
                this.setState({error:true})
                this.setState({error_contexte:"Le lien est invalide"})
                await this.sleep(1000)
                this.setState({error:false})
                this.setState({error_contexte:""})
            } else{
                this.props.history.push('/app/'+this.state.roomname+'/'+c)
            }
        } catch{
            this.setState({error:true})
            this.setState({error_contexte:"Le lien est invalide"})
            await this.sleep(1000)
            this.setState({error:false})
            this.setState({error_contexte:""})
        }

      }

    render() {
        let error = this.state.error ? "home-alert" : "home-alert-none"
            return (
                <div className="home-corps"> 
                    <div className={error}>
                        <div className="home-alert-box">
                            <p>{this.state.error_contexte}</p>
                        </div>
                    </div>
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
                        
                                <input
                                    className="home-submit-inp"
                                    type="submit"
                                    value="Create room"
                                    onClick={this.onSubmit}
                                />
                    </div>
                </div>
            )
      }
}