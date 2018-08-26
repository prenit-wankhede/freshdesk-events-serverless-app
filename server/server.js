var request = require('request');
var handler = require('./lib/handle-response');

var logEventData = function(args) {
  console.log(args['event'], 'Event triggered on Freshdesk.');
  console.log('Making a POST request to', args['iparams']['backendAppName'], 'Backend App with data:');
  console.log(JSON.stringify(args));  
};

exports = {

  events: [
    { event: "onAppInstall", callback: "onAppInstallHandler" },
    { event: "onAppUninstall", callback: "onAppUninstallHandler" },
    { event: 'onTicketCreate', callback: 'onTicketCreateHandler' },
    { event: "onTicketUpdate", callback: "onTicketUpdateHandler" },
    { event: "onContactCreate", callback: "onContactCreateHandler" },
    { event: "onContactUpdate", callback: "onContactUpdateHandler" },
    { event: "onConversationCreate", callback: "onConversationCreateHandler" }
  ],

  // args is a JSON block containing the args information.
  // args['iparams'] will contain the installation parameter values.


  onAppInstallHandler: function(args) {
    logEventData(args); 
    
    var url = args['iparams']['appInstallWebhookUrl'];
    if(!url) {
      console.log('No webhook url configured for', args['event'], 'event. Not triggering', args['iparams']['backendAppName'] , 'backed app webhook', '\n');
      return;
    }
    
    request.post({url: url, body: args, json: true}, function (error, response, body) {
      if(error) {
        // If there is an error during the setup, shopw error
        renderData({message: error});
      }
      handler.handleResponse.onAppInstall(error, response, body, args);
      // If the setup is successful
      renderData();
    });
  },

  onAppUninstallHandler: function(args) {
    logEventData(args); 
    
    var url = args['iparams']['appUninstallWebhookUrl'];
    if(!url) {
      console.log('No webhook url configured for', args['event'], 'event. Not triggering', args['iparams']['backendAppName'] , 'backed app webhook', '\n');
      return;
    }
    
    request.post({url: url, body: args, json: true}, function (error, response, body) {
      if(error) {
        // If there is an error during the setup, shopw error
        renderData({message: error});
      }
      handler.handleResponse.onAppUninstall(error, response, body, args);
      // If the setup is successful
      renderData();
    });
  },

  onTicketCreateHandler: function(args) {
    logEventData(args);
    
    var url = args['iparams']['ticketCreatedWebhookUrl'];
    if(!url) {
      console.log('No webhook url configured for', args['event'], 'event. Not triggering', args['iparams']['backendAppName'] , 'backed app webhook', '\n');
      return;
    }

    request.post({url: url, body: args, json: true}, function (error, response, body) {
      handler.handleResponse.onTicketCreated(error, response, body, args);
    });
  },

  onTicketUpdateHandler: function(args) {
    logEventData(args);
    
    var url = args['iparams']['ticketUpdatedWebhookUrl'];
    if(!url) {
      console.log('No webhook url configured for', args['event'], 'event. Not triggering', args['iparams']['backendAppName'] , 'backed app webhook', '\n');
      return;
    }

    request.post({url: url, body: args, json: true}, function (error, response, body) {
      handler.handleResponse.onTicketUpdated(error, response, body, args);
    });
  },

  onContactCreateHandler: function(args) {
    logEventData(args);
    
    var url = args['iparams']['contactCreatedWebhookUrl'];
    if(!url) {
      console.log('No webhook url configured for', args['event'], 'event. Not triggering', args['iparams']['backendAppName'] , 'backed app webhook', '\n');
      return;
    }

    request.post({url: url, body: args, json: true}, function (error, response, body) {
      handler.handleResponse.onContactCreated(error, response, body, args);
    });
  },
  
  onContactUpdateHandler: function(args) {
    logEventData(args);
    
    var url = args['iparams']['contactUpdatedWebhookUrl'];
    if(!url) {
      console.log('No webhook url configured for', args['event'], 'event. Not triggering', args['iparams']['backendAppName'] , 'backed app webhook', '\n');
      return;
    }

    request.post({url: url, body: args, json: true}, function (error, response, body) {
      handler.handleResponse.onContactUpdated(error, response, body, args);
    });
  },

  onConversationCreateHandler: function(args) {
    logEventData(args);
    
    var url = args['iparams']['conversationCreatedWebhookUrl'];
    if(!url) {
      console.log('No webhook url configured for', args['event'], 'event. Not triggering', args['iparams']['backendAppName'] , 'backed app webhook', '\n');
      return;
    }

    request.post({url: url, body: args, json: true}, function (error, response, body) {
      handler.handleResponse.onConversationCreated(error, response, body, args);
    });
  }

};