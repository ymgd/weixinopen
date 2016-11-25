function validate(scoreA, scoreB) {
    if (scoreA == "" || scoreB == "" || scoreA == undefined || scoreB == undefined) {
        return false
    }
    if(scoreA < 0 || scoreB < 0){
        return false
    }
    if(parseInt(scoreA) != scoreA || parseInt(scoreB) != scoreB){
        return false
    }
    if(scoreA > 5 || scoreB > 5){
        return false
    }
    return true
}



module.exports.validate = validate