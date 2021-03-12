export const saveConsultant = (consultant) => {
    return {
        type: "saveConsultant",
        payload: consultant
    };
};

export const setLoading = (loading) => {
    return {
        type: "setLoading",
        payload: loading
    };
};
