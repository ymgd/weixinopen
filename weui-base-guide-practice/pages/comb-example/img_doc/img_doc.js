const $image_path = "../../../assets/images/"
const section1 = '话说，最近一个月以来，一个胖子成为了很多人生活中的新男神—它就是那个小眯缝眼、大肚子的大白。' +
'这个会变形、无所不能、博爱并且毫无攻击力的机器人，让很多姑娘在自己的朋友圈里感慨：我可以抱你吗？' +
'大白，让我靠在你肩膀上哭泣。除了姑娘们都想要拥有一个大白一样的男朋友，大白这个胖子到底俘获了谁的心呢?'

const section2 = '这样的机器人虽然不像大白那样能给人带来温暖和安全感，但是这逆天的功能已经令很多姑娘兴奋不已' +
'虽然现在这样的机器人还只是概念产品，但谁能保证它今后只停留在概念当中？十年前，你能想到如今可以用手机干那么多事情么？'

Page( {
    data: {
        article: {
            title: '合乎你天性的生活就是最好的',
            created_at: '2014-12-15',
            author_name: 'Laixiac',
            author_source: '微信派',
            neck_image: $image_path + 'article_neck.png',
            sections: [section1, section2]
        }
    }
})