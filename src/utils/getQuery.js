export default function getQuery(sr){
  var match,
    urlParams = {},
    pl = /\+/g,
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) {
      return decodeURIComponent(s.replace(pl, " "));
    },
    q = sr.substr(1);
  while ((match = search.exec(q)))
    urlParams[decode(match[1])] = decode(match[2]);
  return urlParams;
}