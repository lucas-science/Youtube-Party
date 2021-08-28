import React, { Component } from 'react';
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"
import './about.css'
import './responsive-about.css'
import FormPhoto from '../img/form-photo.png'
import PseudoPhoto from '../img/choosePseudo.png'
import VideoPhoto from '../img/VideoExemple.png'

export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorChange:false
        };
      }
    
      componentDidMount(){

          let observer = new IntersectionObserver((entries)=> {
            entries.forEach((entry)=>{
                if(entry.isIntersecting){
                    this.setState({colorChange:true})
                } else{
                    this.setState({colorChange:false})
                }
            })
          },{
              threshold:0.5
          })
          let target = document.querySelector('.about-black')
          observer.observe(target)

      }
    render() { 
        let colorChange = this.state.colorChange ? "titre-white" : "titre-black"
        let colorChange1 = this.state.colorChange ? "titre-white1" : "titre-black1"
            return (
                <div className="about-all"> 
                    <div className="about-top">
                        <p className="about-titre" className={colorChange1}>Youtube Party</p>
                        <Link to="/" className="test-about">
                            <p className="about-menu-titre" className={colorChange}>Home</p>
                            <div className="about-titre-box"></div>
                        </Link>
                    </div>
                    <section className="about-page1">
                        <div className="about1-part-gauche">
                            <div className="about1-header">
                                <p className="about1-titre">But How use Youtube Party ?</p>
                                <div className="about1-box"></div>
                            </div>
                            <div className="about1-items">
                                <div className="about-item1">
                                    <p className="item-text1">01. Insert your room name</p>
                                </div>
                                <div className="about-item2">
                                    <p className="item-text2">02. Insert the video url</p>
                                </div>
                                <div className="about-item3">
                                    <p className="item-text3">03. Create room</p>
                                </div>
                            </div>
                        </div>
                        <div className="about1-part-droite">
                            <img className="about-FormPhoto" src={FormPhoto} />
                        </div>
                    </section>
                    <section className="about-page2">
                        <div className="about2-part-gauche">
                            <img className="about2-PseudoPhoto" src={PseudoPhoto} />
                        </div>
                        <div className="about2-part-droite">
                            <div className="about2-item4">
                                <p className="item-text4">04. Give your pseudo to join the room</p>
                            </div>
                        </div>
                    </section>
                    <div className="about-black">
                        <section className="about-page3">
                            <div className="about3-part-gauche">
                                <div className="about3-titre">
                                    <p className="about3-titre-titre">Watch and React together</p>
                                    <div className="about3-titre-boxs">
                                        <div className="about3-titre-box2"></div>
                                        <div className="about3-titre-box1"></div>
                                    </div>
                                </div>
                                <div className="about3-texte">
                                    <p>With youtube Party you can watch video in simultaneously with your friends. But with Youtube Party you can watch together but react to the video together ! wite the tchat in the right of the video.</p>
                                </div>
                            </div>
                            <div className="about3-part-droite">
                                <img className="about3-video-photo" src={VideoPhoto} />
                            </div>
                        </section>
                        <section className="about-page4">
                            <Link to="/" className="about4-boutton">
                                <p className="about4-boutton-texte">Let's Begin with <b>Youtube Party</b></p>
                            </Link>
                        </section>
                    </div>
                </div>
            )
      }
}