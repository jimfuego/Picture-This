import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";


export const Players = new Mongo.Collection("players");

if (Meteor.isServer) {
  Meteor.publish("players", function playersPublish() {
    return Players.find({});
  });
}

Meteor.methods({
  "players.newPlayer"(player)  {
    check(player, String);
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    Players.insert({
      player : Meteor.user().username
    });
  }
});
