export function findIndexById(list, id) {
  return list.findIndex((item) => parseInt(item.id, 10) === parseInt(id, 10));
}

export function findById(list, id, defaultReturn = {}) {
  const index = findIndexById(list, id);
  if (index > -1) {
    return list[index];
  }
  return defaultReturn;
}

export function findByName(list, value) {
  return list.find(function(item) {
    return item.name === value;
  });
}

function matches(a, b, criteria) {
  let match = true;
  Object.keys(criteria).forEach(key => {
    match = match && a[key] === b[criteria[key]]
  });
  return match;
}

export function joinWhere(a, b, where, prop = 'joined') {
  let op = [];
  if (a) {
    a.forEach(aItem => {
      aItem = Object.assign({}, aItem);
      op.push(aItem)

      let joined = [];
      if (b) {
        b.forEach(bItem => {
          if (matches(aItem, bItem, where)) {
            joined.push(Object.assign({}, bItem));
          }
        })
      }
      aItem[prop] = joined;
    });
  }
  return op;
}

export function groupBy(collection, prop) {
  let op = {};
  collection.forEach(item => {
    let group = op[item[prop]] = op[item[prop]] || [];
    group.push(item);
  });
  return op;
}

export function download(filename, type, body) {
  if (isMsie()) {
    navigator.msSaveBlob(new Blob([body], {type: type}), filename)
  } else {
    let link = document.createElement('a')
    link.style = 'position: fixed; bottom: 200%; left: 200%; opacity: 0.001;';
    link.setAttribute('href', encodeURI('data:' + type + ',' + body))
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

function isMsie() {
  return uaContains('MSIE ') || uaContains('Trident/') || uaContains('Edge/')
}

function uaContains(str) {
  return window.navigator.userAgent.indexOf(str) >= 0
}

export function scrollToTop(el) {
  while (el && el !== document) {
    el.scrollTop = 0;
    el = el.parentNode;
  }
}

export function setPrecision(float, numberOfDigits) {
  let modifier = Math.pow(10, numberOfDigits)
  return Math.round(float * modifier) / modifier;
}

export function encodePlus(string) {
  return string.replace('+', '%2B')
}
