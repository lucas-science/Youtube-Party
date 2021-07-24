import React, { Component } from 'react';
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"
import YouTube from 'react-youtube';
import { io } from "socket.io-client"; 
import ShareButton from './components/shareButton'

const socket = io('http://localhost:4000');

export default class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curtime: 0,
            change:false,
            _event:{},
            roomid:"",
            vurl:"",
            author:false,
            task:{}
        };
      }
    componentDidMount(){
        socket.emit('joinRoom', this.props.match.params.roomid, this.props.match.params.vurl)
        
        socket.on('info', message => {
            console.log(message)
        })
        

        socket.on('temps', data => {
            this.setState({curtime:data})
            //console.log(this.state.curtime)
        })
        socket.on('videoT', data => {
            //console.log(data)
            this.setState({
                task:{
                    time:data.time,
                    play:data.event
                }
            })
            console.log("state 'task' : ", this.state.task)
            if(!this.state.author){
                this.state._event.target.seekTo(data.time)
                if(data.event === 2){
                    this.state._event.target.pauseVideo()
                }
                if(data.event == 1){
                    this.state._event.target.playVideo()
                }
            }
        })
        
        socket.on('authorORnot',data => {
            if(data){
                this.setState({author:true})
                console.log(this.state.author)
            } else{
                this.setState({author:false})
                console.log(this.state.author)
            }
        })
    }

    _onStateChange(event){
        if(this.state.author){
            if (event.data === 2) {
                console.log("video stoped")
                console.log(event.data)
                let time = Math.round(event.target.getCurrentTime())
                socket.emit('time',{time:time, event:event.data})
            }
            if (event.data === 1) {
                console.log("video playing")
                let time =  Math.round(event.target.getCurrentTime())
                socket.emit('time',{time:time, event:event.data})
                this.setState({curtime:time})
                this.setState({change:true})
                setInterval(() => {
                    let time =  Math.round(event.target.getCurrentTime())
                    //socket.emit('time',time)
                    socket.emit('tempsReel',time)
                    this.setState({curtime:time})
                    this.setState({change:true})
                }, 1000);
            }
        } 
        if(!this.state.author){
            if (event.data == 2 && this.state.task.play == 1) {
                console.log("la")
                this.state._event.target.playVideo()
                this.state._event.target.seekTo(this.state.curtime)
            }
            if (event.data == 1 && this.state.task.play == 2) {
                console.log("la 2")
                this.state._event.target.seekTo(this.state.task.time)
                this.state._event.target.pauseVideo()
            }
        }
      }

      _onReady(event) {
        this.setState({_event:event})
        this.state._event.target.playVideo()
        if(this.state.curtime != 0){
            this.state._event.target.seekTo(this.state.curtime)
        }
      }

    render() {
        const opts = {
            height: '360',
            width: '640',
            videoId: 'EnHUmL22G08'
        };
        const author = this.state.author
        if(this.state.change){
            this.setState({change:false})
            return (
                <div>
                    <YouTube 
                        videoId={this.props.match.params.vurl} 
                        opts={opts} 
                        onReady={this._onReady.bind(this)}
                        onStateChange={this._onStateChange.bind(this)}
                    /> 
                    <p>{this.state.curtime}</p>   
                    {author
                        ? <ShareButton author="true" 
                                url={"http://localhost:3000/app/"+this.props.match.params.roomid+"/"+this.props.match.params.vurl}
                            />
                        : <ShareButton author="false"
                                url={"http://localhost:3000/app/"+this.props.match.params.roomid+"/"+this.props.match.params.vurl}
                            />

                    }            
                </div>
            )
        } else{
            return (
                <div>
                    <YouTube 
                        videoId={this.props.match.params.vurl} 
                        opts={opts} 
                        onReady={this._onReady.bind(this)}
                        onStateChange={this._onStateChange.bind(this)}
                    /> 
                    <p>{this.state.curtime}</p>
                    {author
                        ? <ShareButton author="true" 
                                url={"http://localhost:3000/app/"+this.props.match.params.roomid+"/"+this.props.match.params.vurl}
                            />
                        : <ShareButton author="false"
                                url={"http://localhost:3000/app/"+this.props.match.params.roomid+"/"+this.props.match.params.vurl}
                            />

                    }   
                </div>
            )
        }
      }

}