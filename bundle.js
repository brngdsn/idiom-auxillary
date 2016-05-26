console.clear();

var clients = [
  {
    cid: 0,
    pcid: null,
    name: 'client0'
  },{
    cid: 1,
    pcid: null,
    name: 'client1'
  },{
    cid: 2,
    pcid: null,
    name: 'client2'
  },{
    cid: 3,
    pcid: null,
    name: 'client3'
  },{
    cid: 4,
    pcid: null,
    name: 'client4'
  },{
    cid: 5,
    pcid: 1,
    name: 'client5'
  },{
    cid: 6,
    pcid: 1,
    name: 'client6'
  },{
    cid: 7,
    pcid: 1,
    name: 'client7'
  },{
    cid: 8,
    pcid: 2,
    name: 'client8'
  },{
    cid: 9,
    pcid: 2,
    name: 'client9'
  },{
    cid: 10,
    pcid: 2,
    name: 'client10'
  },{
    cid: 11,
    pcid: 3,
    name: 'client11'
  },{
    cid: 12,
    pcid: 3,
    name: 'client12'
  },{
    cid: 13,
    pcid: 3,
    name: 'client13'
  },{
    cid: 14,
    pcid: 4,
    name: 'client14'
  },{
    cid: 15,
    pcid: 4,
    name: 'client15'
  },{
    cid: 16,
    pcid: 4,
    name: 'client16'
  },{
    cid: 17,
    pcid: 5,
    name: 'client17'
  },{
    cid: 18,
    pcid: 5,
    name: 'client18'
  },{
    cid: 19,
    pcid: 5,
    name: 'client19'
  },{
    cid: 20,
    pcid: 6,
    name: 'client20'
  },{
    cid: 21,
    pcid: 6,
    name: 'client21'
  },{
    cid: 22,
    pcid: 6,
    name: 'client22'
  },{
    cid: 23,
    pcid: 21,
    name: 'bank of america'
  },{
    cid: 24,
    pcid: 21,
    name: 'client24'
  },{
    cid: 25,
    pcid: 21,
    name: 'client25'
  },{
    cid: 26,
    pcid: 9,
    name: 'client26'
  }
];

function ClientsController ($scope) {
  
  // prepare each client object for composition
  var _clients = clients
    .map(function(client){
      client.numSelectedSubClients = 0;
      client.sclients = [];
      client.expanded = false;
      client.selected = false;
      return client;
    })
  ;
  
  // create a new array of nested clients and subclients
  $scope.clients = _clients
    .map(function(client){
      client.sclients = _clients.filter(function(c){
        return c.pcid === client.cid;
      });
      return client;
    })
    .filter(function(client){
      return !client.pcid;
    })
  ;
  
}

function ClientsTreeComponentController (numSubClients,numSelectedSubClients) {
  this.numSubClients = numSubClients;
  this.numSelectedSubClients = numSelectedSubClients;
}

angular
  .module('app',[])
  .controller('ClientsController',['$scope',ClientsController])
  .factory('numSubClients',[function(){
    return function numSubClients (client) {
      if (client.sclients.length === 0) {
        return 0;
      } else {
        var n = 0;
        client.sclients.forEach(function(c){
          n += numSubClients(c);
        });
        return client.sclients.length + n;
      }
    };
  }])
  .factory('numSelectedSubClients',[function(){
    return function numSelectedSubClients (client) {
      if (client.sclients.length === 0) {
        return 0;
      } else {
        var n = 0;
        client.sclients.forEach(function(c){
          if (c.selected) {
            n++;
          }
          n += numSelectedSubClients(c);
        })
        return n;
      }
    };
  }])
  .component('clientsTree',{
    bindings: {
      clients: '=',
      query: '='
    },
    templateUrl: 'clients.tmpl',
    controller: [
      'numSubClients',
      'numSelectedSubClients',
      ClientsTreeComponentController
    ]
  })
;
