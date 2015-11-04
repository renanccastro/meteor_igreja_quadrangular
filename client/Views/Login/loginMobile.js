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

    },
    'click #btn-fblogin': function(e){
        e.preventDefault();
        console.log("teste");
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                Alerts.add("Falha ao logar com facebook.");
            }else{
                Router.go('/');
            }

        });
    },
    'submit #signupform' : function(e){
        e.preventDefault();
        var name = $('#name-register').val();
        var email = $('#email-register').val();
        var password = $('#password-register').val();
        var gender = $('input[name=login-gender]:checked', '#signupform').val();
        var capela = $('#capela-register').val();
        Accounts.createUser({
            email: email,
            password: password,
            profile:{
                name: name,
                gender: gender,
                capela: capela
            }
        },function(err) {
            if (err)
                Alerts.add("Falha ao criar usuário!");
            else
                Router.go('/');
        });
    }

});
Template.LoginMobile.helpers({
});