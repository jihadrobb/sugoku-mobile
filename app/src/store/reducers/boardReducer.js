const initialState = {
    board: [],
    filled: [],
    solution: [],
}
export default (state = initialState, action) => {
    switch(action.type) {
        case 'SET_BOARD':
            return { ...state, board: action.payload.board };
        case 'SET_FILLED':
            return { ...state, filled: action.payload.filled };
        case 'SET_SOLUTION':
            return { ...state, solution: action.payload.solution};
        default:
            return state;
    };
};