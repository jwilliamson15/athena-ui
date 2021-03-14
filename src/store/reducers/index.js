import {combineReducers} from "redux";
import selectedConsultantReducer from "./SelectedConsultantReducer";
import skillLoadingReducer from "./SkillLoadingReducer";
import searchResultsReducer from "./SearchResultsReducer";
import consultantLoadingReducer from "./ConsultantLoadingReducer";

const allReducers = combineReducers({
    selectedConsultant: selectedConsultantReducer,
    isSkillLoading: skillLoadingReducer,
    isConsultantLoading: consultantLoadingReducer,
    searchResults: searchResultsReducer
});

export default allReducers;