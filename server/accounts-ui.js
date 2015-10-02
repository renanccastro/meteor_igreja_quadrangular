if (Meteor.isServer) {
      Blog.config({
         adminRole: 'blogAdmin',
         authorRole: 'blogAuthor'
      });

    Meteor.startup(function () {
        // bootstrap the admin user if they exist -- You'll be replacing the id later
        if (Meteor.users.findOne("bXfLj4nfXSQP4LyKK")){
            Roles.addUsersToRoles("bXfLj4nfXSQP4LyKK", ['admin']);
             Roles.addUsersToRoles("bXfLj4nfXSQP4LyKK", ['blogAdmin']);
              Roles.addUsersToRoles("bXfLj4nfXSQP4LyKK", ['blogAuthor']);
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
