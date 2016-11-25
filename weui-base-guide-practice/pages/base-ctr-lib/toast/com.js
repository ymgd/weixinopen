function setup(page){
  var com = page.data.com
  var op = {
      tap: {
          action_sheet: function(){
              com['action_sheet']['hidden'] = !com['action_sheet']['hidden']
          },
          modal: function(){
              com['modal']['hidden'] = false
          },
          modal2: function(){
              com['modal2']['hidden'] = false
          },
          toast1: function(){
              com['toast1']['hidden'] = false
          },
          toast2: function(){
              com['toast2']['hidden'] = false
          },
          loading: function(){
              com['loading']['hidden'] = false
              setTimeout(function(){
                  com['loading']['hidden'] = true
                  page.setData({com: com})
              }, 1500)
          }
      },

      change: {
          action_sheet: function(){
              com['action_sheet']['hidden'] = !com['action_sheet']['hidden']
          },
          modal: function(){
              com['modal']['hidden'] = true
          },
          modal2: function(){
              com['modal2']['hidden'] = true
          },
          toast1: function() {
              com[ 'toast1' ][ 'hidden' ] = true
          },
          toast2: function() {
              com[ 'toast2' ][ 'hidden' ] = true
          },
          loading: function(){
              com['loading']['hidden'] = true
          }
      }
  }

  return {
      tap: function( name ) {
          op[ 'tap' ][ name ]()
          page.setData( { com: com })
      },

      change: function( name ) {
          op[ 'change' ][ name ]()
          page.setData( { com: com })
      }
  }
}

module.exports = {
  setup: setup
}