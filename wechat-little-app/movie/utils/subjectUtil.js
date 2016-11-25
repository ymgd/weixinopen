  //取出电影数组中每一个元素


function processSubjects(subjects){
  for(var i=0; i<subjects.length;i++){
        var subject = subjects[i];
       this.processSubject(subject);
    }
}

//第二层处理电影元素 
function processSubject(subject){

  var title = subject.title;
  var directors = subject.directors;
  var directorStr = "";
  //拼接导演
  for(var index in directors){
     directorStr = directorStr + directors[index].name + " /";
  }
  if(directorStr != ""){
     directorStr = directorStr.substring(0,directorStr.length-2);
  }
  //拼接演员
  var casts = subject.casts;
  var castStr = "";
  for(var index in casts){
     castStr = castStr + casts[index].name + " /";
  }
  if(castStr != ""){
     castStr = castStr.substring(0,castStr.length-2);
  }

  //剧情处理
  var genres = subject.genres;
  var genresStr = "";
  for(var index in genres){
     genresStr = genresStr + genres[index] + " / ";
  }
  if(genresStr != ""){
     genresStr = genresStr.substring(0,genresStr.length-2);
  }

  //年份
  var year = subject.year;
  var text = "名称：" + title+"\n导演："+directorStr+"\n主演："+castStr+"\n类型："+genresStr + "\n上映年份："+year
  // console.log(text);
  subject.text = text;
}

  

//这里只能暴露一个方法
module.exports.processSubjects = processSubjects

exports.processSubject = processSubject

