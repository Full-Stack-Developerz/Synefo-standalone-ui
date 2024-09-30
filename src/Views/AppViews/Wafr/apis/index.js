import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://example.com', 
    headers: {
        'Content-Type': 'application/json', 
    },
    timeout: 60000, 
});

export const createWorkload = async (payload) => {
    try {
        const response = await apiClient.post('', payload);
        return response.data; 
    } catch (error) {
        console.error('Error creating workload:', error);
        throw error; 
    }
};
