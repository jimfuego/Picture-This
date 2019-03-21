import React from "react";
import {Link} from "react-router-dom";
import { Meteor } from "meteor/meteor";


class Playerprofile extends Component{

 constructor(props) {
    super(props);

    this.state = {
      wins: "";
      numberofgamesplayed:"";
    };
  }



render() {
	return (
		
		<div class="playerprofile">
			<div className="container">
					
                </div>
		</div>

	}

 }

export default withTracker(() => {
  //const handle = Meteor.subscribe("messages");

  return {
    /*messages: Messages.find({}).fetch(),
    user: Meteor.user(),
    ready : handle.ready()*/
    wins: 
    numberofgamesplayed: 
  };
})(Playerprofile);