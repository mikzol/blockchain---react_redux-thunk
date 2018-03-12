import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom'

import {getPopupParentElement} from "~/src/common/PopupUtils.js"

import {Icon} from 'react-fa'

import {ProgressBar} from 'react-bootstrap'

import "./common.css"
import "./authentication.css"

class Authentication extends React.Component {
    constructor(props) {
      super(props);
      this.modalDefaultStyles = {};
    }

    componentWillMount() {
      this.modalDefaultStyles = Modal.defaultStyles;

      Modal.defaultStyles.content.background = "white";
      Modal.defaultStyles.content.color = 'initial';
      Modal.defaultStyles.content["height"] = '85%';
      Modal.defaultStyles.content["width"] = '75%';
      Modal.defaultStyles.content["minWidth"] = 'initial';
      Modal.defaultStyles.content["maxWidth"] = 'initial';
      Modal.defaultStyles.content["overflowX"] = "hidden";
      Modal.defaultStyles.content["overflowY"] = "scroll";
      Modal.defaultStyles.content["marginLeft"] = 'auto';
      Modal.defaultStyles.content["marginRight"] = 'auto';
      Modal.defaultStyles.content["left"] = '0';
      Modal.defaultStyles.content["right"] = '0';
      Modal.defaultStyles.content["padding"] = '0px 20px';
    }
      
    componentWillUnmount() {
      Modal.defaultStyles = this.modalDefaultStyles;
    }

    handleClickOutside() {
       /* () => this.handleClose();*/
    }

    handleClose() {
      this.props.onClose();
    }
    
    handleCharacterSelectConfirm() {
      this.props.onClose();
    }

    handleSignUpFacebook() {
      this.props.onHandleCreationFinish();
      this.props.onHandleSignUpFacebook()
    }

    handleSignUpLinkedIn() {
      this.props.onHandleCreationFinish();
      this.props.onHandleSignUpLinkedIn()
    }

    render() {
        return (
          <Modal isOpen={true} onRequestClose={() => {}} contentLabel={"Character Selection"} 
            parentSelector={getPopupParentElement}>
            <Icon onClick={()=>this.handleClose()} className="character-creation-popup-close-icon" 
                name="times" aria-hidden="true"></Icon>
            <div id="character-authenticate-container">
              <div id="character-authenticate-container-inner">
              <div className="box-head">
                   <h1 className="text-center text-uppercase text-heading heading-border heading-border-decorators-visible">
                     <span>Plug In</span>
                   </h1>
                </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="text-center" id="character-creation-authenticate-button-container">
                      <span className="character-creation-auth-button" id="character-creation-button-facebook" 
                          onClick={()=>this.handleSignUpFacebook()}>
                        <Icon className="character-creation-social-icon" name="facebook"/>Login with Facebook
                      </span>
                      <span className="character-creation-auth-button" id="character-creation-button-linkedin"
                          onClick={()=>this.handleSignUpLinkedIn()}>
                        <Icon className="character-creation-social-icon" name="linkedin"/>Login with LinkedIn
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="text-center" id="character-creation-authorization-disclaimer">
                      <p id="character-creation-paragraph-primary"><b>
                        {"By clicking on any of the above authentication methods, you agree to our t&c's and confirm that you have read our "}
                        <Link to="/privacyPolicy" target="_blank">Data Privacy</Link> {" (which includes our Cookie Use Plociy)."}</b>
                      </p>
                      <hr></hr>
                      <p id="character-creation-paragraph-secondary">
                        &#42;We currently do not support non Facebook/LinkedIn authentication methods but plan to do so in the near future.
                      </p>
                      <p>
                        &#42;Soqqle is a platform to encourage personal growth by making learning fun.
                      </p>
                      <p>
                        We encourage you to support collaboration by maintaining courtesy and integrity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="character-creation-progressbar-container">
                <ProgressBar striped bsStyle="danger" now={this.props.progressValue} />
              </div>
            </div>
          </div>
        </Modal>
      )
    }
  }

  Authentication.propTypes = {
  }
 
  export default require('react-click-outside')(Authentication);