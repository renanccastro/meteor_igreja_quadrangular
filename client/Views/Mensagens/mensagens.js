//Meteor.subscribe("messages");
Template.mensagens.helpers({
   'getDate': function(){
      return moment(this.date).format("[em] DD/MM/YYYY");
   },
   'getCount':function(){
      return Messages.find({}).count();
   },
   'messages':function(){
      return Messages.find({});
   }
});