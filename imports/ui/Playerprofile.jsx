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
		
		<template name="User stats">
			<div class="profile">
				
			</div>
		</template>
		);
}

 }

export default Playerprofile;