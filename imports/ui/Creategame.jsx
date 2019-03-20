import React from "react";
import {Link} from "react-router-dom";
import { Answer } from "../api/answer.js";
import { Meteor } from "meteor.meteor"

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
    this.setState({value: document.getElementById("picName").value});
    event.preventDefault();
    Meteor.call("answer.insert",this.state.value, (err,res) => {
      if (err){
        alert("Error recording answer");
        console.log(err);
        return;
      }

      console.log("Answer inserted", res);
      this.setState({
        value: ""
      });
    });

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
          <Link type="submit" to="/gamecreator" value="Submit">Submit</Link>
        </form>
      </div>
    );
  }
}

export default Creategame;
