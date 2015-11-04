Template.header.helpers({
    // check if user is an admin
    isAdminUser: function () {
        return Roles.userIsInRole(Meteor.user(), ['admin']);
    },
    getName : function(){
        if(Meteor.user().profile.name)
            return Meteor.user().profile.name;
        else
            return Meteor.user().emails[0].address;
    }

});
accountsUIBootstrap3.setLanguage('pt-BR');
Template.header.events({
    'click .dropdown-toggle': function (e) {
        e.preventDefault();
        $(e.target).find('.dropdown-menu').toggle();
    },
    'submit form': function (event) {
        event.preventDefault();
        var body = event.target.search_text.value;
        console.log(body);
        EasySearch
            .getComponentInstance({
                index: 'posts'
            })
            .search(body);
    },
    'click .logout_button' : function(e){
        e.preventDefault();
        Meteor.logout();
    }

});
