import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";


export const User_Data = new Mongo.Collection("user_data");

// User_Data.schema = new SimpleSchema({
//   userName: {type: String},
//   gamesPlayed: {type: Number, defaultValue: 0},
//   gamesWon: {type: Number, defaultValue: 0},
//   memberSince: {type: Date}
// });

Meteor.methods({
  "user_data.getWins"(user){
    User_Data.findOne({username:user.userName});
  }
});
