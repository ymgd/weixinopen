function processSubject(subject){
    var title = subject.title;//获取电影名字
    var directors = subject.directors;//获取导演数组
    var directorStr ="";
    for(var index in directors){
        directorStr += directors[index].name + "/ ";//拼接，保存在directorStr
    }
    if(directorStr !=""){// 判断是不为空的时候去掉后面的“/ ”
        directorStr = directorStr.substring(0, directorStr.length-2);
    }
    var casts = subject.casts;//获取演员数组
    var castStr ="";
    for(var index in casts){
        castStr += casts[index].name + "/ ";
    };
    if(castStr !=""){
        castStr += castStr.substring(0, castStr.length-2);
    };
    var genres = subject.genres;//获取电影类型数组
    var genresStr ="";
    for(var index in genres){
        genresStr += genres[index] + "/ "
    }
    if(genresStr!=""){
        genresStr = genresStr.substring(0, genresStr.length-2);
    }
    var year = subject.year;//获取电影上映时间
    var text ="名称：" +title+ "\n导演：" + directorStr + "\n主演：" + castStr + "\n类型：" + genresStr + "\n上映年份：" + year + "(中国大陆)"
    subject.text=text;
}

function processSubjects(subjects){
    for(var i=0; i<subjects.length; i++){
        var subject =subjects[i];
        this.processSubject(subject);
        }
}

module.exports = {
    processSubject: processSubject,
    processSubjects: processSubjects
}