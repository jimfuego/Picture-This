import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";


export const New_User = new Mongo.Collection("new_user");

// if (Meteor.isServer) {
//   Meteor.publish("new_user", function guessesPublish() {
//     return new_user
//       .find({}, {
//         // FIXME: don't limit or sort... maybe sort
//         limit: 10,
//         sort: {
//           createdAt: -1
//         }
//       });
//   });
// }

Meteor.methods({
  "new_user.insert"(user)  {
    check(user, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    New_User.insert({
      userName : user.userName,
      password: user.password,
      gamesPlayed: 0,
      gamesWon: 0,
      createdAt : Date.now(),
      player : Meteor.user().username
    });
  }
});
