var requests = require( '../../requests/request.js' );

Page({
  data:{
    activityId: ''
  },

  onLoad: function(options) {
  		var _this = this;
      console.log('html5 page onLoad..options='+options.id)
      
      _this.setData( { 
      	activityId: options.id
      });
  },

	onReady: function() {
		var _this = this;	
    console.log("html5 page ...onReady..activityId="+_this.data.activityId)
  }
  
  
})