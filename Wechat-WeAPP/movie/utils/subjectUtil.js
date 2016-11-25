function processSubjects(subjects) {
    for(var i = 0, max = subjects.length; i < max; i++) {
      var subject = subjects[i];
    this.processSubject(subject);
    }
  }
function   processSubject(subject) {
    var title = subject.title;
    var directors = subject.directors;
    var directorStr = "";
    var casts = subject.casts;
    var castsStr = "";
    var genres = subject.genres;
    var genresStr = "";  
    var year = subject.year;
    directors.forEach(e => directorStr += e.name + " ");
    casts.forEach(e => castsStr  += e.name + " / ");
    if(castsStr != "") {
      castsStr = castsStr.substring(0, castsStr.length-2);
    }
    genres.forEach(e => genresStr += e + " / ");
    if(genresStr != "") {
      genresStr = genresStr.substring(0, genresStr.length-2);
    }
    var text = "名称：" + title + "\n导演：" + directorStr + "\n演员：" + castsStr + "\n类型：" + genresStr + "\n上映年份：" + year + "(中国大陆)";
     subject.text = text;
}

module.exports = {
    processSubjects: processSubjects,
    processSubject: processSubject,
}