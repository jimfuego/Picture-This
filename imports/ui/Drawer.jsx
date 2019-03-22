import React, { Fragment } from "react";
import Canvas from "./Canvas.jsx";
import { PropTypes } from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Answer } from "../api/answer.js";
import {withRouter} from "react-router-dom";



class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      answer: "",
      winner:""
    };
    const propTypes = {
      endGame: PropTypes.string.isRequired,
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
    });
  }

  componentDidUpdate(){
    if(this.props.endGame[0] &&
       this.props.endGame[0].gameInProgress == false){
      alert("Game over... nice drawing.");
      this.props.history.push("/creategame");
    }
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
  const answer=Meteor.subscribe("answer");
  return {
    user: Meteor.user(),
    ready : answer.ready(),
    endGame:  Answer.find({}).fetch()
  };
})(Drawer));
