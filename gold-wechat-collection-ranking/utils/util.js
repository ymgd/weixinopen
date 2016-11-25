var RANK_TYPE = {
    '最热': 'hot',
    '最新': 'new'
}

function collectionRankTypeMap (rankType) {
    return RANK_TYPE[rankType]
}

var RANK_TYPE_2 = {
    '原创': 'http://user-ranking-api.ms.xitu.io/v1/getOriginalAuthorRanking?src=android',
    '分享': 'http://user-ranking-api.ms.xitu.io/v1/getShareRanking?src=android',
    '阅读': 'http://user-ranking-api.ms.xitu.io/v1/getReadRanking?src=android'
}

function rankTypeMap (rankType) {
    return RANK_TYPE_2[rankType]
}

module.exports = {
  collectionRankTypeMap: collectionRankTypeMap,
  rankTypeMap: rankTypeMap
}
