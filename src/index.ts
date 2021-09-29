import MathAlgorithm from '@class/Math/MathAlgorithm';
import MathList from '@class/Math/MathList';

const MATH_ALG  = new MathAlgorithm();
const MATH_LIST = new MathList();

console.log( '-------------- BEGIN MATH ALG ----------------' );
console.log( MATH_ALG.prod( 4 , 5 ) );
console.log( MATH_ALG.quot( 4 , 5 ) );
console.log( MATH_ALG.prod( '4' , '5' ) );
console.log( MATH_ALG.quot( '4' , '5' ) );
console.log( MATH_ALG.prod( [1,4] , [1,5] ) );
console.log( MATH_ALG.quot( [1,4] , [1,5] ) );
console.log( MATH_ALG.prod( ['1',4] , ['1',5] ) );
console.log( MATH_ALG.quot( [1,'4'] , [1,'5'] ) );
console.log( '-------------- BEGIN MATH LIST ----------------' );
console.log( MATH_LIST.mean( [1,2,3,4,5] ) );
console.log( MATH_LIST.median( [1,2,3,4,5] ) );
console.log( MATH_LIST.range( [1,2,3,4,5] ) );