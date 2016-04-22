define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  window.TheatersView = Backbone.View.extend({

    template: _.template($('#theaters').html()),

    initialize: function() {
      console.log('TheatersView Initialized');

      this.render();
    },

    render: function() {
      $(this.el).html(this.template());
      this.mapInit();
      return this;
    },

    mapInit: function() {
      var self = this;

      $(function() {
        var defaultLatLng = new google.maps.LatLng(40.7431473, -74.1805026);

        // Get user's current position
        if (navigator.geolocation) {
          function success(pos) {
            self.drawMap(new google.maps.LatLng(pos.coords.latitude,
              pos.coords.longitude));
          }
          function fail(error) {
            self.drawMap(defaultLatLng);
          }
          navigator.geolocation.getCurrentPosition(success, fail, {
            maximumAge: 500000,
            enableHighAccuracy: true,
            timeout: 6000
          });
        } else {
          self.drawMap(defaultLatLng);
        }
      });
    },

    drawMap: function(latlng) {
     var self = this;

     $(function() {
       var myOptions = {
         zoom: 12,
         center: latlng,
         streetViewControl: false,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       };

       self.map = new google.maps.Map(self.$el.find('#map-canvas')[0], myOptions);

       var blue_marker = 'images/gmaps/bluecircle.png';

       var marker = new google.maps.Marker({
         position: latlng,
         map: self.map,
         icon: blue_marker,
         animation: google.maps.Animation.DROP
       });

       $(document).on('pageshow', function() {
         var center = self.map.getCenter();
         google.maps.event.trigger(self.map, 'resize');
         self.map.setCenter(center);
       });

       google.maps.event.addListener(self.map, 'idle', function() {
         var mapBounds = self.map.getBounds();
         performSearch(mapBounds);
       });

       self.infoWindow = new google.maps.InfoWindow();
       self.service = new google.maps.places.PlacesService(self.map);

       function performSearch(bounds) {
         var request = {
           bounds: bounds,
           keyword: 'movie theater'
         };
         self.service.radarSearch(request, callback);
       } // end of performSearch function

       function callback(results, status) {
         if (status !== google.maps.places.PlacesServiceStatus.OK) {
           console.error(status);
           return;
         }
         for (var i = 0, result; result = results[i]; i++) {
           addMarker(result);
         }
       } // end of callback function

       function addMarker(place) {

         var m_icon = 'images/gmaps/movie_icon_2.png';

         // Create a marker for a place
         var marker = new google.maps.Marker({
           map: self.map,
           icon: m_icon,
           position: place.geometry.location
         });

         google.maps.event.addListener(marker, 'click', function() {

           // Save position of currently viewedp place
           org_lat = place.geometry.location.lat();
           org_lat = place.geometry.location.lng();

           self.service.getDetails(place, function(result, status) {
             if (status !== google.maps.places.PlacesServiceStatus.OK) {
               console.error(status);
               return;
             }

             // Close all instances of infoWindow before opening a new one
             self.infoWindow.close();

             // Display information about a movie theater in an infoWindow
             var info = '<b><u>' + result.name + '</u></b><br >';
             info = info.concat('<b>Address:</b> ' + result.vicinity + '<br />')
             if (result.rating) {
               info = info.concat('<b>Rating:</b> ' + result.rating + '<br />');
             }
             info = info.concat('<b><a href="' + result.website + '">Website</a></b><br />');
             self.infoWindow.setContent(info);
             self.infoWindow.open(self.map, marker);
           });
         });

         // Close the infoWindow when clicked on the map, outside of
         // the infoWindow
         google.maps.event.addListener(self.map, 'click', function() {
           self.infoWindow.close();
         });
       } // end of addMarker function

     });
   }
  });
});
