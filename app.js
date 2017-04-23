var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/maps', {
        templateUrl: 'pages/maps.html',
        controller: 'mapController'
    })
    
    .when('/charts', {
        templateUrl: 'pages/charts.html',
        controller: 'chartController'
    })
});

var data = [{
   
   "path": [{
     "longitude": 38.4379674,
     "latitude":  -120.0049074,
     "title":"Ultica Reservoir"
   }]
 }, {
   
   "path": [{
     "longitude": 36.388676,
     "latitude": -120.828835,
    "title":"Hernandez Reservoir"
   }]
 }];


myApp.controller('mapController', ['$scope', '$log', function($scope, $log) {
    
    var mapOptions = {
       zoom: 6,
       center: new google.maps.LatLng(36, -120),
       mapTypeId: google.maps.MapTypeId.TERRAIN
     }

     $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

     $scope.markers = [];

     var infoWindow = new google.maps.InfoWindow();

     var createMarker = function(lat, lng, title) {

       var marker = new google.maps.Marker({
         map: $scope.map,
         position: new google.maps.LatLng(lat, lng),
         title:title
       });

       google.maps.event.addListener(marker, 'click', function() {
         infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
         infoWindow.open($scope.map, marker);
       });

       $scope.markers.push(marker);

     }

     for (i = 0; i < data.length; i++) {
       console.log(data[i]["path"][0]["longitude"], data[i]["path"][0]["latitude"], data[i]["path"][0]["title"]);
       createMarker(data[i]["path"][0]["longitude"], data[i]["path"][0]["latitude"], data[i]["path"][0]["title"]);
     }

     $scope.openInfoWindow = function(e, selectedMarker) {
       e.preventDefault();
       google.maps.event.trigger(selectedMarker, 'click');
     }
    
}]);

myApp.controller('chartController', ['$scope', '$log', function($scope, $log) {
    $scope.name = 'Chart';
}]);


