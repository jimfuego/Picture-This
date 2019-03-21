import React from "react";
import {Link} from "react-router-dom";
import {Answer} from "../api/answer.js";
import {
 BrowserRouter as Router,
 Route
} from 'react-router-dom';
import {Meteor} from "meteor/meteor";
//import PropTypes from "prop-types";
//import { Meteor } from "meteor/meteor";

//import { withTracker } from "meteor/react-meteor-data";


class Creategame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: " ", inSession: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: document.getElementById('picName').value, inSession: true});

  }

  handleSubmit(event) {

    alert("A name was submitted: " + this.state.value);
    this.setState({value: document.getElementById('picName').value});
    event.preventDefault();
    if(Meteor.call("answer.checkInProgress", (err, res) => {
  	if(err){
  		alert("alert Creategame.jsx.handleSubmit");
  		console.log(err);
    		return;
    	}
    })){
    	alert("Game already in progress, rerouting to game lobby");
    	this.props.history.push("/otherusers");
    }
    else{
    	Meteor.call("answer.insert",this.state.value, (err,res) => {
    	if (err){
    		alert("Error recording answer");
    		console.log(err);
    		return;
    	}
    	console.log("Answer inserted", res);
    	this.props.history.push("/drawer");
    	this.setState({
    		value: ""
    	});
    		
    });
	}
  }

  render() {
    return (
    <div className="formClass">
       <h2 className="startgame" text-align="center">Start Game</h2>
      <form className="gameform" onSubmit={this.handleSubmit}>
        <label className="picturelabel">
          Enter Picture Name:
          <input type="text" id="picName" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit"/>
      </form>
      </div>
    );
  }
}

export default Creategame;
