import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class ChatMessage extends React.Component {

  hideChatWindow(){
    const chatWindow = document.getElementById('close-chat-window');
    chatWindow.click();
  }

  render() {
    // Was the message sent by the current user. If so, add a css class
    const fromMe = this.props.fromMe ? 'chat-me' : '';
    const timeStampClass = this.props.fromMe ? 'timeStampMe' : 'timeStampYou';
    const user = this.props.users.filter(user => (this.props.sender == user.userID))
    const fullName = user[0] ? user[0].firstName + " " + user[0].lastName : "You"
    const imgSrc = user[0] ? (user[0].profileImage ? user[0].profileImage : 'http://blog.newrelic.com/wp-content/uploads/chatbot-300x300.jpg' ) : this.props.userProfile.pictureURL
    let userLink = ""
    let chatPic

    if(user.length > 0 && user[0].userID !== 'chatbot'){
        userLink = '/userProfile?id=' + user[0].userID
        chatPic = (
          <Link to={userLink} onClick={this.hideChatWindow}>
            <img className="img-circle img-sm" src={imgSrc} />
          </Link>
        )
    }else if(this.props.fromMe){
        chatPic = (
            <Link to="/userProfile" onClick={this.hideChatWindow}>
              <img className="img-circle img-sm" src={imgSrc} />
            </Link>
          )
    }else{
        chatPic = (
          <img className="img-circle img-sm" src={imgSrc} />
        )
    }


    return (
      <div className="message-box">
        <div className="header">
          <div className="icon-holder">
            <div className="icon">
              {chatPic}
            </div>
            <div className={`header-text ${fromMe}`}>{fullName}</div>
          </div>
          <div className="time-text">
            <TimeAgo date={this.props.time} minPeriod={60} />
          </div>
        </div>
        <div className="text-holder">
          <div className="text-message">
            {/* But i must <span className="hasTag-text">#explain</span> to <span className="name-text">@Daniel</span> how all this mistaken idea of <span className="hasTag-text">#denouncing</span> pleasure and */}
            {ReactHtmlParser(this.props.message)}
          </div>
        </div>
        {/* <div className="divide-message"/> */}
      </div>
    );
  }
}

ChatMessage.defaultProps = {
  message: '',
  username: '',
  fromMe: false,
};

export default ChatMessage;
