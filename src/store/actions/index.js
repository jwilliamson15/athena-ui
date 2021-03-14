export const saveConsultant = (consultant) => {
    return {
        type: "saveConsultant",
        payload: consultant
    };
};

export const setSkillLoading = (loading) => {
    return {
        type: "setSkillLoading",
        payload: loading
    };
};

export const setConsultantLoading = (loading) => {
    return {
        type: "setConsultantLoading",
        payload: loading
    };
};

export const setSearchResults = (results) => {
    return {
        type: "setSearchResults",
        payload: results
    };
};
