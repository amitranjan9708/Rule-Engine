import axios from 'axios';

const API_URL = 'http://localhost:5000/api/rules';

// Create a new rule
export const createRule = async (ruleString) => {
    const response = await axios.post(`${API_URL}/create`, { ruleString });
    return response.data;
};

// Evaluate user data against a rule
export const evaluateRule = async (ruleId, userData) => {
    const response = await axios.post(`${API_URL}/evaluate`, { ruleId, userData });
    return response.data;
};
