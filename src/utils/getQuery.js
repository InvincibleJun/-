export default function getQuery (sr) {
  let match
  let urlParams = {}
  let pl = /\+/g
  let search = /([^&=]+)=?([^&]*)/g
  let decode = (s) => {
    return decodeURIComponent(s.replace(pl, ' '))
  }
  var q = sr.substr(1)
  while ((match = search.exec(q))) { urlParams[decode(match[1])] = decode(match[2]) }
  return urlParams
}
