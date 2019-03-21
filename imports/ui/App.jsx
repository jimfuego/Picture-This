import React, { Component, Fragment} from "react";
import { Meteor } from "meteor/meteor";
import Otherusers from "./Otherusers.jsx";
import NavBar from "./NavBar.jsx";
import Creategame from "./Creategame.jsx";
//import Admin from "./Admin.jsx";
import Canvas from "./Canvas.jsx";
import {Redirect} from "react-router-dom";
import Drawer from "./Drawer.jsx";
import Winner from "./Winner.jsx";
import { withTracker } from "meteor/react-meteor-data";



import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import HomeComponent from "./HomeComponent.jsx"

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

  //if game is in progress then go to game creator page else go to other users page. Remove home compnent
  /*const CreateGame = () => {
    return(
      <div>
      {Meteor.call("answer.checkInProgress",null, (err,res) => {
        if (err){
          alert("Error recording answer");
          console.log(err);
          return;
        }

        if(res==true){
          return <Drawer/>;
        }
      })

    }  
    </div>
    );
  };*/

//Should route to player profile page instead of not found page
/*const AdminPage= () =>{
  return (
    <div>
    {Meteor.call("answer.checkSolution",guess, (err,res) => {
      if (err){
        alert("Error recording answer");
        console.log(err);
        return;
      }
        //if the game is won route to profile page
        if(res==true){
          return <NotFoundPage/>;
        }
      })

  }  
  </div>

  );
};*/


//should go to profile page if winning condition is met  
/*const OtherUsers = (guess) => {
  return(
    <div>
    {Meteor.call("answer.checkSolution",guess, (err,res) => {
      if (err){
        alert("Solution is not correct");
        console.log(err);
        return;
      }
        //if the game is won route to profile page
        if(res==true){
          return <NotFoundPage/>;
        }
      })

  }  
  </div>
  );

};*/


    //should route to create game when a game is finished 
    /*const PlayerProfile = () =>{
      {Meteor.user() ? <Playerprofile/> : 
    
      }*/

      class App extends Component {
        constructor(props) {
          super(props);
          this.state = {value: ''};

          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleChange(event) {
          this.setState({value: event.target.value});
        }

        handleSubmit(event) {
          alert('A name was submitted: ' + this.state.value);
          event.preventDefault();
        }
        //missing profile page
        render() {
          return (
            <Router>
            <div>
            <NavBar />
            <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/creategame" component={Creategame}/>
            <Route exact path="/canvas" component={Canvas}/>
            <Route exact path="/drawer" component={Drawer}/>
            <Route exact path="/otherusers" component={Otherusers}/>
            <Route exact path="/winner" component={Winner}/>
            <Route component={NotFoundPage} />
            </Switch>
            <br />
            <div></div>


            </div>
            </Router>
            );
        }
      }

      /*function isLoggedIn() {
        console.log("yes");
        return Meteor.user() ? true : false;
      }*/

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


