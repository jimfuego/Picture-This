import React from "react";
import {Link} from "react-router-dom";
import { Meteor } from "meteor/meteor";


class Playerprofile extends Component{

 constructor(props) {
   super(props);

    this.state = {
      wins: "",
      numberofgamesplayed:""
    };
  }

  render() {
    return (
  		<div class="playerprofile">
  			<div className="container">
          <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="/">PT</a>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                      <li><a href="/">Home</a></li>
                      <li>{registerButton}</li>
                      <li>{loginButton}</li>
                  </ul>
              </div>
          </div>
  		</div>
    )
  }
}

export default withTracker(() => {
  //const handle = Meteor.subscribe("messages");

  return {
    /*messages: Messages.find({}).fetch(),
    user: Meteor.user(),
    ready : handle.ready()*/
    wins:,
    numberofgamesplayed:
  };
})(Playerprofile);
