const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:1400';  // Fallback to default if env variable not set
import { User } from './types';
export const updateUser = async (userId: number, userData: Record<string, any>, token: string) => {
    try {
        const url = `${API_URL}/api/users/${userId}`;  // Adjust the endpoint as per your API structure

        const response = await fetch(url, {
            method: 'PUT',  // Use 'PATCH' if only partial updates are allowed by your API
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Include the JWT token in the Authorization header
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData);
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};
export const getUser = async (userId: string, token: string): Promise<User[]> => {
    if (!userId || !token) {
        throw new Error('No token provided. User must be authenticated.');
    }
    try {
        const url = `${API_URL}/api/users/${userId}`;  // Adjust the endpoint as per your API structure

        const response = await fetch(url, {
            method: 'GET',  // Use 'GET' to retrieve user details
            headers: {
                'Authorization': `Bearer ${token}`,  // Include the JWT token in the Authorization header
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData);
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        const users: User[] = data.data.map((item: any) => ({
            id: item.id,
            username: item.attributes.username,
            email: item.attributes.email,
            fullName: item.attributes.fullName,
            gender: item.attributes.gender,
            address: item.attributes.address,
            cardID: item.attributes.cardID,
            telNumber: item.attributes.telNumber,
            userType: item.attributes.userType,
            point: item.attributes.point,
        }));
        return users;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

// export const getAllShops = async (token: string): Promise<Shop[]> => {
//     if (!token) {
//         throw new Error('No token provided. User must be authenticated.');
//     }
//     try {
//         // const API_URL = 'https://cookbstaging.careervio.com'
//         // /api/shops/?populate=image
//         const url = `${API_URL}/api/shops/?populate=image`;
//         // console.log('url', url);
//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error('Error fetching shops:', errorData);
//             throw new Error(`Request failed with status ${response.status}`);
//         }

//         const data = await response.json();
//         console.log('data', data);
//         // Map the response data to an array of Shop objects
//         const shops: Shop[] = data.data.map((item: any) => ({
//             id: item.id,
//             name: item.attributes.name,
//             location: item.attributes.location,
//             latitude: item.attributes.latitude,
//             longitude: item.attributes.longitude,
//             createdAt: item.attributes.createdAt,
//             updatedAt: item.attributes.updatedAt,
//             publishedAt: item.attributes.publishedAt,
//             bookBankNumber: item.attributes.bookBankNumber,
//             image: item.attributes.image,
//         }));
//         console.log('shops', shops);
//         return shops;
//     } catch (error) {
//         console.error('Error fetching shops:', error.message);
//         throw error;
//     }
// };
