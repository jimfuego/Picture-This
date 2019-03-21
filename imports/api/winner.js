import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";


export const Winner = new Mongo.Collection("winner");

if (Meteor.isServer) {
  Meteor.publish("winner", function playersPublish() {
    return Winner.find({});
  });
}
