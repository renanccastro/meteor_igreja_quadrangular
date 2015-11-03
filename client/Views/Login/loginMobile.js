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
        var name = $('#name').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var gender = $('#gender').val();
        var capela = $('#capela').val();
        console.log(name + )
        Accounts.createUser({
            name: name,
            email: email,
            password: password,
            gender: gender,
            capela: capela
        });
    }

});
Template.LoginMobile.helpers({

});