Page( {
  data: {
    datas: null,
    UserInfo: null,
    PostInfo: null,
    NodeInfo: null,
    Comment: null,
    loadingHidden: true,
    modalHidden: true,
  },
  onLoad: function( options ) {
    var that = this;
    if( options.postid != null ) {
      that.GetPost( options.postid )
    } else if( options.nodeid != null ) {
      that.GetNode( options.nodeid )
    } else if( options.userid != null ) {
      that.GetUser( options.userid )
    } else if( options.nodelist != null ) {
      that.GetNodes( options.nodelist )
    } else if( options.userlist != null ) {
      that.GetUsers( options.userlist )
    } else {

    }
  },
  GetNode: function( id ) {
    // 获取节点信息
    var that = this;
    that.setData( {
      loadingHidden: false,
      modalHidden: true,
    });
    wx.request( {
      url: "https://www.v2ex.com/api/nodes/show.json?id=" + id,
      success: function( data ) {
        that.setData( {
          NodeInfo: data.data,
          loadingHidden: true,
        })
      },
      fail: function( data ) {
        that.setData( {
          loadingHidden: true,
          modalHidden: false
        })
      }
    })
  },
  GetUser: function( id ) {
    // 获取用户信息
    var that = this;
    that.setData( {
      loadingHidden: false,
      modalHidden: true,
    });
    wx.request( {
      url: "https://www.v2ex.com/api/members/show.json?id=" + id,
      success: function( data ) {
        that.setData( {
          UserInfo: data.data,
          loadingHidden: true,
        })
      },
      fail: function( data ) {
        that.setData( {
          loadingHidden: true,
          modalHidden: false
        })
      }
    })
  },
  GetPost: function( id ) {
    // 获取主题信息
    var that = this;
    that.setData( {
      loadingHidden: false,
      modalHidden: true,
    });
    wx.request( {
      url: "https://www.v2ex.com/api/topics/show.json?id=" + id,
      success: function( data ) {
        that.setData( {
          PostInfo: data.data[ 0 ],
          loadingHidden: true,
        })
      },
      fail: function( data ) {
        that.setData( {
          loadingHidden: true,
          modalHidden: false
        })
      }

    });

  },
  GetNodes: function( id ) {
    // 获取节点List
    var that = this;
    that.setData( {
      loadingHidden: false,
      modalHidden: true,
    });
    wx.request( {
      url: "https://www.v2ex.com/api/topics/show.json?node_id=" + id,
      success: function( data ) {
        that.setData( {
          datas: data.data,
          loadingHidden: true,
        })
      },
      fail: function( data ) {
        that.setData( {
          loadingHidden: true,
          modalHidden: false
        })
      }
    })
  },
  GetUsers: function( username ) {
    // 获取用户List
    var that = this;
    that.setData( {
      loadingHidden: false,
      modalHidden: true,
    });
    wx.request( {
      url: "https://www.v2ex.com/api/topics/show.json?username=" + username,
      success: function( data ) {
        console.log( data.data );
        that.setData( {
          datas: data.data,
          loadingHidden: true,
        })
      },
      fail: function( data ) {
        that.setData( {
          loadingHidden: true,
          modalHidden: false
        })
      }
    })
  }
  ,
  NodeTopics: function( e ) {
    // 跳转到节点的主题列表
    wx.redirectTo( {
      url: "./detail?nodelist=" + e.currentTarget.id
    })
  },
  UserTopics: function( e ) {
    // 跳转到用户的主题列表
    wx.redirectTo( {
      url: "./detail?userlist=" + e.currentTarget.id
    })
  },
  RedirectNode: function( e ) {
    // 跳转到节点信息
    wx.redirectTo( {
      url: "./detail?nodeid=" + e.currentTarget.id
    })
  },
  RedirectUser: function( e ) {
    // 跳转到用户信息
    wx.redirectTo( {
      url: "./detail?userid=" + e.currentTarget.id
    })
  },
  Detail: function( e ) {
    //  查看主题
    wx.navigateTo( {
      url: './detail?postid=' + e.currentTarget.id,
    })
  },
})