class ChessBoard {
    board: string[][];

    constructor() {
        const ROW_EMPTY: string[] = ['.','.','.','.','.','.','.','.'];

        // 0-7 -- Arrays are Y, Indices are X
        this.board = [
            ['R','H','B','K','Q','B','H','R'],
            ['P','P','P','P','P','P','P','P'],
            ROW_EMPTY,
            ROW_EMPTY,
            ROW_EMPTY,
            ROW_EMPTY,
            ['p','p','p','p','p','p','p','p'],
            ['r','h','b','k','q','b','h','r']
        ];
    }

    sideEval( piece: string ): string {
        if ( piece.search( /[RHBKQ]/ ) > -1 ) return 'upper';
        return 'lower';
    }

    moveBoardConflictConstraint( move: number[]  ): boolean {
        if ( move[0] < 0 || move[0] > 7 || move[1] < 0 || move[1] > 7 ) return true;
        return false;
    }

    moveConflictSameSide( begin: string , end: string ): boolean {
        if ( this.sideEval( begin )  === this.sideEval( end ) ) return true;
        return false;
    }

    moveConflictCollision( begin_side: string ,  move_begin: number[] , move_end: number[] ): boolean {
        var move_is_valid = true;

        move_begin.every( ( coord , i ) => {
            const X_COORD   = 0 === i;
            const END_COORD = move_end[ i ];

            if ( move_begin[ i ] < END_COORD ) {
                coord++; // set beginning to be next move for eval

                for (; coord <= END_COORD; coord++ ) {
                    let path_sqaure_side = X_COORD ? this.board[ move_begin[ 1 ] ][ coord ] : this.board[ coord ][ move_begin[ 0 ] ];

                    if ( this.moveConflictSameSide( begin_side , path_sqaure_side ) ) move_is_valid = false;
                }
            } else {
                coord--; // set beginning to be next move for eval
                for (; coord >= END_COORD; coord-- ) {
                    let path_sqaure_side = X_COORD ? this.board[ move_begin[ 1 ] ][ coord ] : this.board[ coord ][ move_begin[ 0 ] ];

                    if ( begin_side === path_sqaure_side ) move_is_valid = false;
                }
            }
            return move_is_valid;
        });

        return move_is_valid;
    }

    pieceEval( coords: number[] ): string {
        const PIECE = this.board[ coords[ 0 ] ][ coords[ 1 ] ];
        if ( '.' === PIECE ) return 'empty';
        return PIECE;
    }

    pieceMove( move_begin: number[] , move_end: number[] ): boolean {
        if ( this.moveBoardConflictConstraint( move_begin ) ) return false;
        const PIECE_BEGIN = this.pieceEval( move_begin );
        if ( 'empty' === PIECE_BEGIN ) return false;

        if ( this.moveBoardConflictConstraint( move_end ) ) return false;
        const PIECE_END   = this.pieceEval( move_end );
        if ( this.moveConflictSameSide( PIECE_BEGIN , PIECE_END ) ) return false;

        if ( 'h' !== PIECE_BEGIN && 'H' !== PIECE_BEGIN )  {
            if ( ! this.moveConflictCollision( PIECE_BEGIN , move_begin , move_end ) ) return false;
        }

        if ( this.pieceMoveConflictRange( PIECE_BEGIN, move_begin , move_end ) ) return false;

        return true;
    }

    pieceMoveConflictRange( piece: string , move_begin: number[] , move_end: number[] ): boolean {
        const PIECE = piece.toLowerCase();
        const X     = Math.abs( move_begin[0] - move_end[0] );
        const Y     = Math.abs( move_begin[1] - move_end[1] );

        // only certain pieces have range conflict directives
        // H, P, K
        if ( 'h' === PIECE ) {
            if (
                ( 2 === X && 1 === Y ) ||
                ( 2 === Y && 1 === X )
            ) return false;
            return true;
        } else if ( 'p' === PIECE ) {
            if (
                ( 0 === X && 1 === Y ) // come back to add additional attack and first move directives
            ) return false;
            return true;
        } else if ( 'k' === PIECE ) {
            if (
                ( 1 === X && 0 === Y ) ||
                ( 1 === Y && 0 === X )
            ) return false;
            return true;
        }
        return true;
    }
}

const a = new ChessBoard();
console.log( a.pieceMove( [0,1] , [2,0] ) );
