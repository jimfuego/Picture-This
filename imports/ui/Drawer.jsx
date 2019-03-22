import React, { Component, Fragment } from "react";
import Canvas from "./Canvas.jsx";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Messages } from "../api/messages.js";
import { Answer } from "../api/answer.js";
import {withRouter} from "react-router-dom";
import { Winner } from "../api/winner.js";




class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      answer: "",
      winner:""
    };
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    // this.answer = {value: ''};
    /*this.isPictureName = false;
    this.gameid = "";
    this.handleChange = this.handleChange.bind(this);
    this.ansChange = this.ansChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.answerSubmit = this.answerSubmit.bind(this);*/
  }


  saveCanvas() {
    const canvasSave = document.getElementById("drawcanvas");
    const d = canvasSave.toDataURL("image/png");
    Meteor.call("canvas.saveCanvas", d, (err) => {
      if (err){
        alert("Error recording canvas");
        console.log(err);
        return;
      }
      // console.log("Canvas inserted", res);
    });

    /*const w = window.open('about:blank', 'image from canvas');
        w.document.write("<img src='"+d+"' alt='from canvas'/>");
        console.log('Saved!');*/
  }


  /*handleChange(event) {
    // this.setState({value: event.target.value});
    this.setState({value: document.getElementById('picName').value});

  }
  ansChange(event) {
    this.setState({answer: document.getElementById('correctAnswer').value});

  }

  handleSubmit(event) {
    this.setState({value: document.getElementById('picName').value});

    this.isPictureName = true;

    event.preventDefault();

    console.log(this.state.value);
    Meteor.call("drawgame.insert",
      this.state.value,
      (err, res) => {
        if (err) {
          alert("There was error inserting check the console");
          console.log(err);
          return;
        }
        this.gameid = res;
        console.log("Game name inserted");
        this.setState({
          value: ""
        });
      });
  }


  answerSubmit(event) {
    console.log('test');
    this.setState({answer: document.getElementById('correctAnswer').value});

    event.preventDefault();



    Meteor.call("drawgame.update",
      {"id":this.gameid,"answer":this.state.answer},
      (err, res) => {
        if (err) {
          alert("There was error inserting check the console");
          console.log(err);
          return;
        }

        console.log("answer added");
        this.setState({
          message: ""
        });
      });

  }*/

//if there is a winner
//clear canvas


  componentDidUpdate(){
    console.log("state.winner", this.state.winner);
    Meteor.call("answer.checkInProgress", (err, res) => {
      if (res){
        //do nothing
        console.log("Game still in progress", res);
      }
      else{
        //game is over
        alert("Game over... nice drawing.");
        this.props.history.push("/creategame");
      }
    });
  }

  render() {
    return (
      <div>
        {
          <Fragment>
            <h3 className="forTitle" >Draw Picture</h3>
            <div className="main">
              <div className="color-guide">
              </div>
              <Canvas/>
            </div>
          </Fragment>
        }
      </div>
    );
  }
}

/*Drawer.propTypes = {
  canvas: PropTypes.arrayOf(PropTypes.object).isRequired
};*/

export default withRouter(withTracker(() => {
  // const handle = Meteor.subscribe("messages");
  const subwinner=Meteor.subscribe("winner");
  const answer=Meteor.subscribe("answer");
  // const c = Meteor.subscribe("canvas");
  // const subanswer=Meteor.subscribe("answer");
  return {
    user: Meteor.user(),
    ready : answer.ready(),
    winner:  Winner.find({}).fetch()
    // inProgress: answer.findOne({inProgress:false}).fetch()
  };
})(Drawer));
