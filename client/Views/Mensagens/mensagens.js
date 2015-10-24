Template.mensagens.helpers({
   'getDate': function(){
      return moment(this.date).format("[em] DD/MM/YYYY");
   }
});