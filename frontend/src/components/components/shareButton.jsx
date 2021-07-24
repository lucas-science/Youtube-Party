import React, { Component } from 'react';
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"


export default class shareButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }
    
      onSubmit = () =>{
        var copyText = document.getElementById("myInput");
        copyText.select();
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy");
        alert("Copied the text: " + copyText.value);
      }
    render() {
        const author = this.props.author
            return (
                <div>
                    <input 
                        type="text"
                        value={this.props.url}
                        id="myInput"
                     />
                     <button onClick={this.onSubmit}>Share link !</button>
                     <p>{author == "true"
                        ? <p>tu est l'auteur</p>
                        : <p>tu es un membre</p>
                     }</p>
                </div>
            )
      }
}