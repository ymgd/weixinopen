module.exports = {
    host: "https://api2.lekongkong.com",
    getHomePageLayoutUrl: function() {
        return this.host + "/api/PageLayout.homePage";
    },
    getAdListUrl: function() {
        return this.host + "/api/Listing.listingByRegion";
    },
    getAdDetailUrl: function() {
        return this.host + "";
    },
    getApplicantorListUrl: function() {
        return this.host + "/api/ListingNew.getGiftApplicationsReader";
    },
    getHingTagListUrl: function() {
        return this.host + "/api/Search.hintTags";
    },
    getSeachListingUrl: function() {
        return this.host + "/api/Listing.searchListing";
    },
    getTagListingUrl: function() {
        return this.host + "/api/Listing.tagListing";
    },
    getLastestAdListingUrl: function() {
        return this.host + "/api/News.getNewsList";
    },
    defaultHeader: {
        "Lkk-Dev-Name": "madong",
        "BAPI-APP-KEY": "api_ioslekongkong",
        "BAPI-USER-TOKEN": "330",
        "UDID": "123123123123123123",
        "APP_VERSION": "1.1.2",
        "BAPI-HASH": "wozhishixiang@@shishi..zhengde_!!"
    },
    appVersion: "1.6.6"
}