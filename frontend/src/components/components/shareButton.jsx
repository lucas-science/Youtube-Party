import React, { Component } from 'react';
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"
import './shareButton.css'
import uploadlogo from '../../img/upload-logo.svg'

export default class shareButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
          display:false,
          animend:false
        };
      }
      sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }

      onSubmit =async () => {
        this.setState({display:true})
        console.log('la')
        await this.sleep(2500)
        console.log('la2')
        this.setState({animend:true})
        await this.sleep(500)
        this.setState({animend:false})
        this.setState({display:false})
      }
      copy = () => {
        var copyText = document.getElementById("myInput");
        copyText.select();
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy");
      }
    render() { 
      let copylink = this.state.display ? "copylink_block" : "copylink_none";
      let buttonlick = this.state.display ? "copylink-button_none" : "copylink-button_block";
      let svg = this.state.display ? "svg_none " : "svg_block";
      let copytext = this.state.animend ? "copytext_close" : "copytext_open"
            return (
                <div className="sharebutton-corps">
                  <div className={copylink}>
                    <input 
                          className={copytext}
                          type="text"
                          value={this.props.url}
                          id="myInput"
                      />
                      <button onClick={this.copy} className="copytextbutton">Copy link !</button>
                  </div>

                    <div className={buttonlick} onClick={this.onSubmit}>
                      <svg width="100%" height="100%" className={svg} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.76707 7.34244L11.3828 4.7267V18.5639C11.3828 18.9 11.5163 19.2223 11.754 19.4599C11.9916 19.6976 12.314 19.8311 12.6501 19.8311C12.9861 19.8311 13.3085 19.6976 13.5461 19.4599C13.7838 19.2223 13.9173 18.9 13.9173 18.5639V4.7267L16.533 7.34244C16.6506 7.46064 16.7903 7.55448 16.9442 7.61859C17.0981 7.6827 17.2631 7.71582 17.4298 7.71605C17.5965 7.71627 17.7616 7.6836 17.9157 7.61991C18.0698 7.55622 18.2097 7.46276 18.3276 7.34488C18.4455 7.227 18.539 7.08702 18.6027 6.93296C18.6663 6.7789 18.699 6.61379 18.6988 6.44708C18.6986 6.28038 18.6654 6.11535 18.6013 5.96147C18.5372 5.80758 18.4434 5.66786 18.3252 5.5503L13.5462 0.771214C13.4285 0.653533 13.2888 0.560183 13.135 0.496494C12.9813 0.432805 12.8165 0.400024 12.6501 0.400024C12.4836 0.400024 12.3188 0.432805 12.1651 0.496494C12.0113 0.560183 11.8716 0.653533 11.754 0.771214L6.97493 5.5503C6.85673 5.66786 6.76288 5.80758 6.69877 5.96147C6.63466 6.11535 6.60155 6.28038 6.60132 6.44708C6.60109 6.61379 6.63376 6.7789 6.69745 6.93296C6.76114 7.08702 6.85461 7.227 6.97248 7.34488C7.09036 7.46276 7.23034 7.55622 7.3844 7.61991C7.53846 7.6836 7.70358 7.71627 7.87028 7.71605C8.03699 7.71582 8.20201 7.6827 8.3559 7.61859C8.50979 7.55448 8.64951 7.46064 8.76707 7.34244Z" fill="white" fill-opacity="0.6"/>
                      <path d="M23.6328 11.3828C23.2967 11.3828 22.9744 11.5163 22.7367 11.754C22.4991 11.9916 22.3655 12.314 22.3655 12.6501V20C22.4008 21.8622 21.9877 22.5048 20 22.5H14.5H5C3.47946 22.4846 3.02342 21.5681 3 20C2.97442 16.7391 2.93451 12.6501 2.93451 12.6501C2.93451 12.314 2.80099 11.9916 2.56334 11.754C2.32569 11.5163 2.00336 11.3828 1.66727 11.3828C1.33117 11.3828 1.00884 11.5163 0.771191 11.754C0.533537 11.9916 0.400024 12.314 0.400024 12.6501V22.788C0.400024 23.3481 0.622545 23.8854 1.01864 24.2814C1.41472 24.6775 1.95194 24.9001 2.51209 24.9001H22.788C23.3481 24.9001 23.8853 24.6775 24.2814 24.2814C24.6775 23.8854 24.9 23.3481 24.9 22.788V12.6501C24.9 12.314 24.7665 11.9916 24.5289 11.754C24.2912 11.5163 23.9689 11.3828 23.6328 11.3828Z" fill="white" fill-opacity="0.6"/>
                      </svg>
                    </div>
                </div>
            )
      }
}