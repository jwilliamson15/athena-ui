import {EMPTY_CONSULTANT_OBJECT} from "../../constants/constants";

const searchResultsReducer = (state = EMPTY_CONSULTANT_OBJECT, action) => {
    switch (action.type) {
        case "setSearchResults":
            return state = action.payload;
        default:
            return state;
    };
};

export default searchResultsReducer;