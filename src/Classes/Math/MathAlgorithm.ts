export default class MathAlgorithm {
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
    return +value; // console log infinite value if present from conversion
  }

  evalValue( value: any , arrayEval?: any ): number {
    this.isUndefined( value );
    this.isSymbol( value );
    if ( 'number' === typeof value )        return value;
    else if ( 'string' === typeof value )   return this.stringToNumber( value );
    else if ( Array.isArray( value ) )      return arrayEval( value ); // https://jsben.ch/QgYAV
    throw new Error( 'Cannot iterate objects at this time' );
  }

  sumArray( arr_value: any[] ): number {
    let idx = arr_value.length, sum: number = 0;
    while(idx--) sum += this.evalValue( arr_value[ idx ] );
    return sum;
  }

  diffArray( arr_value: any[] ): number {
    let idx = arr_value.length, sum: number = 0;
    while(idx--) sum -= this.evalValue( arr_value[ idx ] );
    return sum;
  }

  // TODO: Consider iteration of objects also but want fastest possible iteration method
  add( a: any , b: any ): number {
    return this.evalValue( a , this.sumArray ) + this.evalValue( b , this.sumArray );
  }

  diff( a: any , b: any , absolute: boolean = false ): number {
    const VAL = this.evalValue( a , this.diffArray ) - this.evalValue( b , this.diffArray );
    return absolute ? Math.abs( VAL ) : VAL;
  }
}