import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";


export const Canvas = new Mongo.Collection("canvas");

if (Meteor.isServer) {
  Meteor.publish("canvas", function playersPublish() {
    return Canvas.find({});
  });
}

//save state of canvas
Meteor.methods({
  "canvas.saveCanvas"(canvasSave)  {
    check(canvasSave, String);
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    Canvas.remove({});
    // console.log(canvasSave);
    Canvas.insert({
      canvasState : canvasSave
    });
  }
});

//delete canvas
Meteor.methods({
  "canvas.deleteCanvas"()  {
    Canvas.remove({});
  }
});
