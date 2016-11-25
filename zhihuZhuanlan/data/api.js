/**
 * api分析来自 
 * https://github.com/marktony/zhuanlan/wiki
 */

const HOST = "https://zhuanlan.zhihu.com/api";
let Util = getApp().Util;

export default class  API {

     /**
     * 获得推荐栏目
     */
    static getRecommendColumns(limit,offset){
          let seed =  Math.floor(100 * Math.random());
          return Util.net.getJson(`${HOST}/recommendations/columns`,{limit : limit , offset : offset , seed : seed});    
    }

    /**
     * 获得推荐文章
     */
    static getRecommendPosts(limit,offset){
          let seed =  Math.floor(100 * Math.random());
          return Util.net.getJson(`${HOST}/recommendations/posts`,{limit : limit , offset : offset , seed : seed});    
    }


    /**
     * 获取指定的专栏信息
     */
    static getColumnsBySlug(slug){
        return Util.net.getJson(`${HOST}/columns/${slug}`,{});    
    }
    

    /**
     * 获取指定的专栏文章列表
     */
    static getPostsBySlug(slug,limit,offset){
        return Util.net.getJson(`${HOST}/columns/${slug}/posts`,{limit : limit , offset : offset});    
    }



     /**
     * 获取文章详情页
     */
    static getPostDetailBySlug(slug){
        return Util.net.getJson(`${HOST}/posts/${slug}/contributed`,{});    
    }

    /**
     * 获取评论
     */
    static getPostCommentsBySlug(slug,limit,offset){
        return Util.net.getJson(`${HOST}/posts/${slug}/comments`,{limit : limit,offset : offset});    
    }



    

    



} 