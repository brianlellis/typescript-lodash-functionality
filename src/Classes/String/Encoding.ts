
const matchCnt  = ( str: string , pattern: RegExp ) => {
  const MATCH = ( str || '' ).match( pattern );
  return MATCH ? MATCH.length : 0;
}
const isASCII   = ( str: string ) => {
  const REG_EX = /[\x00-\x7F]/;
}