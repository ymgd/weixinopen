module.exports = {
	getFavList: function() {
		var favList = [];
		var data = wx.getStorageSync('favlist');

		Object.keys(data).forEach(function(key) {
			favList.push({
				picurl: data[key].picurl,
				name: key,
				count: data[key].list.length
			});
		});

		return favList;
	}
}