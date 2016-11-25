//chengyu.js
//获取应用实例
var app = getApp();
Page({
  data:{
    showLoading:false,
    showToast:false,
    bushouDatas:[
{
id: "1",
bihua: "1",
bushou: "丨"
},
{
id: "2",
bihua: "1",
bushou: "亅"
},
{
id: "3",
bihua: "1",
bushou: "丿"
},
{
id: "4",
bihua: "1",
bushou: "乛"
},
{
id: "5",
bihua: "1",
bushou: "一"
},
{
id: "6",
bihua: "1",
bushou: "乙"
},
{
id: "7",
bihua: "1",
bushou: "乚"
},
{
id: "8",
bihua: "1",
bushou: "丶"
},
{
id: "9",
bihua: "2",
bushou: "八"
},
{
id: "10",
bihua: "2",
bushou: "勹"
},
{
id: "11",
bihua: "2",
bushou: "匕"
},
{
id: "12",
bihua: "2",
bushou: "冫"
},
{
id: "13",
bihua: "2",
bushou: "卜"
},
{
id: "14",
bihua: "2",
bushou: "厂"
},
{
id: "15",
bihua: "2",
bushou: "刀"
},
{
id: "16",
bihua: "2",
bushou: "刂"
},
{
id: "17",
bihua: "2",
bushou: "儿"
},
{
id: "18",
bihua: "2",
bushou: "二"
},
{
id: "19",
bihua: "2",
bushou: "匚"
},
{
id: "20",
bihua: "2",
bushou: "阝"
},
{
id: "21",
bihua: "2",
bushou: "丷"
},
{
id: "22",
bihua: "2",
bushou: "几"
},
{
id: "23",
bihua: "2",
bushou: "卩"
},
{
id: "24",
bihua: "2",
bushou: "冂"
},
{
id: "25",
bihua: "2",
bushou: "力"
},
{
id: "26",
bihua: "2",
bushou: "冖"
},
{
id: "27",
bihua: "2",
bushou: "凵"
},
{
id: "28",
bihua: "2",
bushou: "人"
},
{
id: "29",
bihua: "2",
bushou: "亻"
},
{
id: "30",
bihua: "2",
bushou: "入"
},
{
id: "31",
bihua: "2",
bushou: "十"
},
{
id: "32",
bihua: "2",
bushou: "厶"
},
{
id: "33",
bihua: "2",
bushou: "亠"
},
{
id: "34",
bihua: "2",
bushou: "匸"
},
{
id: "35",
bihua: "2",
bushou: "讠"
},
{
id: "36",
bihua: "2",
bushou: "廴"
},
{
id: "37",
bihua: "2",
bushou: "又"
},
{
id: "38",
bihua: "3",
bushou: "艹"
},
{
id: "39",
bihua: "3",
bushou: "屮"
},
{
id: "40",
bihua: "3",
bushou: "彳"
},
{
id: "41",
bihua: "3",
bushou: "巛"
},
{
id: "42",
bihua: "3",
bushou: "川"
},
{
id: "43",
bihua: "3",
bushou: "辶"
},
{
id: "44",
bihua: "3",
bushou: "寸"
},
{
id: "45",
bihua: "3",
bushou: "大"
},
{
id: "46",
bihua: "3",
bushou: "飞"
},
{
id: "47",
bihua: "3",
bushou: "干"
},
{
id: "48",
bihua: "3",
bushou: "工"
},
{
id: "49",
bihua: "3",
bushou: "弓"
},
{
id: "50",
bihua: "3",
bushou: "廾"
},
{
id: "51",
bihua: "3",
bushou: "广"
},
{
id: "52",
bihua: "3",
bushou: "己"
},
{
id: "53",
bihua: "3",
bushou: "彐"
},
{
id: "54",
bihua: "3",
bushou: "彑"
},
{
id: "55",
bihua: "3",
bushou: "巾"
},
{
id: "56",
bihua: "3",
bushou: "口"
},
{
id: "57",
bihua: "3",
bushou: "马"
},
{
id: "58",
bihua: "3",
bushou: "门"
},
{
id: "59",
bihua: "3",
bushou: "宀"
},
{
id: "60",
bihua: "3",
bushou: "女"
},
{
id: "61",
bihua: "3",
bushou: "犭"
},
{
id: "62",
bihua: "3",
bushou: "山"
},
{
id: "63",
bihua: "3",
bushou: "彡"
},
{
id: "64",
bihua: "3",
bushou: "尸"
},
{
id: "65",
bihua: "3",
bushou: "饣"
},
{
id: "66",
bihua: "3",
bushou: "士"
},
{
id: "67",
bihua: "3",
bushou: "扌"
},
{
id: "68",
bihua: "3",
bushou: "氵"
},
{
id: "69",
bihua: "3",
bushou: "纟"
},
{
id: "70",
bihua: "3",
bushou: "巳"
},
{
id: "71",
bihua: "3",
bushou: "土"
},
{
id: "72",
bihua: "3",
bushou: "囗"
},
{
id: "73",
bihua: "3",
bushou: "兀"
},
{
id: "74",
bihua: "3",
bushou: "夕"
},
{
id: "75",
bihua: "3",
bushou: "小"
},
{
id: "76",
bihua: "3",
bushou: "忄"
},
{
id: "77",
bihua: "3",
bushou: "幺"
},
{
id: "78",
bihua: "3",
bushou: "弋"
},
{
id: "79",
bihua: "3",
bushou: "尢"
},
{
id: "80",
bihua: "3",
bushou: "夂"
},
{
id: "81",
bihua: "3",
bushou: "子"
},
{
id: "82",
bihua: "4",
bushou: "贝"
},
{
id: "83",
bihua: "4",
bushou: "比"
},
{
id: "84",
bihua: "4",
bushou: "灬"
},
{
id: "85",
bihua: "4",
bushou: "长"
},
{
id: "86",
bihua: "4",
bushou: "车"
},
{
id: "87",
bihua: "4",
bushou: "歹"
},
{
id: "88",
bihua: "4",
bushou: "斗"
},
{
id: "89",
bihua: "4",
bushou: "厄"
},
{
id: "90",
bihua: "4",
bushou: "方"
},
{
id: "91",
bihua: "4",
bushou: "风"
},
{
id: "92",
bihua: "4",
bushou: "父"
},
{
id: "93",
bihua: "4",
bushou: "戈"
},
{
id: "94",
bihua: "4",
bushou: "卝"
},
{
id: "95",
bihua: "4",
bushou: "户"
},
{
id: "96",
bihua: "4",
bushou: "火"
},
{
id: "97",
bihua: "4",
bushou: "旡"
},
{
id: "98",
bihua: "4",
bushou: "见"
},
{
id: "99",
bihua: "4",
bushou: "斤"
},
{
id: "100",
bihua: "4",
bushou: "耂"
},
{
id: "101",
bihua: "4",
bushou: "毛"
},
{
id: "102",
bihua: "4",
bushou: "木"
},
{
id: "103",
bihua: "4",
bushou: "肀"
},
{
id: "104",
bihua: "4",
bushou: "牛"
},
{
id: "105",
bihua: "4",
bushou: "牜"
},
{
id: "106",
bihua: "4",
bushou: "爿"
},
{
id: "107",
bihua: "4",
bushou: "片"
},
{
id: "108",
bihua: "4",
bushou: "攴"
},
{
id: "109",
bihua: "4",
bushou: "攵"
},
{
id: "110",
bihua: "4",
bushou: "气"
},
{
id: "111",
bihua: "4",
bushou: "欠"
},
{
id: "112",
bihua: "4",
bushou: "犬"
},
{
id: "113",
bihua: "4",
bushou: "日"
},
{
id: "114",
bihua: "4",
bushou: "氏"
},
{
id: "115",
bihua: "4",
bushou: "礻"
},
{
id: "116",
bihua: "4",
bushou: "手"
},
{
id: "117",
bihua: "4",
bushou: "殳"
},
{
id: "118",
bihua: "4",
bushou: "水"
},
{
id: "119",
bihua: "4",
bushou: "瓦"
},
{
id: "120",
bihua: "4",
bushou: "尣"
},
{
id: "121",
bihua: "4",
bushou: "王"
},
{
id: "122",
bihua: "4",
bushou: "韦"
},
{
id: "123",
bihua: "4",
bushou: "文"
},
{
id: "124",
bihua: "4",
bushou: "毋"
},
{
id: "125",
bihua: "4",
bushou: "心"
},
{
id: "126",
bihua: "4",
bushou: "牙"
},
{
id: "127",
bihua: "4",
bushou: "爻"
},
{
id: "128",
bihua: "4",
bushou: "曰"
},
{
id: "129",
bihua: "4",
bushou: "月"
},
{
id: "130",
bihua: "4",
bushou: "爫"
},
{
id: "131",
bihua: "4",
bushou: "支"
},
{
id: "132",
bihua: "4",
bushou: "止"
},
{
id: "133",
bihua: "4",
bushou: "爪"
},
{
id: "134",
bihua: "5",
bushou: "白"
},
{
id: "135",
bihua: "5",
bushou: "癶"
},
{
id: "136",
bihua: "5",
bushou: "歺"
},
{
id: "137",
bihua: "5",
bushou: "甘"
},
{
id: "138",
bihua: "5",
bushou: "瓜"
},
{
id: "139",
bihua: "5",
bushou: "禾"
},
{
id: "140",
bihua: "5",
bushou: "钅"
},
{
id: "141",
bihua: "5",
bushou: "立"
},
{
id: "142",
bihua: "5",
bushou: "龙"
},
{
id: "143",
bihua: "5",
bushou: "矛"
},
{
id: "144",
bihua: "5",
bushou: "皿"
},
{
id: "145",
bihua: "5",
bushou: "母"
},
{
id: "146",
bihua: "5",
bushou: "目"
},
{
id: "147",
bihua: "5",
bushou: "疒"
},
{
id: "148",
bihua: "5",
bushou: "鸟"
},
{
id: "149",
bihua: "5",
bushou: "皮"
},
{
id: "150",
bihua: "5",
bushou: "生"
},
{
id: "151",
bihua: "5",
bushou: "石"
},
{
id: "152",
bihua: "5",
bushou: "矢"
},
{
id: "153",
bihua: "5",
bushou: "示"
},
{
id: "154",
bihua: "5",
bushou: "罒"
},
{
id: "155",
bihua: "5",
bushou: "田"
},
{
id: "156",
bihua: "5",
bushou: "玄"
},
{
id: "157",
bihua: "5",
bushou: "穴"
},
{
id: "158",
bihua: "5",
bushou: "疋"
},
{
id: "159",
bihua: "5",
bushou: "业"
},
{
id: "160",
bihua: "5",
bushou: "衤"
},
{
id: "161",
bihua: "5",
bushou: "用"
},
{
id: "162",
bihua: "5",
bushou: "玉"
},
{
id: "163",
bihua: "6",
bushou: "耒"
},
{
id: "164",
bihua: "6",
bushou: "艸"
},
{
id: "165",
bihua: "6",
bushou: "臣"
},
{
id: "166",
bihua: "6",
bushou: "虫"
},
{
id: "167",
bihua: "6",
bushou: "而"
},
{
id: "168",
bihua: "6",
bushou: "耳"
},
{
id: "169",
bihua: "6",
bushou: "缶"
},
{
id: "170",
bihua: "6",
bushou: "艮"
},
{
id: "171",
bihua: "6",
bushou: "虍"
},
{
id: "172",
bihua: "6",
bushou: "臼"
},
{
id: "173",
bihua: "6",
bushou: "米"
},
{
id: "174",
bihua: "6",
bushou: "齐"
},
{
id: "175",
bihua: "6",
bushou: "肉"
},
{
id: "176",
bihua: "6",
bushou: "色"
},
{
id: "177",
bihua: "6",
bushou: "舌"
},
{
id: "178",
bihua: "6",
bushou: "覀"
},
{
id: "179",
bihua: "6",
bushou: "页"
},
{
id: "180",
bihua: "6",
bushou: "先"
},
{
id: "181",
bihua: "6",
bushou: "行"
},
{
id: "182",
bihua: "6",
bushou: "血"
},
{
id: "183",
bihua: "6",
bushou: "羊"
},
{
id: "184",
bihua: "6",
bushou: "聿"
},
{
id: "185",
bihua: "6",
bushou: "至"
},
{
id: "186",
bihua: "6",
bushou: "舟"
},
{
id: "187",
bihua: "6",
bushou: "衣"
},
{
id: "188",
bihua: "6",
bushou: "竹"
},
{
id: "189",
bihua: "6",
bushou: "自"
},
{
id: "190",
bihua: "6",
bushou: "羽"
},
{
id: "191",
bihua: "6",
bushou: "糸"
},
{
id: "192",
bihua: "6",
bushou: "糹"
},
{
id: "193",
bihua: "7",
bushou: "貝"
},
{
id: "194",
bihua: "7",
bushou: "采"
},
{
id: "195",
bihua: "7",
bushou: "镸"
},
{
id: "196",
bihua: "7",
bushou: "車"
},
{
id: "197",
bihua: "7",
bushou: "辰"
},
{
id: "198",
bihua: "7",
bushou: "赤"
},
{
id: "199",
bihua: "7",
bushou: "辵"
},
{
id: "200",
bihua: "7",
bushou: "豆"
},
{
id: "201",
bihua: "7",
bushou: "谷"
},
{
id: "202",
bihua: "7",
bushou: "見"
},
{
id: "203",
bihua: "7",
bushou: "角"
},
{
id: "204",
bihua: "7",
bushou: "克"
},
{
id: "205",
bihua: "7",
bushou: "里"
},
{
id: "206",
bihua: "7",
bushou: "卤"
},
{
id: "207",
bihua: "7",
bushou: "麦"
},
{
id: "208",
bihua: "7",
bushou: "身"
},
{
id: "209",
bihua: "7",
bushou: "豕"
},
{
id: "210",
bihua: "7",
bushou: "辛"
},
{
id: "211",
bihua: "7",
bushou: "言"
},
{
id: "212",
bihua: "7",
bushou: "邑"
},
{
id: "213",
bihua: "7",
bushou: "酉"
},
{
id: "214",
bihua: "7",
bushou: "豸"
},
{
id: "215",
bihua: "7",
bushou: "走"
},
{
id: "216",
bihua: "7",
bushou: "足"
},
{
id: "217",
bihua: "8",
bushou: "青"
},
{
id: "218",
bihua: "8",
bushou: "靑"
},
{
id: "219",
bihua: "8",
bushou: "雨"
},
{
id: "220",
bihua: "8",
bushou: "齿"
},
{
id: "221",
bihua: "8",
bushou: "長"
},
{
id: "222",
bihua: "8",
bushou: "非"
},
{
id: "223",
bihua: "8",
bushou: "阜"
},
{
id: "224",
bihua: "8",
bushou: "金"
},
{
id: "225",
bihua: "8",
bushou: "釒"
},
{
id: "226",
bihua: "8",
bushou: "隶"
},
{
id: "227",
bihua: "8",
bushou: "門"
},
{
id: "228",
bihua: "8",
bushou: "靣"
},
{
id: "229",
bihua: "8",
bushou: "飠"
},
{
id: "230",
bihua: "8",
bushou: "鱼"
},
{
id: "231",
bihua: "8",
bushou: "隹"
},
{
id: "232",
bihua: "9",
bushou: "風"
},
{
id: "233",
bihua: "9",
bushou: "革"
},
{
id: "234",
bihua: "9",
bushou: "骨"
},
{
id: "235",
bihua: "9",
bushou: "鬼"
},
{
id: "236",
bihua: "9",
bushou: "韭"
},
{
id: "237",
bihua: "9",
bushou: "面"
},
{
id: "238",
bihua: "9",
bushou: "首"
},
{
id: "239",
bihua: "9",
bushou: "韋"
},
{
id: "240",
bihua: "9",
bushou: "香"
},
{
id: "241",
bihua: "9",
bushou: "頁"
},
{
id: "242",
bihua: "9",
bushou: "音"
},
{
id: "243",
bihua: "10",
bushou: "髟"
},
{
id: "244",
bihua: "10",
bushou: "鬯"
},
{
id: "245",
bihua: "10",
bushou: "鬥"
},
{
id: "246",
bihua: "10",
bushou: "高"
},
{
id: "247",
bihua: "10",
bushou: "鬲"
},
{
id: "248",
bihua: "10",
bushou: "馬"
},
{
id: "249",
bihua: "11",
bushou: "黄"
},
{
id: "250",
bihua: "11",
bushou: "鹵"
},
{
id: "251",
bihua: "11",
bushou: "鹿"
},
{
id: "252",
bihua: "11",
bushou: "麻"
},
{
id: "253",
bihua: "11",
bushou: "麥"
},
{
id: "254",
bihua: "11",
bushou: "鳥"
},
{
id: "255",
bihua: "11",
bushou: "魚"
},
{
id: "256",
bihua: "12",
bushou: "鼎"
},
{
id: "257",
bihua: "12",
bushou: "黑"
},
{
id: "258",
bihua: "12",
bushou: "黽"
},
{
id: "259",
bihua: "12",
bushou: "黍"
},
{
id: "260",
bihua: "12",
bushou: "黹"
},
{
id: "261",
bihua: "13",
bushou: "鼓"
},
{
id: "262",
bihua: "13",
bushou: "鼠"
},
{
id: "263",
bihua: "14",
bushou: "鼻"
},
{
id: "264",
bihua: "14",
bushou: "齊"
},
{
id: "265",
bihua: "15",
bushou: "齒"
},
{
id: "266",
bihua: "15",
bushou: "龍"
},
{
id: "267",
bihua: "15",
bushou: "龠"
}
],
    pinyinDatas:[
{
id: "1",
pinyin_key: "A",
pinyin: "a"
},
{
id: "2",
pinyin_key: "A",
pinyin: "ai"
},
{
id: "3",
pinyin_key: "A",
pinyin: "an"
},
{
id: "4",
pinyin_key: "A",
pinyin: "ang"
},
{
id: "5",
pinyin_key: "A",
pinyin: "ao"
},
{
id: "6",
pinyin_key: "B",
pinyin: "ba"
},
{
id: "7",
pinyin_key: "B",
pinyin: "bai"
},
{
id: "8",
pinyin_key: "B",
pinyin: "ban"
},
{
id: "9",
pinyin_key: "B",
pinyin: "bang"
},
{
id: "10",
pinyin_key: "B",
pinyin: "bao"
},
{
id: "11",
pinyin_key: "B",
pinyin: "bei"
},
{
id: "12",
pinyin_key: "B",
pinyin: "ben"
},
{
id: "13",
pinyin_key: "B",
pinyin: "beng"
},
{
id: "14",
pinyin_key: "B",
pinyin: "bi"
},
{
id: "15",
pinyin_key: "B",
pinyin: "bian"
},
{
id: "16",
pinyin_key: "B",
pinyin: "biao"
},
{
id: "17",
pinyin_key: "B",
pinyin: "bie"
},
{
id: "18",
pinyin_key: "B",
pinyin: "bin"
},
{
id: "19",
pinyin_key: "B",
pinyin: "bing"
},
{
id: "20",
pinyin_key: "B",
pinyin: "bo"
},
{
id: "21",
pinyin_key: "B",
pinyin: "bu"
},
{
id: "22",
pinyin_key: "C",
pinyin: "ca"
},
{
id: "23",
pinyin_key: "C",
pinyin: "cai"
},
{
id: "24",
pinyin_key: "C",
pinyin: "can"
},
{
id: "25",
pinyin_key: "C",
pinyin: "cang"
},
{
id: "26",
pinyin_key: "C",
pinyin: "cao"
},
{
id: "27",
pinyin_key: "C",
pinyin: "ce"
},
{
id: "28",
pinyin_key: "C",
pinyin: "cen"
},
{
id: "29",
pinyin_key: "C",
pinyin: "ceng"
},
{
id: "30",
pinyin_key: "C",
pinyin: "cha"
},
{
id: "31",
pinyin_key: "C",
pinyin: "chai"
},
{
id: "32",
pinyin_key: "C",
pinyin: "chan"
},
{
id: "33",
pinyin_key: "C",
pinyin: "chang"
},
{
id: "34",
pinyin_key: "C",
pinyin: "chao"
},
{
id: "35",
pinyin_key: "C",
pinyin: "che"
},
{
id: "36",
pinyin_key: "C",
pinyin: "chen"
},
{
id: "37",
pinyin_key: "C",
pinyin: "cheng"
},
{
id: "38",
pinyin_key: "C",
pinyin: "chi"
},
{
id: "39",
pinyin_key: "C",
pinyin: "chong"
},
{
id: "40",
pinyin_key: "C",
pinyin: "chou"
},
{
id: "41",
pinyin_key: "C",
pinyin: "chu"
},
{
id: "42",
pinyin_key: "C",
pinyin: "chua"
},
{
id: "43",
pinyin_key: "C",
pinyin: "chuai"
},
{
id: "44",
pinyin_key: "C",
pinyin: "chuan"
},
{
id: "45",
pinyin_key: "C",
pinyin: "chuang"
},
{
id: "46",
pinyin_key: "C",
pinyin: "chui"
},
{
id: "47",
pinyin_key: "C",
pinyin: "chun"
},
{
id: "48",
pinyin_key: "C",
pinyin: "chuo"
},
{
id: "49",
pinyin_key: "C",
pinyin: "ci"
},
{
id: "50",
pinyin_key: "C",
pinyin: "cong"
},
{
id: "51",
pinyin_key: "C",
pinyin: "cou"
},
{
id: "52",
pinyin_key: "C",
pinyin: "cu"
},
{
id: "53",
pinyin_key: "C",
pinyin: "cuan"
},
{
id: "54",
pinyin_key: "C",
pinyin: "cui"
},
{
id: "55",
pinyin_key: "C",
pinyin: "cun"
},
{
id: "56",
pinyin_key: "C",
pinyin: "cuo"
},
{
id: "57",
pinyin_key: "D",
pinyin: "da"
},
{
id: "58",
pinyin_key: "D",
pinyin: "dai"
},
{
id: "59",
pinyin_key: "D",
pinyin: "dan"
},
{
id: "60",
pinyin_key: "D",
pinyin: "dang"
},
{
id: "61",
pinyin_key: "D",
pinyin: "dao"
},
{
id: "62",
pinyin_key: "D",
pinyin: "de"
},
{
id: "63",
pinyin_key: "D",
pinyin: "den"
},
{
id: "64",
pinyin_key: "D",
pinyin: "dei"
},
{
id: "65",
pinyin_key: "D",
pinyin: "deng"
},
{
id: "66",
pinyin_key: "D",
pinyin: "di"
},
{
id: "67",
pinyin_key: "D",
pinyin: "dia"
},
{
id: "68",
pinyin_key: "D",
pinyin: "dian"
},
{
id: "69",
pinyin_key: "D",
pinyin: "diao"
},
{
id: "70",
pinyin_key: "D",
pinyin: "die"
},
{
id: "71",
pinyin_key: "D",
pinyin: "ding"
},
{
id: "72",
pinyin_key: "D",
pinyin: "diu"
},
{
id: "73",
pinyin_key: "D",
pinyin: "dong"
},
{
id: "74",
pinyin_key: "D",
pinyin: "dou"
},
{
id: "75",
pinyin_key: "D",
pinyin: "du"
},
{
id: "76",
pinyin_key: "D",
pinyin: "duan"
},
{
id: "77",
pinyin_key: "D",
pinyin: "dui"
},
{
id: "78",
pinyin_key: "D",
pinyin: "dun"
},
{
id: "79",
pinyin_key: "D",
pinyin: "duo"
},
{
id: "80",
pinyin_key: "E",
pinyin: "e"
},
{
id: "81",
pinyin_key: "E",
pinyin: "ei"
},
{
id: "82",
pinyin_key: "E",
pinyin: "en"
},
{
id: "83",
pinyin_key: "E",
pinyin: "eng"
},
{
id: "84",
pinyin_key: "E",
pinyin: "er"
},
{
id: "85",
pinyin_key: "F",
pinyin: "fa"
},
{
id: "86",
pinyin_key: "F",
pinyin: "fan"
},
{
id: "87",
pinyin_key: "F",
pinyin: "fang"
},
{
id: "88",
pinyin_key: "F",
pinyin: "fei"
},
{
id: "89",
pinyin_key: "F",
pinyin: "fen"
},
{
id: "90",
pinyin_key: "F",
pinyin: "feng"
},
{
id: "91",
pinyin_key: "F",
pinyin: "fo"
},
{
id: "92",
pinyin_key: "F",
pinyin: "fou"
},
{
id: "93",
pinyin_key: "F",
pinyin: "fu"
},
{
id: "94",
pinyin_key: "G",
pinyin: "ga"
},
{
id: "95",
pinyin_key: "G",
pinyin: "gai"
},
{
id: "96",
pinyin_key: "G",
pinyin: "gan"
},
{
id: "97",
pinyin_key: "G",
pinyin: "gang"
},
{
id: "98",
pinyin_key: "G",
pinyin: "gao"
},
{
id: "99",
pinyin_key: "G",
pinyin: "ge"
},
{
id: "100",
pinyin_key: "G",
pinyin: "gei"
},
{
id: "101",
pinyin_key: "G",
pinyin: "gen"
},
{
id: "102",
pinyin_key: "G",
pinyin: "geng"
},
{
id: "103",
pinyin_key: "G",
pinyin: "gong"
},
{
id: "104",
pinyin_key: "G",
pinyin: "gou"
},
{
id: "105",
pinyin_key: "G",
pinyin: "gu"
},
{
id: "106",
pinyin_key: "G",
pinyin: "gua"
},
{
id: "107",
pinyin_key: "G",
pinyin: "guai"
},
{
id: "108",
pinyin_key: "G",
pinyin: "guan"
},
{
id: "109",
pinyin_key: "G",
pinyin: "guang"
},
{
id: "110",
pinyin_key: "G",
pinyin: "gui"
},
{
id: "111",
pinyin_key: "G",
pinyin: "gun"
},
{
id: "112",
pinyin_key: "G",
pinyin: "guo"
},
{
id: "113",
pinyin_key: "H",
pinyin: "ha"
},
{
id: "114",
pinyin_key: "H",
pinyin: "hai"
},
{
id: "115",
pinyin_key: "H",
pinyin: "han"
},
{
id: "116",
pinyin_key: "H",
pinyin: "hang"
},
{
id: "117",
pinyin_key: "H",
pinyin: "hao"
},
{
id: "118",
pinyin_key: "H",
pinyin: "he"
},
{
id: "119",
pinyin_key: "H",
pinyin: "hei"
},
{
id: "120",
pinyin_key: "H",
pinyin: "hen"
},
{
id: "121",
pinyin_key: "H",
pinyin: "heng"
},
{
id: "122",
pinyin_key: "H",
pinyin: "hong"
},
{
id: "123",
pinyin_key: "H",
pinyin: "hou"
},
{
id: "124",
pinyin_key: "H",
pinyin: "hu"
},
{
id: "125",
pinyin_key: "H",
pinyin: "hua"
},
{
id: "126",
pinyin_key: "H",
pinyin: "huai"
},
{
id: "127",
pinyin_key: "H",
pinyin: "huan"
},
{
id: "128",
pinyin_key: "H",
pinyin: "huang"
},
{
id: "129",
pinyin_key: "H",
pinyin: "hui"
},
{
id: "130",
pinyin_key: "H",
pinyin: "hun"
},
{
id: "131",
pinyin_key: "H",
pinyin: "huo"
},
{
id: "132",
pinyin_key: "J",
pinyin: "ji"
},
{
id: "133",
pinyin_key: "J",
pinyin: "jia"
},
{
id: "134",
pinyin_key: "J",
pinyin: "jian"
},
{
id: "135",
pinyin_key: "J",
pinyin: "jiang"
},
{
id: "136",
pinyin_key: "J",
pinyin: "jiao"
},
{
id: "137",
pinyin_key: "J",
pinyin: "jie"
},
{
id: "138",
pinyin_key: "J",
pinyin: "jin"
},
{
id: "139",
pinyin_key: "J",
pinyin: "jing"
},
{
id: "140",
pinyin_key: "J",
pinyin: "jiong"
},
{
id: "141",
pinyin_key: "J",
pinyin: "jiu"
},
{
id: "142",
pinyin_key: "J",
pinyin: "ju"
},
{
id: "143",
pinyin_key: "J",
pinyin: "juan"
},
{
id: "144",
pinyin_key: "J",
pinyin: "jue"
},
{
id: "145",
pinyin_key: "J",
pinyin: "jun"
},
{
id: "146",
pinyin_key: "K",
pinyin: "ka"
},
{
id: "147",
pinyin_key: "K",
pinyin: "kai"
},
{
id: "148",
pinyin_key: "K",
pinyin: "kan"
},
{
id: "149",
pinyin_key: "K",
pinyin: "kang"
},
{
id: "150",
pinyin_key: "K",
pinyin: "kao"
},
{
id: "151",
pinyin_key: "K",
pinyin: "ke"
},
{
id: "152",
pinyin_key: "K",
pinyin: "ken"
},
{
id: "153",
pinyin_key: "K",
pinyin: "keng"
},
{
id: "154",
pinyin_key: "K",
pinyin: "kong"
},
{
id: "155",
pinyin_key: "K",
pinyin: "kou"
},
{
id: "156",
pinyin_key: "K",
pinyin: "ku"
},
{
id: "157",
pinyin_key: "K",
pinyin: "kua"
},
{
id: "158",
pinyin_key: "K",
pinyin: "kuai"
},
{
id: "159",
pinyin_key: "K",
pinyin: "kuan"
},
{
id: "160",
pinyin_key: "K",
pinyin: "kuang"
},
{
id: "161",
pinyin_key: "K",
pinyin: "kui"
},
{
id: "162",
pinyin_key: "K",
pinyin: "kun"
},
{
id: "163",
pinyin_key: "K",
pinyin: "kuo"
},
{
id: "164",
pinyin_key: "L",
pinyin: "la"
},
{
id: "165",
pinyin_key: "L",
pinyin: "lai"
},
{
id: "166",
pinyin_key: "L",
pinyin: "lan"
},
{
id: "167",
pinyin_key: "L",
pinyin: "lang"
},
{
id: "168",
pinyin_key: "L",
pinyin: "lao"
},
{
id: "169",
pinyin_key: "L",
pinyin: "le"
},
{
id: "170",
pinyin_key: "L",
pinyin: "lei"
},
{
id: "171",
pinyin_key: "L",
pinyin: "leng"
},
{
id: "172",
pinyin_key: "L",
pinyin: "li"
},
{
id: "173",
pinyin_key: "L",
pinyin: "lia"
},
{
id: "174",
pinyin_key: "L",
pinyin: "lian"
},
{
id: "175",
pinyin_key: "L",
pinyin: "liang"
},
{
id: "176",
pinyin_key: "L",
pinyin: "liao"
},
{
id: "177",
pinyin_key: "L",
pinyin: "lie"
},
{
id: "178",
pinyin_key: "L",
pinyin: "lin"
},
{
id: "179",
pinyin_key: "L",
pinyin: "ling"
},
{
id: "180",
pinyin_key: "L",
pinyin: "liu"
},
{
id: "181",
pinyin_key: "L",
pinyin: "long"
},
{
id: "182",
pinyin_key: "L",
pinyin: "lou"
},
{
id: "183",
pinyin_key: "L",
pinyin: "lu"
},
{
id: "184",
pinyin_key: "L",
pinyin: "lü"
},
{
id: "185",
pinyin_key: "L",
pinyin: "luan"
},
{
id: "186",
pinyin_key: "L",
pinyin: "lue"
},
{
id: "187",
pinyin_key: "L",
pinyin: "lüe"
},
{
id: "188",
pinyin_key: "L",
pinyin: "lun"
},
{
id: "189",
pinyin_key: "L",
pinyin: "luo"
},
{
id: "190",
pinyin_key: "M",
pinyin: "m"
},
{
id: "191",
pinyin_key: "M",
pinyin: "ma"
},
{
id: "192",
pinyin_key: "M",
pinyin: "mai"
},
{
id: "193",
pinyin_key: "M",
pinyin: "man"
},
{
id: "194",
pinyin_key: "M",
pinyin: "mang"
},
{
id: "195",
pinyin_key: "M",
pinyin: "mao"
},
{
id: "196",
pinyin_key: "M",
pinyin: "me"
},
{
id: "197",
pinyin_key: "M",
pinyin: "mei"
},
{
id: "198",
pinyin_key: "M",
pinyin: "men"
},
{
id: "199",
pinyin_key: "M",
pinyin: "meng"
},
{
id: "200",
pinyin_key: "M",
pinyin: "mi"
},
{
id: "201",
pinyin_key: "M",
pinyin: "mian"
},
{
id: "202",
pinyin_key: "M",
pinyin: "miao"
},
{
id: "203",
pinyin_key: "M",
pinyin: "mie"
},
{
id: "204",
pinyin_key: "M",
pinyin: "min"
},
{
id: "205",
pinyin_key: "M",
pinyin: "ming"
},
{
id: "206",
pinyin_key: "M",
pinyin: "miu"
},
{
id: "207",
pinyin_key: "M",
pinyin: "mo"
},
{
id: "208",
pinyin_key: "M",
pinyin: "mou"
},
{
id: "209",
pinyin_key: "M",
pinyin: "mu"
},
{
id: "210",
pinyin_key: "N",
pinyin: "na"
},
{
id: "211",
pinyin_key: "N",
pinyin: "nai"
},
{
id: "212",
pinyin_key: "N",
pinyin: "nan"
},
{
id: "213",
pinyin_key: "N",
pinyin: "nang"
},
{
id: "214",
pinyin_key: "N",
pinyin: "nao"
},
{
id: "215",
pinyin_key: "N",
pinyin: "ne"
},
{
id: "216",
pinyin_key: "N",
pinyin: "nei"
},
{
id: "217",
pinyin_key: "N",
pinyin: "nen"
},
{
id: "218",
pinyin_key: "N",
pinyin: "neng"
},
{
id: "219",
pinyin_key: "N",
pinyin: "ng"
},
{
id: "220",
pinyin_key: "N",
pinyin: "ni"
},
{
id: "221",
pinyin_key: "N",
pinyin: "nian"
},
{
id: "222",
pinyin_key: "N",
pinyin: "niang"
},
{
id: "223",
pinyin_key: "N",
pinyin: "niao"
},
{
id: "224",
pinyin_key: "N",
pinyin: "nie"
},
{
id: "225",
pinyin_key: "N",
pinyin: "nin"
},
{
id: "226",
pinyin_key: "N",
pinyin: "ning"
},
{
id: "227",
pinyin_key: "N",
pinyin: "niu"
},
{
id: "228",
pinyin_key: "N",
pinyin: "nong"
},
{
id: "229",
pinyin_key: "N",
pinyin: "nou"
},
{
id: "230",
pinyin_key: "N",
pinyin: "nu"
},
{
id: "231",
pinyin_key: "N",
pinyin: "nü"
},
{
id: "232",
pinyin_key: "N",
pinyin: "nuan"
},
{
id: "233",
pinyin_key: "N",
pinyin: "nüe"
},
{
id: "234",
pinyin_key: "N",
pinyin: "nuo"
},
{
id: "235",
pinyin_key: "N",
pinyin: "nun"
},
{
id: "236",
pinyin_key: "O",
pinyin: "o"
},
{
id: "237",
pinyin_key: "O",
pinyin: "ou"
},
{
id: "238",
pinyin_key: "P",
pinyin: "pa"
},
{
id: "239",
pinyin_key: "P",
pinyin: "pai"
},
{
id: "240",
pinyin_key: "P",
pinyin: "pan"
},
{
id: "241",
pinyin_key: "P",
pinyin: "pang"
},
{
id: "242",
pinyin_key: "P",
pinyin: "pao"
},
{
id: "243",
pinyin_key: "P",
pinyin: "pei"
},
{
id: "244",
pinyin_key: "P",
pinyin: "pen"
},
{
id: "245",
pinyin_key: "P",
pinyin: "peng"
},
{
id: "246",
pinyin_key: "P",
pinyin: "pi"
},
{
id: "247",
pinyin_key: "P",
pinyin: "pian"
},
{
id: "248",
pinyin_key: "P",
pinyin: "piao"
},
{
id: "249",
pinyin_key: "P",
pinyin: "pie"
},
{
id: "250",
pinyin_key: "P",
pinyin: "pin"
},
{
id: "251",
pinyin_key: "P",
pinyin: "ping"
},
{
id: "252",
pinyin_key: "P",
pinyin: "po"
},
{
id: "253",
pinyin_key: "P",
pinyin: "pou"
},
{
id: "254",
pinyin_key: "P",
pinyin: "pu"
},
{
id: "255",
pinyin_key: "Q",
pinyin: "qi"
},
{
id: "256",
pinyin_key: "Q",
pinyin: "qia"
},
{
id: "257",
pinyin_key: "Q",
pinyin: "qian"
},
{
id: "258",
pinyin_key: "Q",
pinyin: "qiang"
},
{
id: "259",
pinyin_key: "Q",
pinyin: "qiao"
},
{
id: "260",
pinyin_key: "Q",
pinyin: "qie"
},
{
id: "261",
pinyin_key: "Q",
pinyin: "qin"
},
{
id: "262",
pinyin_key: "Q",
pinyin: "qing"
},
{
id: "263",
pinyin_key: "Q",
pinyin: "qiong"
},
{
id: "264",
pinyin_key: "Q",
pinyin: "qiu"
},
{
id: "265",
pinyin_key: "Q",
pinyin: "qu"
},
{
id: "266",
pinyin_key: "Q",
pinyin: "quan"
},
{
id: "267",
pinyin_key: "Q",
pinyin: "que"
},
{
id: "268",
pinyin_key: "Q",
pinyin: "qun"
},
{
id: "269",
pinyin_key: "R",
pinyin: "ran"
},
{
id: "270",
pinyin_key: "R",
pinyin: "rang"
},
{
id: "271",
pinyin_key: "R",
pinyin: "rao"
},
{
id: "272",
pinyin_key: "R",
pinyin: "re"
},
{
id: "273",
pinyin_key: "R",
pinyin: "ren"
},
{
id: "274",
pinyin_key: "R",
pinyin: "reng"
},
{
id: "275",
pinyin_key: "R",
pinyin: "ri"
},
{
id: "276",
pinyin_key: "R",
pinyin: "rong"
},
{
id: "277",
pinyin_key: "R",
pinyin: "rou"
},
{
id: "278",
pinyin_key: "R",
pinyin: "ru"
},
{
id: "279",
pinyin_key: "R",
pinyin: "ruan"
},
{
id: "280",
pinyin_key: "R",
pinyin: "rui"
},
{
id: "281",
pinyin_key: "R",
pinyin: "run"
},
{
id: "282",
pinyin_key: "R",
pinyin: "ruo"
},
{
id: "283",
pinyin_key: "S",
pinyin: "sa"
},
{
id: "284",
pinyin_key: "S",
pinyin: "sai"
},
{
id: "285",
pinyin_key: "S",
pinyin: "san"
},
{
id: "286",
pinyin_key: "S",
pinyin: "sang"
},
{
id: "287",
pinyin_key: "S",
pinyin: "sao"
},
{
id: "288",
pinyin_key: "S",
pinyin: "se"
},
{
id: "289",
pinyin_key: "S",
pinyin: "sen"
},
{
id: "290",
pinyin_key: "S",
pinyin: "seng"
},
{
id: "291",
pinyin_key: "S",
pinyin: "sha"
},
{
id: "292",
pinyin_key: "S",
pinyin: "shai"
},
{
id: "293",
pinyin_key: "S",
pinyin: "shan"
},
{
id: "294",
pinyin_key: "S",
pinyin: "shang"
},
{
id: "295",
pinyin_key: "S",
pinyin: "shao"
},
{
id: "296",
pinyin_key: "S",
pinyin: "she"
},
{
id: "297",
pinyin_key: "S",
pinyin: "shei"
},
{
id: "298",
pinyin_key: "S",
pinyin: "shen"
},
{
id: "299",
pinyin_key: "S",
pinyin: "sheng"
},
{
id: "300",
pinyin_key: "S",
pinyin: "shi"
},
{
id: "301",
pinyin_key: "S",
pinyin: "shou"
},
{
id: "302",
pinyin_key: "S",
pinyin: "shu"
},
{
id: "303",
pinyin_key: "S",
pinyin: "shua"
},
{
id: "304",
pinyin_key: "S",
pinyin: "shuai"
},
{
id: "305",
pinyin_key: "S",
pinyin: "shuan"
},
{
id: "306",
pinyin_key: "S",
pinyin: "shuang"
},
{
id: "307",
pinyin_key: "S",
pinyin: "shui"
},
{
id: "308",
pinyin_key: "S",
pinyin: "shun"
},
{
id: "309",
pinyin_key: "S",
pinyin: "shuo"
},
{
id: "310",
pinyin_key: "S",
pinyin: "si"
},
{
id: "311",
pinyin_key: "S",
pinyin: "song"
},
{
id: "312",
pinyin_key: "S",
pinyin: "sou"
},
{
id: "313",
pinyin_key: "S",
pinyin: "su"
},
{
id: "314",
pinyin_key: "S",
pinyin: "suan"
},
{
id: "315",
pinyin_key: "S",
pinyin: "sui"
},
{
id: "316",
pinyin_key: "S",
pinyin: "sun"
},
{
id: "317",
pinyin_key: "S",
pinyin: "suo"
},
{
id: "318",
pinyin_key: "T",
pinyin: "ta"
},
{
id: "319",
pinyin_key: "T",
pinyin: "tai"
},
{
id: "320",
pinyin_key: "T",
pinyin: "tan"
},
{
id: "321",
pinyin_key: "T",
pinyin: "tang"
},
{
id: "322",
pinyin_key: "T",
pinyin: "tao"
},
{
id: "323",
pinyin_key: "T",
pinyin: "te"
},
{
id: "324",
pinyin_key: "T",
pinyin: "teng"
},
{
id: "325",
pinyin_key: "T",
pinyin: "ti"
},
{
id: "326",
pinyin_key: "T",
pinyin: "tian"
},
{
id: "327",
pinyin_key: "T",
pinyin: "tiao"
},
{
id: "328",
pinyin_key: "T",
pinyin: "tie"
},
{
id: "329",
pinyin_key: "T",
pinyin: "ting"
},
{
id: "330",
pinyin_key: "T",
pinyin: "tong"
},
{
id: "331",
pinyin_key: "T",
pinyin: "tou"
},
{
id: "332",
pinyin_key: "T",
pinyin: "tu"
},
{
id: "333",
pinyin_key: "T",
pinyin: "tuan"
},
{
id: "334",
pinyin_key: "T",
pinyin: "tui"
},
{
id: "335",
pinyin_key: "T",
pinyin: "tun"
},
{
id: "336",
pinyin_key: "T",
pinyin: "tuo"
},
{
id: "337",
pinyin_key: "W",
pinyin: "wa"
},
{
id: "338",
pinyin_key: "W",
pinyin: "wai"
},
{
id: "339",
pinyin_key: "W",
pinyin: "wan"
},
{
id: "340",
pinyin_key: "W",
pinyin: "wang"
},
{
id: "341",
pinyin_key: "W",
pinyin: "wei"
},
{
id: "342",
pinyin_key: "W",
pinyin: "wen"
},
{
id: "343",
pinyin_key: "W",
pinyin: "weng"
},
{
id: "344",
pinyin_key: "W",
pinyin: "wo"
},
{
id: "345",
pinyin_key: "W",
pinyin: "wu"
},
{
id: "346",
pinyin_key: "X",
pinyin: "xi"
},
{
id: "347",
pinyin_key: "X",
pinyin: "xia"
},
{
id: "348",
pinyin_key: "X",
pinyin: "xian"
},
{
id: "349",
pinyin_key: "X",
pinyin: "xiang"
},
{
id: "350",
pinyin_key: "X",
pinyin: "xiao"
},
{
id: "351",
pinyin_key: "X",
pinyin: "xie"
},
{
id: "352",
pinyin_key: "X",
pinyin: "xin"
},
{
id: "353",
pinyin_key: "X",
pinyin: "xing"
},
{
id: "354",
pinyin_key: "X",
pinyin: "xiong"
},
{
id: "355",
pinyin_key: "X",
pinyin: "xiu"
},
{
id: "356",
pinyin_key: "X",
pinyin: "xu"
},
{
id: "357",
pinyin_key: "X",
pinyin: "xuan"
},
{
id: "358",
pinyin_key: "X",
pinyin: "xue"
},
{
id: "359",
pinyin_key: "X",
pinyin: "xun"
},
{
id: "360",
pinyin_key: "Y",
pinyin: "ya"
},
{
id: "361",
pinyin_key: "Y",
pinyin: "yan"
},
{
id: "362",
pinyin_key: "Y",
pinyin: "yang"
},
{
id: "363",
pinyin_key: "Y",
pinyin: "yao"
},
{
id: "364",
pinyin_key: "Y",
pinyin: "ye"
},
{
id: "365",
pinyin_key: "Y",
pinyin: "yi"
},
{
id: "366",
pinyin_key: "Y",
pinyin: "yin"
},
{
id: "367",
pinyin_key: "Y",
pinyin: "ying"
},
{
id: "368",
pinyin_key: "Y",
pinyin: "yo"
},
{
id: "369",
pinyin_key: "Y",
pinyin: "yong"
},
{
id: "370",
pinyin_key: "Y",
pinyin: "you"
},
{
id: "371",
pinyin_key: "Y",
pinyin: "yu"
},
{
id: "372",
pinyin_key: "Y",
pinyin: "yuan"
},
{
id: "373",
pinyin_key: "Y",
pinyin: "yue"
},
{
id: "374",
pinyin_key: "Y",
pinyin: "yun"
},
{
id: "375",
pinyin_key: "Z",
pinyin: "za"
},
{
id: "376",
pinyin_key: "Z",
pinyin: "zai"
},
{
id: "377",
pinyin_key: "Z",
pinyin: "zan"
},
{
id: "378",
pinyin_key: "Z",
pinyin: "zang"
},
{
id: "379",
pinyin_key: "Z",
pinyin: "zao"
},
{
id: "380",
pinyin_key: "Z",
pinyin: "ze"
},
{
id: "381",
pinyin_key: "Z",
pinyin: "zei"
},
{
id: "382",
pinyin_key: "Z",
pinyin: "zen"
},
{
id: "383",
pinyin_key: "Z",
pinyin: "zeng"
},
{
id: "384",
pinyin_key: "Z",
pinyin: "zha"
},
{
id: "385",
pinyin_key: "Z",
pinyin: "zhai"
},
{
id: "386",
pinyin_key: "Z",
pinyin: "zhan"
},
{
id: "387",
pinyin_key: "Z",
pinyin: "zhang"
},
{
id: "388",
pinyin_key: "Z",
pinyin: "zhao"
},
{
id: "389",
pinyin_key: "Z",
pinyin: "zhe"
},
{
id: "390",
pinyin_key: "Z",
pinyin: "zhei"
},
{
id: "391",
pinyin_key: "Z",
pinyin: "zhen"
},
{
id: "392",
pinyin_key: "Z",
pinyin: "zheng"
},
{
id: "393",
pinyin_key: "Z",
pinyin: "zhi"
},
{
id: "394",
pinyin_key: "Z",
pinyin: "zhong"
},
{
id: "395",
pinyin_key: "Z",
pinyin: "zhou"
},
{
id: "396",
pinyin_key: "Z",
pinyin: "zhu"
},
{
id: "397",
pinyin_key: "Z",
pinyin: "zhua"
},
{
id: "398",
pinyin_key: "Z",
pinyin: "zhuai"
},
{
id: "399",
pinyin_key: "Z",
pinyin: "zhuan"
},
{
id: "400",
pinyin_key: "Z",
pinyin: "zhuang"
},
{
id: "401",
pinyin_key: "Z",
pinyin: "zhui"
},
{
id: "402",
pinyin_key: "Z",
pinyin: "zhun"
},
{
id: "403",
pinyin_key: "Z",
pinyin: "zhuo"
},
{
id: "404",
pinyin_key: "Z",
pinyin: "zi"
},
{
id: "405",
pinyin_key: "Z",
pinyin: "zong"
},
{
id: "406",
pinyin_key: "Z",
pinyin: "zou"
},
{
id: "407",
pinyin_key: "Z",
pinyin: "zu"
},
{
id: "408",
pinyin_key: "Z",
pinyin: "zuan"
},
{
id: "409",
pinyin_key: "Z",
pinyin: "zui"
},
{
id: "410",
pinyin_key: "Z",
pinyin: "zun"
},
{
id: "411",
pinyin_key: "Z",
pinyin: "zuo"
}
]
  },
  Request:function(){
    var that = this;
    showLoading('加载中...');
    var key = app.globalData.key;
    var url = app.globalData.hostUrl;
    console.log(url);

    //拼音列表
    // wx.request({
    //   url: url+'/xhzd/pinyin?key='+key,
    //   data: {},
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: function(res){
    //     hideToast();
    //     var errorCode = res.data.error_code;
    //     if(errorCode == 0){
    //       that.setData({
    //         pinyinDatas: res.data.result
    //       })
    //     }else{
    //       showToast(res.data.reason);
    //     }
        
    //   },
    //   fail: function(e) {
    //     // fail
    //     hideToast();
    //     showModal();
    //   },
    //   complete: function(c) {
    //     // complete
        
    //   }
    // })
    // 部首列表
    // wx.request({
    //   url: url+'/xhzd/bushou?key='+key,
    //   data: {},
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: function(res){
    //     hideToast();
    //     var errorCode = res.data.error_code;
    //     if(errorCode == 0){
    //       that.setData({
    //         bushouDatas: res.data.result
    //       })
    //     }else{
    //       showToast(res.data.reason);
    //     }
    //     // success
        
    //   },
    //   fail: function(e) {
    //     // fail
    //     hideToast();
    //     showModal();
    //   },
    //   complete: function(c) {
    //     // complete
    //     console.log('complete'+c);
        
    //   }
    // })

  

  },
  widgetsToggle: function (e) {
    var that = this;
    var id = e.currentTarget.id, list = this.data.pinyinDatas;
  },
  //拼音查询
  detail:function(e){
    var key = e.currentTarget.id;
    wx.navigateTo({
      url: '../../pages/detail/detail?key='+key+'&type=pinyin',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  //部首查询
  detailByBushou:function(e){
    var key = e.currentTarget.id;
    wx.navigateTo({
      url: '../../pages/detail/detail?key='+key+'&type=bushou',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    // that.Request();
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})

function showToast(toastTip){
  wx.showToast({
    title: toastTip,
    icon: 'success',
    duration: 2000
  })
}

function hideToast(){
  wx.hideToast();
}
function showModal(){
  wx.showModal({
          title: '加载失败',
          content: '网络连接失败，稍后重试！',
          confirmText:'点击重试',
          success: function(res) {
            if (res.confirm) {
              this();
            }
          }
        })
}
function showLoading(loadingTip){
  wx.showToast({
    title: loadingTip,
    icon: 'loading',
    duration: 10000
  })
}