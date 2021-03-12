import {combineReducers} from "redux";
import selectedConsultantReducer from "./SelectedConsultantReducer";
import loadingReducer from "./LoadingReducer";

const allReducers = combineReducers({
    selectedConsultant: selectedConsultantReducer,
    isLoading: loadingReducer
});

export default allReducers;