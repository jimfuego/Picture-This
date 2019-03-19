import React from "react";
import {Link} from "react-router-dom";
//import PropTypes from "prop-types";
//import { Meteor } from "meteor/meteor";

//import { withTracker } from "meteor/react-meteor-data";


class Creategame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: " "};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
    <div className="formClass">
       <h2 className="startgame" text-align="center">Start Game</h2>
      <form className="gameform" onSubmit={this.handleSubmit}>
        <label className="picturelabel">
          Enter Picture Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <Link type="submit" to="/gamecreator" value="Submit">Submit</Link>
      </form>
      </div>
    );
  }
}

export default Creategame;
