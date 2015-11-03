Posts = new Mongo.Collection('posts');
Posts.initEasySearch('body');
Messages = new Mongo.Collection('messages');
Messages.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Título",
  },
  author: {
    type: String,
    label: "Autor"
  },
  data: {
    type: Date,
    label: "Data",
    optional: true
  },
  url: {
    type: String,
    label: "URL",
    optional: false
  }
}));

Recados = new Mongo.Collection('recados');
Recados.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Título"
  },
  data: {
    type: Date,
    label: "Data",
    optional: true
  },
  content: {
    type: String,
    label: "Conteúdo",
    optional: false,
    autoform: {
      rows: 10
    }
  },
  roles: {
    type: [String],
    label: "Grupos Alvo",
    allowedValues: _.pluck(Meteor.roles.find().fetch(), 'name')
  }
}));


Submissions = new Mongo.Collection('submissions');