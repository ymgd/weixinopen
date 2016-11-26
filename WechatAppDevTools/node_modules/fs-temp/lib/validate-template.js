module.exports = function validateTemplate (template) {
  if (typeof template !== 'string') {
    throw new TypeError('template is not a string')
  }

  var re = /(^|[^%])(%%)*%s/
  var first = re.exec(template)
  if (first === null) throw new Error('No replacement token. Template must contain replacement token %s exactly once')

  var pos = first.index + first[0].length
  var second = re.exec(template.substring(pos))
  if (second !== null) throw new Error('Multiple replacement tokens. Template must contain replacement token %s exactly once')
}
