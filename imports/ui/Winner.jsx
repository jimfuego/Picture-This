import React, { Component } from "react";
import {Link} from "react-router-dom";
import { Meteor } from "meteor/meteor";
import {Answer} from "../api/answer.js";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";



class Winner extends Component{

 constructor(props) {
    super(props);

 this.winnerid = this.props.match.params.id;

 }

 renderGames() {
    return this.props.users.map(m =>
      <div className="card" key={m._id}>{m.username}</div>);
  }

  finishGame() {
		Meteor.call("answer.checkInProgress", (err) =>{
		    if (err) {
		      alert("There was error checking solution");
		      console.log(err);
		      return;
		    }
		     console.log("game done");
    		 this.setState({
      		 message: ""
		});
			

	});
  
  }


//check this method
  render() {
      if(!(this.props.currentgame[0].hasOwnProperty("checkInProgress"))){
    this.finishGame();}
    return (
      <div>
        <h2>Winner</h2>
        <div className="users">{this.renderGames()} </div>   
      </div>
    );
  }
}


export default withTracker((props) => {
    var thisWinnerId = props.match.params.id; 
    const handle = Meteor.subscribe("users",thisWinnerId);
    const newhandle = Meteor.subscribe("currentgame");
   
    
    return {
        currentgame: Answer.find({}, { sort: { createdAt: -1 }, limit: 1 }).fetch(),
        users: Meteor.users.find({_id:thisWinnerId}),
        ready : handle.ready()
    };
  })(Winner);

/*export default withTracker((props) => {
    var thisWinnerId = props.match.params.id; 
    const handle = Meteor.subscribe("users",thisWinnerId);
    //const newhandle = Meteor.subscribe("currentgame");
   
    
    return {
     currentgameanswer: Answer.find({}, { sort: { createdAt: -1 }, limit: 1 }).fetch(),
     currentgameguess: Guess.find({}, { sort: { createdAt: -1 }, limit: 1 }).fetch(),

      users: Meteor.users.find({_id:thisWinnerId}),
      ready : handle.ready()
    };
  })(Winner);*/
