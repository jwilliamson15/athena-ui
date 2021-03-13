const consultantLoadingReducer = (state = true, action) => {
    switch (action.type) {
        case "setConsultantLoading":
            return state = action.payload;
        default:
            return state;
    }
}

export default consultantLoadingReducer;