const baseUrl = 'https://sugoku.herokuapp.com/board?difficulty=';

export const fetchBoard = difficulty => {
    return dispatch => {
        fetch(`${baseUrl}${difficulty}`)
        .then(res => res.json())
        .then(({board}) => dispatch({
            type: 'SET_BOARD',
            payload: { board }
        }))
        .catch(console.log);
    }
}