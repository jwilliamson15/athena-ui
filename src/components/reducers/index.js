import {combineReducers} from "redux";
import selectedConsultantReducer from "./selectedConsultantReducer";

const allReducers = combineReducers({
    selectedConsultant: selectedConsultantReducer
});

export default allReducers;