import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Messages } from "../api/messages.js";
import {Canvas} from "../api/canvas.js";
import { Answer } from "../api/answer.js";
//import { Creategame } from "./Creategame.js";

class Otherusers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""

    };
  }

  renderMessages() {
    if(this.props.endGame[0] &&
       this.props.endGame[0].gameInProgress == false){
      alert("Game over... you lost.");
      this.props.history.push("/creategame");
    }
    return this.props.messages.map(m =>
      <div className="card" key={m._id}>{m.owner} : {m.message}</div>);
  }

  onChange(evt) {
    console.log("change", evt.target.value);
    this.setState({
      message: evt.target.value
    });
  }

  onKey(evt) {
    if (evt.key === "Enter") {
      Meteor.call("messages.insert",
        this.state.message,
        (err, res) => {
          if (err) {
            alert("There was error inserting check the console");
            console.log(err);
            return;
          }
          console.log("Message inserted", res);
          Meteor.call("answer.checkSolution", this.state.message, (err,res)=> {
            if (err) {
              alert("Error checking solution");
              console.log(err);
              return;
            }
            else if (res==false) {
              alert("Wrong Answer-Try Again");
            }
            else {
              Meteor.call("winner.setWinner", Meteor.user().username, (err,res) => {
                Meteor.call("answer.endGame", (err) => {
                  if(err){
                    console.log("error ending game Otherusers.jsx", err);
                  }
                  else{
                    //do nothing
                  }
                });
                alert("you are the winner brah", res);
                Meteor.call("canvas.deleteCanvas", (err) => {
                  if (err) {
                    alert("Error deleting Canvas");
                    console.log(err);
                    return;
                  }

                  else{
                    console.log("Canvas Deleted");
                  }
                });
                this.props.history.push("/creategame");
              });
            }
          });
        });
    }
  }



  render() {
    console.log("Messages", this.props.messages);
    return (
      <div>
        <h2>Guesses</h2>
        <div className="messsges">{this.renderMessages()}</div>
        <h3>Enter your guess</h3>
        <label htmlFor="inMessage">
          Guess:{" "}
          <input
            className="form-control"
            type="text"
            placeholder="Enter your solution"
            value={this.state.message}
            onChange={this.onChange.bind(this)}
            onKeyPress={this.onKey.bind(this)}
          />
        </label>
        {console.log(this.props.canvas)}
        {this.props.canvas[0]?
          <img id="bloom" src={this.props.canvas[0].canvasState} alt='from canvas'/>:
          <div></div>}
      </div>
    );
  }
}

Otherusers.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  canvas: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
  const handle = Meteor.subscribe("messages");
  const c = Meteor.subscribe("canvas");
  const subwinner=Meteor.subscribe("winner");
  const subanswer=Meteor.subscribe("answer");

  return {
    messages: Messages.find({}).fetch(),
    user: Meteor.user(),
    ready : handle.ready() || c.ready() || subanswer.ready() || subwinner.ready(),
    canvas: Canvas.find({}).fetch(),
    answer: Answer.find({}).fetch(),
    endGame: Answer.find({}).fetch()

  };
})(Otherusers);
