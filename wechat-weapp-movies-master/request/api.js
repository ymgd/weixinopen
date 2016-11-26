/**
 * Created by LLhon on 2016/10/19.
 */

//ES6标准: const关键字来定义常量, const具有块级作用域.
const BASE_URL = "https://api.douban.com/v2/";

/**
 * 获取电影列表URL
 * @returns {string}
 */
function getMoviesListUrl() {
    return BASE_URL.concat("movie/top250");
}
/**
 * 获取电影详情URL
 * @param id
 * @returns {string}
 */
function getMovieDetailUrl(id) {
    return BASE_URL.concat("movie/subject/" + id);
}
/**
 * 获取正在上映URL
 * @returns {string}
 */
function getInTheatersUrl() {
    return BASE_URL.concat("movie/in_theaters");
}

function getLeadWorksUrl(castId){
    return BASE_URL.concat(`movie/celebrity/${castId}`); //'...' 模板字符串:ES6新标准, 会自动替换字符串中的变量.
}



module.exports = {
    BASE_URL, getMoviesListUrl, getMovieDetailUrl, getInTheatersUrl, getLeadWorksUrl
}