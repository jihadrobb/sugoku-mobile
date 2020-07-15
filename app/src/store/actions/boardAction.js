const baseUrl = 'https://sugoku.herokuapp.com';

export const fetchBoard = difficulty => {
    return dispatch => {
        fetch(`${baseUrl}/board?difficulty=${difficulty.toLowerCase()}`)
        .then(res => res.json())
        .then(({board}) => {
            // console.log('masuk dispatch');
            dispatch(checkFilled(board));
            dispatch({
                type: 'SET_BOARD',
                payload: { board }
            });
            dispatch(solveSudoku(board));
        })
        .catch(console.log);
    }
}
const checkFilled = (board) => {
    // console.log('masuk checkfilled')
    let arr = board.map(row => {
        return row.map(el => {
            return (el === 0);
        })
    })
    // console.log(board, '<<<<<<< board in action');
    // console.log(arr, '<<<< filled in action');
    return {
        type: 'SET_FILLED',
        payload: { filled: arr }
    };
}

export const setBoard = (newBoard) => {
    //jgn pake dispatch
    return {
        type: 'SET_BOARD',
        payload: {
            board: newBoard,
        },
    }
}
const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '');

export const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

const solveSudoku = (board) => {
    return dispatch => {
        fetch(`${baseUrl}/solve`, {
            method: 'POST',
            body: encodeParams({ board }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(response => response.json())
            .then(({solution}) => {
                dispatch({
                    type: 'SET_SOLUTION',
                    payload: { solution },
                });
            })
            .catch(console.warn)
    }
}
// export const validateSudoku = (board) => {
//     fetch(`${baseUrl}/validate`, {
//         method: 'POST',
//         body: encodeParams({ board }),
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//     })
//         .then(res => res.json())
//         .then(({ status }) => Alert.alert('Sudoku checked', status))
//         .catch(console.warn)
// }