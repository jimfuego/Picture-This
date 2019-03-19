import React, { Component, Fragment } from "react";
import { Meteor } from "meteor/meteor";
import Chat from "./Chat.jsx";
import NavBar from "./NavBar.jsx";
import Creategame from "./Creategame.jsx";
import Gamecreator from "./Gamecreator.jsx";


import { withTracker } from "meteor/react-meteor-data";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const HomeComponent = () => {
  return (
    <div>
          {Meteor.userId() ? <Creategame/>  : <div><h1 className="text-center">Picture-This</h1>
        <p className="text-center-new">Fun SFW picture guessing game </p></div>}
    </div>
  );
};

/*const AboutComponent = () =>
  <div>
    <h2>About</h2>
    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est saepe, ea minus quae ab nam impedit eaque. Adipisci expedita sit repudiandae, enim sapiente ipsam voluptas obcaecati veritatis, sunt eius nemo.</div>
  </div>;*/

const NotFoundPage = () =>
  <div>
    <h2>Page not found</h2>
    <div>We should call Suhas 🤷‍♀️</div>
  </div>;

  const CreateGame = () => {
  return(
  <div>
    {Meteor.userId() ? <Gamecreator/> : {HomeComponent}}
  </div>
  );
};


  const GameCreator= () =>{
  return (
    <div>
      {Meteor.userId() ? <Gamecreator/> :<div><h1 className="text-center">Picture-This</h1>
        <p className="text-center-new">Fun SFW picture guessing game </p></div>
    

        }

    </div>

    );
};
    
    /*const PlayerProfile = () =>
      {Meteor.user() ? <PlayerProfile/> : 

  */

  /*const chat =() =>

  */

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/creategame" component={CreateGame}/>
            <Route exact path="/gamecreator" component={GameCreator}/>
            <Route exact path="/otherusers" component={Chat}/>
            <Route component={NotFoundPage} />
          </Switch>
          <br />
          <div></div>


        </div>
      </Router>
    );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.userId()
  };
})(App);

/*const LobbyPage = () => {
return(

<div>
      {Meteor.user() ? 
          <div className="bg-overlay row justify-content-center">


          <center>


          <div className="container">

            <div className="row text-center  text-white top-buffer" >

              <h1 className="h1class">
              </h1>

              <br/><br/>
              </div>
          <div className="button-toolbar">
          <div className="row">

            <div className="col-xl-6">
                <Link className="btn btn-primary btn-lg col-lg-8"  to="/register">Start Game</Link>
            </div>

          <div className="col-xl-6">
                <Link className="btn btn-primary btn-lg col-lg-8" to="/login">Join Game</Link>
          </div>

          </div>

        </div>

      </div>
      </center>
    </div>
    :<div><h1 className="text-center">Picture-This</h1>
        <p className="text-center-new">Fun SFW picture guessing game </p></div>
  }

</div>
);
};*/


