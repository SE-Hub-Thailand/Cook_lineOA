import { HistoryMachine } from './types'; // Adjust the import path as necessary

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:1400';  // Fallback to default if env variable not set

export const getAllHistoryMachines = async (): Promise<HistoryMachine[]> => {
    try {
        const url = `${API_URL}/api/history-machine`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching history machines:', errorData);
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Map the response data to an array of RecycleMachine objects
        const recycleMachines: HistoryMachine[] = data.data  .filter((item: any) => item.attributes.status === 'active') // Filter by status "active"
        .map((item: any) => ({
            id: item.id,
            type: item.attributes.type,
            date: item.attributes.date,
            time: item.attributes.time,
            serialNumber: item.attributes.serialNumber,
            point: item.attributes.point,
			// shop: {
            //     id: item.attributes.shop.data.id,
            //     name: item.attributes.shop.data.attributes.name,
            //     location: item.attributes.shop.data.attributes.location,
            //     latitude: item.attributes.shop.data.attributes.latitude,
            //     longitude: item.attributes.shop.data.attributes.longitude,
            //     createdAt: item.attributes.shop.data.attributes.createdAt,
            //     updatedAt: item.attributes.shop.data.attributes.updatedAt,
            //     publishedAt: item.attributes.shop.data.attributes.publishedAt,
            // },
        }));

        return recycleMachines;
    } catch (error) {
        console.error('Error fetching recycle machines:', error.message);
        throw error;
    }
};
