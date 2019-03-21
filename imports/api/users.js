import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";


//export const Users = new Mongo.Collection("drawgame");


if (Meteor.isServer) {
  Meteor.publish("users", function drawgamePublish(uid) {
 var thisData =   Meteor.users.find({_id:uid});
    
    return thisData;
  });
}