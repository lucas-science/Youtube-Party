import React, { Component } from 'react';
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"
import phonePhoto from '../../img/phone-photo.png'

export default class homePhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    render() { 
            return (
              <div className="phone-body">
                  <div className="phone-text-box">
                    <p>This aplication is only available on a computer or device with a higher resolution. Thank you for your visit!</p>
                  </div>
                  <div className="phone-photo">
                    <img className="phone-photo-photo" src={phonePhoto} />
                  </div>  
              </div>
            )
      }
}