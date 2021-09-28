import MathAlgorithm from '@class/Math/MathAlgorithm';

const MATH_ALG = new MathAlgorithm();

console.log( MATH_ALG.prod( 4 , 5 ) );
console.log( MATH_ALG.quot( 4 , 5 ) );
console.log( MATH_ALG.prod( '4' , '5' ) );
console.log( MATH_ALG.quot( '4' , '5' ) );
console.log( MATH_ALG.prod( [1,4] , [1,5] ) );
console.log( MATH_ALG.quot( [1,4] , [1,5] ) );
console.log( MATH_ALG.prod( ['1',4] , ['1',5] ) );
console.log( MATH_ALG.quot( [1,'4'] , [1,'5'] ) );