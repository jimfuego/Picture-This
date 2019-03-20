import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";


export const Guesses = new Mongo.Collection("guesses");

if (Meteor.isServer) {
  Meteor.publish("guesses", function guessesPublish() {
    return Guesses
      .find({}, {
        // FIXME: don't limit or sort... maybe sort
        limit: 10,
        sort: {
          createdAt: -1
        }
      });
  });
}

Meteor.methods({
  "guesses.insert"(guess)  {
    check(guess, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Guesses.insert({
      guess : guess,
      createdAt : Date.now(),
      player : Meteor.user().username
    });
  }
});