const BASE_URL = "https://maydayapi.sinaapp.com/api/";
const BASE_OLD_URL = "https://maydayapi.sinaapp.com/index.php?c=";

const USER_LOGIN = BASE_URL + "user/get_token/";

const ALBUM_LIST = BASE_URL + "album/getlist/";
const ALBUM_DETAIL = BASE_URL + "album/getalbumdetail/";

module.exports = {
    VERSION: '0.0.1',
    USER_LOGIN: USER_LOGIN,
    ALBUM_LIST: ALBUM_LIST,
    ALBUM_DETAIL: ALBUM_DETAIL,
};
