if (Meteor.isServer) {
      Blog.config({
         adminRole: 'blogAdmin',
         authorRole: 'blogAuthor'
      });

    Meteor.startup(function () {
        // bootstrap the admin user if they exist -- You'll be replacing the id later
        if (Meteor.users.findOne("vnKEqpS8g3GD9rafX")){
            Roles.addUsersToRoles("vnKEqpS8g3GD9rafX", ['admin']);
            Roles.addUsersToRoles("vnKEqpS8g3GD9rafX", ['blogAdmin']);
            Roles.addUsersToRoles("vnKEqpS8g3GD9rafX", ['blogAuthor']);
          }

        // create a couple of roles if they don't already exist (THESE ARE NOT NEEDED -- just for the demo)
        if(!Meteor.roles.findOne({name: "Líder"}))
            Roles.createRole("Líder");
        if(!Meteor.roles.findOne({name: "Louvor"}))
            Roles.createRole("Louvor");
        if(!Meteor.roles.findOne({name: "Dança"}))
            Roles.createRole("Dança");
        if(!Meteor.roles.findOne({name: "Pastor"}))
            Roles.createRole("Pastor");
    });
}
