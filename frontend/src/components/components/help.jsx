import React, { Component } from 'react';
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"
import './help.css'

export default class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
            change:false
        };
      }
      sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }
      onSubmit = () => {
          console.log("re")
          if(this.state.change){
            this.setState({change:false})
          } else{
            this.setState({change:true})
          }
      }
    render() { 
        let texte = this.state.change ? "app-help-contentBOX" : "app-help-contentBOX-false"
            return (
                <div className="app-help">
                    <div className="app-help-box" onClick={this.onSubmit}>
                        <svg className="app-help-svg" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 15.7617C10.5393 15.7617 10.9766 15.3245 10.9766 14.7852C10.9766 14.2458 10.5393 13.8086 10 13.8086C9.46066 13.8086 9.02344 14.2458 9.02344 14.7852C9.02344 15.3245 9.46066 15.7617 10 15.7617Z" fill="white" fill-opacity="0.78"/>
                            <path d="M10 0C4.47328 0 0 4.47254 0 10C0 15.5267 4.47254 20 10 20C15.5267 20 20 15.5275 20 10C20 4.47328 15.5275 0 10 0ZM10 18.4375C5.33684 18.4375 1.5625 14.6638 1.5625 10C1.5625 5.33684 5.33621 1.5625 10 1.5625C14.6632 1.5625 18.4375 5.33621 18.4375 10C18.4375 14.6632 14.6638 18.4375 10 18.4375Z" fill="white" fill-opacity="0.78"/>
                            <path d="M10 5.01953C8.27688 5.01953 6.875 6.42141 6.875 8.14453C6.875 8.57602 7.22477 8.92578 7.65625 8.92578C8.08773 8.92578 8.4375 8.57602 8.4375 8.14453C8.4375 7.28297 9.13844 6.58203 10 6.58203C10.8616 6.58203 11.5625 7.28297 11.5625 8.14453C11.5625 9.00609 10.8616 9.70703 10 9.70703C9.56852 9.70703 9.21875 10.0568 9.21875 10.4883V12.4414C9.21875 12.8729 9.56852 13.2227 10 13.2227C10.4315 13.2227 10.7812 12.8729 10.7812 12.4414V11.1707C12.1276 10.8229 13.125 9.59801 13.125 8.14453C13.125 6.42141 11.7231 5.01953 10 5.01953Z" fill="white" fill-opacity="0.78"/>
                        </svg>
                    </div>
                    <div className={texte}>
                        <p>If you are not in real time with your friend over the video, tell him that he can pause the video and then restart it, so that you can be in real time together 😎</p>
                    </div>
                </div>
            )
      }
}