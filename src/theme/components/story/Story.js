/*
  Replacement of: src/theme/ProgressionTrees.js
*/

import React, { Component } from 'react';
import _ from 'lodash';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import LeftNav from '~/src/theme/components/homepage/LeftNav';
import RightSection from '~/src/theme/components/homepage/RightSection';
import Skills from './Skills';

import TaskTypes from '~/src/common/TaskTypes';

import { 
  fetchStories
} from '~/src/redux/actions/story';
import { saveTask } from '~/src/redux/actions/tasks';


const profilePic =
  'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/default-profile.png';
  const RandomInt = function RandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

class Story extends Component {
  constructor (props) {
    super(props);

    this.state = {
      profilePic: this.props.userProfile.pictureURL ? this.props.userProfile.pictureURL : profilePic
    };
  }

  componentWillMount() {
    this.props.fetchStories();
    mixpanel.track("Enter Story page");
  }

  onSigupDecode(data){
    const decode = {
      type: TaskTypes.DECODE,
      userName: `${this.props.userProfile.firstName} ${this.props.userProfile.lastName}`,
      userID: this.props.userProfile._id,
      isHidden: 0,
      creator: {
        _id: this.props.userProfile._id,
        firstName: this.props.userProfile.firstName,
        lastName: this.props.userProfile.lastName,
      },
      metaData: {
        subject: {
          skill: {
            _id: data._id,
            name: data.skill,
          },
        },
        participants: [
          {
            user: {
              _id: this.props.userProfile._id,
              firstName: this.props.userProfile.firstName,
              lastName: this.props.userProfile.lastName,
            },
            status: 'accepted',
            isCreator: true,
          },
        ],
        ratings: [],
        time: Date.now(),
        awardXP: RandomInt(30, 40),
      },
    };
    this.props.saveTask(decode);
  }

  renderSkillBox(skills) {
    return _.map(skills, skill => <Skills key={skill._id} data={skill} onSignup={(data) => this.onSigupDecode(data)}/>)
  }

  render () {
    return (
      <div
        className={`${this.props.userProfile.theme.toLowerCase()}-theme-wrapper profile-wrapper stories-wrapper main-bg`}>
        <div className='row'>
          <div className='container'>
            <div className='row'>
              <div className='row'>
                <LeftNav
                  accounting={this.props.accounting}
                  userProfile={this.props.userProfile}
                  profilePic={this.state.profilePic}
                />

                <RightSection
                  skills={this.props.skills}
                  roadmapsAdmin={this.props.roadmapsAdmin}
                  userProfile={this.props.userProfile}
                />

                <div className='col-middle ml-fixed'>
                  {this.renderSkillBox(this.props.fetchedSkills)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
	isFetchingSkills: state.skills.isFetchingSkills,
	fetchedSkills: state.skills.skills
});

const mapDispatchToProps = dispatch => ({
  fetchStories: bindActionCreators(fetchStories, dispatch),
  saveTask: bindActionCreators(saveTask, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Story));
