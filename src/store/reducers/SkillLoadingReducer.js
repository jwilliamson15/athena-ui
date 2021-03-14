const skillLoadingReducer = (state = true, action) => {
    switch (action.type) {
        case "setSkillLoading":
            return state = action.payload;
        default:
            return state;
    }
}

export default skillLoadingReducer;