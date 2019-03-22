import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Drawgame = new Mongo.Collection("drawgame");

Meteor.methods({
  "drawgame.insert"(drawgame)  {
    console.log("serverside value =="+drawgame);
    check(drawgame, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    var newdrawgame = Drawgame.insert({
      name : drawgame,
      createdAt : Date.now(),
      owner : this.userId
    });
    return newdrawgame;
  },
  "drawgame.update"(drawgame)  {
    check(drawgame.answer, String);
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    Drawgame.update(
      { _id : drawgame.id },
      { $set: { "answer" : drawgame.answer } }
    );

  }
});
