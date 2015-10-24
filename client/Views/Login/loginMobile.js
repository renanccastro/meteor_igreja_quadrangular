Template.LoginMobile.events({
    'submit #loginform' : function(e) {
        e.preventDefault();
        var email = $('#login-username').val();
        var password = $('input[name=password]').val();

        Meteor.loginWithPassword(email, password, function(err){
            if (err){
                Alerts.add("Usuário ou senha incorreto.");
            }
            else{
                Router.go('/');
            }
            // The user has been logged in.
        });
        return false;

    }

});
Template.LoginMobile.helpers({

});