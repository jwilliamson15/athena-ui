const loadingReducer = (state = true, action) => {
    switch (action.type) {
        case "setLoading":
            return state = action.payload;
        default:
            return state;
    }
}

export default loadingReducer;