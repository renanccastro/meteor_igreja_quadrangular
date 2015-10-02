current = 0;
if (Meteor.isClient) {
      Blog.config({
            blogShowTemplate: 'blogEntryTemplate',

    comments: {
        disqusShortname: 'ieqpirassununga'
    }

  });

    Router.configure({
        layoutTemplate: 'main'
    });


    Router.route('/memberCenter/messages/addMessage',{name: "addMessage",template: 'add_message'});
    Router.route('/memberCenter/esferajovemlist',{name: "submissions_table",template: 'submissions_table'});

    Router.route('/memberCenter/agenda',{name: "memberCenterAgenda",template: 'agenda'});
    Router.route('/memberCenter/recados',{name: "memberCenterRecados",template: 'recados'});

    Router.route('/memberCenter/messages/editmessage/:_id', {name: "editmessage",template: 'edit_message',
        data: function () {
            return Messages.findOne({_id: this.params._id});
        }
    }
    );

    Router.route('/profile', function() {
        this.render('profile.html', {
            data: function() {
                var data = {
                    profile: true
                };
                return data;
            }
        });
    });

    Router.route('/memberCenter',{name: "memberCenter",template: 'member_center'});
    Router.route('/memberCenter/messages',{name: "member_center_messages", template: 'member_center_messages'});


    Router.route('/userAdmin', function() {
        this.render('accountsAdmin', {
            data: function() {
                var data = {
                    userAdmin: true
                };
                return data;
            }
        });
    });
    Router.route('/', function() {
        this.render('index.html', {
            data: function() {
                var data = {
                    home: true
                };
                return data;
            }
        });
    });
    Router.route('/submissionList', function() {
        this.render('submissions_table', {
            data: function() {
                var data = {
                    home: true
                };
                return data;
            }
        });
    });

    Router.route('/mensagens', function() {
        this.render('mensagens', {
            data: function() {
                var data = {
                    mensagens: true
                };
                return data;
            }
        });
    });
    Router.route('/esferajovem', function() {
        this.render('esferajovem', {
            data: function() {
                var data = {
                    esferajovem: true
                };
                return data;
            }
        });
    });


Template.form_esfera.events({
    "change .input-file": function(event, template){
        S3.collection
        var files = $("input[type='file']")[0].files;

        S3.upload({
                files:files,
                path:"subfolder"
            },function(e,r){
                console.log(e);
                console.log(r);
        });
    },
    'submit form': function(e, tmpl) {
        console.log('submite wins');
        e.preventDefault();
        var files = $("input[type='file']")[0].files;
        var name = tmpl.find('#inputName').value,
        email = tmpl.find('#inputEmail').value,
        quadro = $("#select_quadro option:selected" ).text(),
        comentario = tmpl.find('#comentario').value;
        console.log(name + email + quadro + comentario + files);
        Meteor.call('submitSubmission', name, email, quadro, files, comentario);
        $('#success').show();
        $('#inputName').val("");
        $('#inputEmail').val("");
        $('#comentario').val("");
        $("#filebutton").val("");
        S3.collection.remove({});

    }

})

Template.form_esfera.helpers({
    "files": function(){
        return S3.collection.find();
    },
    "isUploadInProgress": function(){
        var isUploadInProgress = false;
        var s3_array = S3.collection.find().fetch();
        for (var i = 0; i < s3_array.length; i++) {
            isUploadInProgress = (s3_array[i].status != "complete");
        }
        return isUploadInProgress;
    }

})

    accountsUIBootstrap3.setLanguage('pt-BR');
    Template.header.events({
        'click .dropdown-toggle': function(e) {
            e.preventDefault();
            $(e.target).find('.dropdown-menu').toggle();
        },
        'submit form': function(event) {
            event.preventDefault();
            var body = event.target.search_text.value;
            console.log(body);
            EasySearch
                .getComponentInstance({
                    index: 'posts'
                })
                .search(body);
        }

    });
    Template.normalSearch.events({});
    Template.messages_submit.events({

        'submit #messagesForm': function(e, tmpl) {
            e.preventDefault();

            var title = tmpl.find('#messageTitle').value,
                author = tmpl.find('#messageAuthor').value,
                date = tmpl.find('#messageDate').value,
                url = tmpl.find('#messageUrl').value;
            console.log(url);
            Meteor.call('submitMessage', title, author, date, url);

        }
    });
    Template.submissions_table.events({
        'click .glyphicon': function(object) {
            var id = object.currentTarget.id;
                var doc = Submissions.findOne(id);
                if (confirm('Deseja mesmo deletar a mensagem?')) {
                    Submissions.remove(id);
                    Router.go('/memberCenter/esferajovemlist');
                }
        }
    });
    Template.submissions_table.helpers({
        'settings': {'fields': ['name','email','quadro',{
                    'key': 'files', 
                    'label': 'testes',
                    fn: function (value, object) { 
                        console.log(object.files);
                        console.log(value.length + object.length);
                        var string = "";
                        for(var key in object.files) {
                            string += object.files[key].name + ", ";
                        }
                        console.log("lol: " + string);
                        return string;
                        }
                    },'comments',{
                    'key': 'remove', 
                    'label': 'Remover',
                    fn: function (value, object) { 
                        // return new Spacebars.SafeString('teste');
                        console.log("ID: " + object._id);                        
                        return new Spacebars.SafeString("<a href='#' aria-hidden='true' id='"+object._id+"' class='glyphicon glyphicon-remove deletbtn'></a>");
                        }
                    }],
                    'collection': Submissions
        },
        beforeRemove: function() {
            return function(collection, id) {
                var doc = collection.findOne(id);
                if (confirm('Deseja mesmo deletar a mensagem?')) {
                    this.remove();
                    Router.go('/memberCenter/esferajovemlist');
                }
            };
        }

    });
    Template.blog.helpers({
        'posts': function() {
            return Posts.find();
        }
    });
    Template.mensagens.helpers({
        'messages': function() {
            return Messages.find();
        }
    });
    Template.recados.helpers({
        'recados': function() {
            return Recados.find();
        }
    });

    Template.header.helpers({
        // check if user is an admin
        isAdminUser: function() {
            return Roles.userIsInRole(Meteor.user(), ['admin']);
        }
    });
    Template.member_center.helpers({
        canModifyContent: function() {
            return Roles.userIsInRole(Meteor.user(), ['admin'])  ||
                   Roles.userIsInRole(Meteor.user(), ['Pastor']) ||
                   Roles.userIsInRole(Meteor.user(), ['Líder']);
        }
    });
    Template.member_navigation.helpers({
        canModifyContent: function() {
            return Roles.userIsInRole(Meteor.user(), ['admin'])  ||
                   Roles.userIsInRole(Meteor.user(), ['Pastor']) ||
                   Roles.userIsInRole(Meteor.user(), ['Líder']);
        },
    });
    Template.list_messages.helpers({
        'messages': function() {
            return Messages.find();
        }
    });
    Template.edit_message.helpers({
        beforeRemove: function() {
            return function(collection, id) {
                var doc = collection.findOne(id);
                if (confirm('Deseja mesmo deletar a mensagem?')) {
                    this.remove();
                    Router.go('/memberCenter/messages');
                }
            };
        }
    });
    AutoForm.addHooks(['addMessage'], {
        onSuccess: function(operation, result, template) {
            FlashMessages.sendSuccess('Adicionado com sucesso!');
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}