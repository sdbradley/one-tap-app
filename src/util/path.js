export function join(...segments) {
  let op = '';
  segments.forEach(segment => {
    if (segment instanceof Array) {
      segment = join(...segment)
    }
    op += `${op && '/'}${segment.replace(/(^\/|\/$)/g, '')}`;
  })
  return op;
}
