import {EMPTY_CONSULTANT_OBJECT} from "../../constants/constants";

const selectedConsultantReducer = (state = EMPTY_CONSULTANT_OBJECT, action) => {
    switch (action.type){
        case "saveConsultant":
            return state = action.payload;
        default:
            return state;
    }
}

export default selectedConsultantReducer;