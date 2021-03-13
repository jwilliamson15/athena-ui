export const API_BASE_URL = "http://localhost:8080/consultants"
export const API_SKILL_SEARCH_URL = API_BASE_URL + "/skills/search"
export const API_CONSULTANT_SEARCH_URL = API_BASE_URL + "/search"

export const HOME_URL = "/athena"
export const SKILL_SEARCH_URL = "/athena/search"
export const SKILL_SEARCH_RESULT_URL = "/athena/search/result"
export const NEW_CONSULTANT_URL = "/athena/consultant/new"
export const CONSULTANT_SEARCH_URL = "/athena/consultant/search"
export const CONSULTANT_EDIT_URL = "/athena/consultant/edit"


export const EMPTY_SEARCH_PARAMS = [{skillName: "", skillLevel: "ANY"}];
export const EMPTY_CONSULTANT_OBJECT = {
    name: '',
    employeeNumber: '',
    jobRole: '',
    personDescription: '',
    skills: [{name: '', experienceTime: '', skillLevel: ''}],
    engagementHistory: [{name: '', description: '', duration: ''}]
};