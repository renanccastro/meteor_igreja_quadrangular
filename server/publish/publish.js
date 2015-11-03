if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish("messages", function () {
        return Messages.find();
    });
    Meteor.publish("posts", function () {
        return Posts.find();
    });
    Meteor.publish("recados", function () {
        return Recados.find();
    });
    Meteor.publish("submissions", function () {
        return Submissions.find();
    });


}
