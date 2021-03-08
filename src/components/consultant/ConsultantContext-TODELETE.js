import React from 'react';

export const ConsultantContextTODELETE = React.createContext(
    {
        name: '',
        employeeNumber: '',
        jobRole: '',
        personDescription: '',
        skills: [{name: '', experienceTime: '', skillLevel: ''}],
        engagementHistory: [{name: '', description: '', duration: ''}]
    }
);