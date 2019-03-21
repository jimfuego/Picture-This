import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

import { withTracker } from "meteor/react-meteor-data";
import { Answer } from "../api/answer.js";

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state={component : (<div><h1 className="text-center">Picture-This</h1>
      <p className="text-center-new">Fun SFW picture guessing game </p></div>)}
  }

  render() {
    console.log(this.props.answer);
    return (
      <div>
        {Meteor.userId()? (this.props.answer? (<Redirect to="/otherusers"/>) : (<Redirect to="/creategame"/>)): this.state.component}
      </div>
    );
  }
}


export default withTracker(() => {
  const handle = Meteor.subscribe("answer");
  return {
    answer: Answer.findOne({gameInProgress : true}),
    user: Meteor.user(),
    ready : handle.ready()
  };
})(HomeComponent);
