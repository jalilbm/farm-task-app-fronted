interface Animal {
	id: string;
	name: string;
	quantity: number;
}

const FetchAnimals = async (
	access_token: string,
	logoutUser: () => void
): Promise<Animal[]> => {
	try {
		const response = await fetch(
			`${process.env.REACT_APP_BACKEND_BASE_URL}/api/animals/`,
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		);
		if (response.status === 401) {
			logoutUser();
		}
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return (await response.json()) as Animal[];
	} catch (error) {
		console.error("There has been a problem with your fetch operation:", error);
		return [];
	}
};

export const saveAnimals = async (
	access_token: string,
	animals: Animal[],
	logoutUser: () => void
) => {
	try {
		const response = await fetch(
			`${process.env.REACT_APP_BACKEND_BASE_URL}/api/animals/`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${access_token}`,
				},
				body: JSON.stringify(animals),
			}
		);

		if (response.status === 401) {
			logoutUser();
		}

		if (!response.ok) {
			throw new Error("Failed to save animals");
		}

		// Handle the response if needed
	} catch (error) {
		console.error("Error saving animals:", error);
	}
};

export default FetchAnimals;
