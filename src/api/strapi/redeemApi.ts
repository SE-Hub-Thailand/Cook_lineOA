const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:1400';  // Fallback to default if env variable not set
import { Redeem } from './types';


export const createRedeem = async (redeemData: Redeem, token: string): Promise<Redeem> => {
    try {
        console.log('redeemData in createRedeem: ', redeemData);
        const url = `${API_URL}/api/redeem`;  // Adjust the endpoint as per your API structure

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,  // Include the JWT token in the Authorization header
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(redeemData),
        });

        console.log('body: ', JSON.stringify(redeemData));
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData);
            alert('Error: ' + errorData.error.message);
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};
