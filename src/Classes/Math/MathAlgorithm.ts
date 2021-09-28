export default class MathAlgorithm {
  isUndefined( value ): void {
    if ( undefined === value ) throw new Error( 'Parameter cannot be undefined' );
  }

  isSymbol( value ): void {
    const type = typeof value
    const IS_SYMBOL = type == 'symbol' || (type === 'object' && value != null && getTag(value) == '[object Symbol]')

    if ( IS_SYMBOL ) throw new Error( 'Cannot use Symbol type in method' );
  }

  stringToNumber( value: string ): number {
    return +value; // console log infinite value if present from conversion
  }

  evalValue( value , arrayEval ): number {
    this.isUndefined( value );
    this.isSymbol( value );
    if ( 'number' === typeof value )        return value;
    else if ( 'string' === typeof value )   return this.stringToNumber( value );
    else if ( Array.isArray( value ) )      return arrayEval( value ); // https://jsben.ch/QgYAV
    throw new Error( 'Cannot iterate objects at this time' );
  }

  sumArray( arr_value ): number {
    let idx = arr_value.length, sum: number = 0;
    while(idx--) sum += this.evalValue( arr_value[ idx ] );
    return sum;
  }

  diffArray( arr_value ): number {
    let idx = arr_value.length, sum: number = 0;
    while(idx--) sum -= this.evalValue( arr_value[ idx ] );
    return sum;
  }

  // TODO: Consider iteration of objects also but want fastest possible iteration method
  add( a , b ) {
    return this.evalValue( a , this.sumArray ) + this.evalValue( b , this.sumArray );
  }

  diff( a , b , absolute?: boolean = false ) {
    const VAL = this.evalValue( a , this.diffArray ) - this.evalValue( b , this.diffArray );
    return absolute ? Math.abs( VAL ) : VAL;
  }
}