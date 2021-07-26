import React, { Component } from 'react';
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"
import YouTube from 'react-youtube';
import { io } from "socket.io-client"; 
import ShareButton from './components/shareButton'
import Help  from './components/help';
import './app.css'

const socket = io('http://localhost:4000');

export default class app extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            curtime: 0,
            change:false,
            _event:{},
            roomid:"",
            vurl:"",
            author:false,
            task:{},
            mess:"",
            messages:[],
            membre_nbr:0,
            loged:false,
            pseudo:"",
            alert:false,
            alert_content:"",
            new_message:false
        };
      }

      handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
      }

      sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }
      componentDidMount () {
        this.scrollToBottom()
      }
      componentDidUpdate () {
        this.scrollToBottom()
      }
      scrollToBottom = () => {
        this.myRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    componentDidMount(){   
        socket.on('nbrMembre', data => {
            this.setState({membre_nbr:data})
            console.log("vous etes dans le groupe : ",this.state.membre_nbr)
        })
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

        socket.on('message',mess => {
            let {messages} = this.state
            messages.push(mess)
            console.log(this.state.messages)
            this.setState({new_message:true})
        })

        document.addEventListener('keydown', (event) => {
            if(event.key == 'Enter' && this.state.mess != ''){
                console.log(this.state.mess)
                socket.emit('sendMessage', {username : this.state.pseudo, message:this.state.mess},this.props.match.params.roomid)
                
                let {messages} = this.state
                messages.push({username : this.state.pseudo, message:this.state.mess})
                console.log(this.state.messages)
      
                this.setState({mess:""})
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
                let time =  event.target.getCurrentTime()
                socket.emit('time',{time:time, event:event.data})
                this.setState({curtime:time})
                this.setState({change:true})
                setInterval(() => {
                    let time =  event.target.getCurrentTime()
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

      login = async () => {
          if(this.state.pseudo === ''){
              console.log("la")
              this.setState({alert_content:"Vous devez rentrer un nom d'utilisateur valide."})
              this.setState({alert:true})
              await this.sleep(2000)
              this.setState({alert:false})
              this.setState({alert_content:""})
          } else{
            console.log(this.state.pseudo)
            socket.emit('joinRoom', this.props.match.params.roomid, this.props.match.params.vurl, this.state.pseudo)
            this.setState({loged:true})
          }

      }

      onSubmit = () => {
          console.log(this.state.mess)
          socket.emit('sendMessage', {username : this.state.pseudo, message:this.state.mess},this.props.match.params.roomid)
          
          let {messages} = this.state
          messages.push({username : this.state.pseudo, message:this.state.mess})
          console.log(this.state.messages)

          this.setState({mess:""})
      }
    render() {
        const opts = {
            height: '360',
            width: '640',
            videoId: 'EnHUmL22G08'
        };
        const {messages} = this.state
        const author = this.state.author

        let loged = this.state.loged ? "login-nom_none" : "login-nom_block"
        let blur = this.state.loged ? "app-blur-false" : "app-blur-true"
        let blurgauche = this.state.loged ? "app-part-gauche" : "app-part-gauche_blur"
        let alerte = this.state.alert ? "app-alert-true" : "app-alert-false"

        if(this.state.new_message){
            return (
                <div className="app-corps">
                    <div className={loged}>
                        <input
                            className="app-pseudo-inp"
                            name="pseudo"
                            type="text"
                            placeholder="Choose a pseudo"
                            value={this.state.pseudo}
                            onChange={this.handleInputChange}
                            required
                        />
                        <input
                            className="app-log_submit-inp"
                            type="submit"
                            value="Join"
                            onClick={this.login}
                        />
                    </div>
                    <div className={alerte}>
                        <div className="app-alert-content">
                            <p>{this.state.alert_content}</p>
                        </div>
                    </div>
                    <Help/>
                    <div className="app-part-gauche" className={blurgauche}>
                        {author
                            ? <div className="app-chefTorF">
                                <p className="app-chefTorF-text">Tu es le chef</p>
                            </div>
                            : <div className="app-chefTorF">
                                <p className="app-chefTorF-text">Tu es membre</p>
                            </div>
                        }  
                        <div className="video-container">
                            <YouTube 
                                className="video"
                                videoId={this.props.match.params.vurl} 
                                opts={opts} 
                                onReady={this._onReady.bind(this)}
                                onStateChange={this._onStateChange.bind(this)}
                            />  
                        </div>
                    </div>
                    <div className="app-part-droite" className={blur}>
                        <div className="app-chatroom">
                            <div className="app-membre-nbr">
                                <p className="app-membre-nbr-txt">{this.state.membre_nbr} membres</p>
                                <svg className="app-nbrmembre-logo" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.05185 3.35484C9.74541 3.78969 10.2317 4.52556 10.3203 5.37973C10.6031 5.51189 10.9171 5.5879 11.2499 5.5879C12.465 5.5879 13.4498 4.60306 13.4498 3.38816C13.4498 2.17307 12.465 1.18823 11.2499 1.18823C10.0464 1.18861 9.0702 2.15585 9.05185 3.35484ZM7.61063 7.85914C8.82572 7.85914 9.81056 6.87412 9.81056 5.65922C9.81056 4.44432 8.82553 3.45948 7.61063 3.45948C6.39573 3.45948 5.41033 4.4445 5.41033 5.6594C5.41033 6.8743 6.39573 7.85914 7.61063 7.85914ZM8.5438 8.00909H6.67709C5.12392 8.00909 3.86035 9.27284 3.86035 10.826V13.1089L3.86615 13.1446L4.0234 13.1938C5.50562 13.657 6.79334 13.8114 7.85324 13.8114C9.92344 13.8114 11.1234 13.2212 11.1973 13.1836L11.3443 13.1092H11.36V10.826C11.3605 9.27284 10.097 8.00909 8.5438 8.00909ZM12.1835 5.73803H10.3311C10.3111 6.47913 9.99476 7.14649 9.49438 7.62646C10.875 8.03698 11.8851 9.31721 11.8851 10.8294V11.5329C13.714 11.4658 14.7679 10.9475 14.8373 10.9127L14.9843 10.8382H15V8.55457C15 7.0016 13.7364 5.73803 12.1835 5.73803ZM3.75047 5.58827C4.18083 5.58827 4.58124 5.46266 4.92044 5.2487C5.02827 4.5454 5.40528 3.93084 5.94384 3.51227C5.94609 3.47109 5.95002 3.43028 5.95002 3.38872C5.95002 2.17363 4.96499 1.18879 3.75047 1.18879C2.53519 1.18879 1.55054 2.17363 1.55054 3.38872C1.55054 4.60325 2.53519 5.58827 3.75047 5.58827ZM5.72613 7.62646C5.22819 7.14892 4.91295 6.48512 4.88993 5.74851C4.82123 5.74345 4.75328 5.73803 4.68326 5.73803H2.81674C1.26357 5.73803 0 7.0016 0 8.55457V10.8378L0.00580307 10.873L0.163048 10.9226C1.35212 11.2938 2.41333 11.4649 3.33508 11.5188V10.8294C3.33545 9.31721 4.34519 8.03735 5.72613 7.62646Z" fill="white" fill-opacity="0.2"/>
                                </svg>
                            </div>
                            <div id="chat" className="app-chat">
                                {messages.map(item => (
                                    <div className="app-items">
                                        <p className="app-username">{item.username}</p>
                                        <p className="app-message">{item.message}</p>
                                    </div>
                                ))}
                                <div ref={this.myRef} />
                            </div>
                            <div className="app-message-inps">
                                <input
                                    className="app-mess-inp"
                                    name="mess"
                                    type="text"
                                    placeholder="Envoyer un message ..."
                                    value={this.state.mess}
                                    onChange={this.handleInputChange}
                                    required
                                />
                                <input
                                    className="app-submit-inp"
                                    type="submit"
                                    value="Send"
                                    onClick={this.onSubmit}
                                />
                            </div>
                        </div>
                        <ShareButton
                            url={"http://localhost:3000/app/"+this.props.match.params.roomid+"/"+this.props.match.params.vurl}
                        />
                    </div>
                </div>
            )
        } else{
            return(
                    <div className="app-corps">
                        <div className={loged}>
                            <input
                                className="app-pseudo-inp"
                                name="pseudo"
                                type="text"
                                placeholder="Choose a pseudo"
                                value={this.state.pseudo}
                                onChange={this.handleInputChange}
                                required
                            />
                            <input
                                className="app-log_submit-inp"
                                type="submit"
                                value="Join"
                                onClick={this.login}
                            />
                        </div>
                        <div className={alerte}>
                            <div className="app-alert-content">
                                <p>{this.state.alert_content}</p>
                            </div>
                        </div>
                        <Help/>
                        <div className="app-part-gauche" className={blurgauche}>
                            {author
                                ? <div className="app-chefTorF">
                                    <p className="app-chefTorF-text">Tu es le chef</p>
                                </div>
                                : <div className="app-chefTorF">
                                    <p className="app-chefTorF-text">Tu es membre</p>
                                </div>
                            }  
                            <div className="video-container">
                                <YouTube 
                                    className="video"
                                    videoId={this.props.match.params.vurl} 
                                    opts={opts} 
                                    onReady={this._onReady.bind(this)}
                                    onStateChange={this._onStateChange.bind(this)}
                                />  
                            </div>
                        </div>
                        <div className="app-part-droite" className={blur}>
                            <div className="app-chatroom">
                                <div className="app-membre-nbr">
                                    <p className="app-membre-nbr-txt">{this.state.membre_nbr} membres</p>
                                    <svg className="app-nbrmembre-logo" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.05185 3.35484C9.74541 3.78969 10.2317 4.52556 10.3203 5.37973C10.6031 5.51189 10.9171 5.5879 11.2499 5.5879C12.465 5.5879 13.4498 4.60306 13.4498 3.38816C13.4498 2.17307 12.465 1.18823 11.2499 1.18823C10.0464 1.18861 9.0702 2.15585 9.05185 3.35484ZM7.61063 7.85914C8.82572 7.85914 9.81056 6.87412 9.81056 5.65922C9.81056 4.44432 8.82553 3.45948 7.61063 3.45948C6.39573 3.45948 5.41033 4.4445 5.41033 5.6594C5.41033 6.8743 6.39573 7.85914 7.61063 7.85914ZM8.5438 8.00909H6.67709C5.12392 8.00909 3.86035 9.27284 3.86035 10.826V13.1089L3.86615 13.1446L4.0234 13.1938C5.50562 13.657 6.79334 13.8114 7.85324 13.8114C9.92344 13.8114 11.1234 13.2212 11.1973 13.1836L11.3443 13.1092H11.36V10.826C11.3605 9.27284 10.097 8.00909 8.5438 8.00909ZM12.1835 5.73803H10.3311C10.3111 6.47913 9.99476 7.14649 9.49438 7.62646C10.875 8.03698 11.8851 9.31721 11.8851 10.8294V11.5329C13.714 11.4658 14.7679 10.9475 14.8373 10.9127L14.9843 10.8382H15V8.55457C15 7.0016 13.7364 5.73803 12.1835 5.73803ZM3.75047 5.58827C4.18083 5.58827 4.58124 5.46266 4.92044 5.2487C5.02827 4.5454 5.40528 3.93084 5.94384 3.51227C5.94609 3.47109 5.95002 3.43028 5.95002 3.38872C5.95002 2.17363 4.96499 1.18879 3.75047 1.18879C2.53519 1.18879 1.55054 2.17363 1.55054 3.38872C1.55054 4.60325 2.53519 5.58827 3.75047 5.58827ZM5.72613 7.62646C5.22819 7.14892 4.91295 6.48512 4.88993 5.74851C4.82123 5.74345 4.75328 5.73803 4.68326 5.73803H2.81674C1.26357 5.73803 0 7.0016 0 8.55457V10.8378L0.00580307 10.873L0.163048 10.9226C1.35212 11.2938 2.41333 11.4649 3.33508 11.5188V10.8294C3.33545 9.31721 4.34519 8.03735 5.72613 7.62646Z" fill="white" fill-opacity="0.2"/>
                                    </svg>
                                </div>
                                <div id="chat" className="app-chat">
                                    {messages.map(item => (
                                        <div className="app-items">
                                            <p className="app-username">{item.username}</p>
                                            <p className="app-message">{item.message}</p>
                                        </div>
                                    ))}
                                    <div ref={this.myRef} />
                                </div>
                                <div className="app-message-inps">
                                    <input
                                        className="app-mess-inp"
                                        name="mess"
                                        type="text"
                                        placeholder="Envoyer un message ..."
                                        value={this.state.mess}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                    <input
                                        className="app-submit-inp"
                                        type="submit"
                                        value="Send"
                                        onClick={this.onSubmit}
                                    />
                                </div>
                            </div>
                            <ShareButton
                                url={"http://localhost:3000/app/"+this.props.match.params.roomid+"/"+this.props.match.params.vurl}
                            />
                        </div>
                    </div>
                )
        }
      }

}