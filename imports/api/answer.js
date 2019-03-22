
import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";


export const Answer = new Mongo.Collection("answer");

if (Meteor.isServer) {
  Meteor.publish("answer", function guessesPublish() {
    return (Answer.find({}));
  });
}

//sets answer to game creator's preference
Meteor.methods({
  "answer.insert"(answer)  {
    check(answer, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    //stores solution from game creator
    //if document exists
    if(Answer.findOne({}) != undefined){
      Answer.update({}, {
        $set:{
          answer :answer,
          player : Meteor.user().username,
          gameInProgress : true
        }
      });
    }
    //document doe snot exist
    else {
      Answer.insert({
        answer : answer,
        player : Meteor.user().username,
        gameInProgress : true
      });
    }
  }
});

Meteor.methods({
  "answer.delete"() {
    Answer.remove({});
  }
});

//checks if @param guess matches the answer string
Meteor.methods({
  "answer.checkSolution"(guess)  {
    check(guess, String);
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    if (Answer.findOne({answer : guess}) != undefined) {
      // Answer.remove({});
      //game over - winner
      return true;
    }
    else{
    //continue game
      return false;
    }
  }
});

Meteor.methods({
  "answer.endGame" () {
    Answer.update({}, {
      $set:{
        answer :"",
        player : "",
        gameInProgress : false
      }
    });
  }
});

//returns true if a game is in progress
Meteor.methods({
  "answer.checkInProgress"() {
    return (Answer.findOne({gameInProgress : true})!=undefined);
  }
});
