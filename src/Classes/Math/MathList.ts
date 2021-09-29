export default class MathList {
  isUndefined( value: any ): void {
    if ( undefined === value ) throw new Error( 'Parameter cannot be undefined' );
  }

  isSymbol( value: any ): void {
    if ( 'symbol' === typeof value ) throw new Error( 'Cannot use Symbol type in method' );

    // const type = typeof value
    // if (
    //   type === 'symbol' ||
    //   type === 'object' && value !== null && getTag(value) === '[object Symbol]'
    // ) throw new Error( 'Cannot use Symbol type in method' );
  }

  stringToNumber( value: string ): number {
    return +value; // TODO: console log infinite value if present from conversion
  }

  evalValue( value: any ): number {
    this.isUndefined( value );
    this.isSymbol( value );
    if ( 'number' === typeof value )        return value;
    else if ( 'string' === typeof value )   return this.stringToNumber( value );
    else if ( Array.isArray( value ) )      return this.sumArray( value ); // https://jsben.ch/QgYAV
    throw new Error( 'Cannot iterate objects at this time' );
  }

  sumArray( arr_value: any[] ): number {
    let idx = arr_value.length, sum: number = 0;
    while(idx--) sum += this.evalValue( arr_value[ idx ] );
    return sum;
  }

  // TODO: --- FOR ALL METHODS BELOW CONSIDER ALLOWING UNIQUE VALUE FILTER
  // TODO: Consider iteration of objects also but want fastest possible iteration method
  // TODO: spread arguments and determine length of arguments
  mean( numbers: any ): number {
    return this.sumArray( numbers ) / numbers.length;
  }

  median( numbers: any ): number {
    let numsLen = numbers.length;
    numbers.sort(); // TODO: Check quickest sort method possible

    if ( numsLen % 2 === 0 ) return (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
    else return numbers[(numsLen - 1) / 2];
  }

  range( numbers: any ): number[] {
    numbers.sort();
    return [numbers[0], numbers[numbers.length - 1]];
  }

  // TODO: Needs additional method to return a sorted ascend/descend array of mode values
  mode( numbers: any ) {
    // as result can be bimodal or multi-modal, the returned result is provided as an array mode
    // EXAMPLE: [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
    let idx: number = numbers.length,
      count: { [key: string]: number } = {},
      modes: number[] = [],
      max: number = 0;

    while(idx--) {
      const CNT: number  = ( count[ numbers[ idx ] ] || 0 ) + 1;
      count[ idx ] = CNT;
      if ( CNT > max ) max = CNT;

      if ( 1 === idx ) {
        for ( const KEY in count ) {
          if ( count[ KEY ] === max ) modes.push( +KEY );
        }
      }
    }

    return modes;
  }
}