import React, { Component } from "react";
import { Template } from "meteor/templating";
import { Blaze } from "meteor/blaze";
import { Tracker } from "meteor/tracker";
import { Meteor } from "meteor/meteor";
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";




class AccountsUIWrapper extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons, this.container);
    Tracker.autorun((c) => {
      var userId = Meteor.userId();
      if (c.firstRun)
        return;
      console.log(userId ? "Log-in" : "Log-out");
      if(userId){
        //Logged In
      } else {
        //Logged out. Redirect
        this.props.history.push("/");
      }

    });

  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref={container => (this.container = container)} />;
  }
}

export default withRouter(AccountsUIWrapper);