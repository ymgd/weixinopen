const doubanUrl = "https://api.douban.com/v2/book/"; 
module.exports = { getBookById:doubanUrl,searchBook: doubanUrl + "search", getBookList: doubanUrl + "series/:id/books" }