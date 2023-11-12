import React, { useState, useEffect, useContext } from "react";
import fetchAnimals, { saveAnimals } from "../../services/api";
import AuthContext from "../../context/AuthContext";
import AnimalModal from "../AnimalModal";
import ConfirmationModal from "../ConfirmationModal";

interface Animal {
	id: string;
	name: string;
	quantity: number;
}

type AnimalData = {
	id?: number | string | null;
	name: string;
	quantity: number;
};

const Table: React.FC = () => {
	const [animals, setAnimals] = useState<Animal[]>([]);
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
	const [createNewAnimal, setCreateNewAnimal] = useState<boolean>(false);
	const [modalData, setModalData] = useState<AnimalData>();
	const [selectedAnimalId, setSelectedAnimalId] = useState<number | null>(null);
	const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
	const [confirmationTitle, setConfirmationTitle] = useState("");
	const [confirmationMessage, setConfirmationMessage] = useState("");
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			if (hasUnsavedChanges) {
				// Standard for most browsers
				event.preventDefault();
				// For some older browsers
				event.returnValue = "";
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [hasUnsavedChanges]);

	let { authTokens, logoutUser } = useContext(AuthContext)!;
	useEffect(() => {
		const loadData = async () => {
			const data = await fetchAnimals(authTokens?.access!, logoutUser);
			setAnimals(data);
		};

		loadData();
	}, []);

	const onSaveModal = (data: AnimalData) => {
		setAnimals((prevAnimals) => {
			setHasUnsavedChanges(true);
			if (data.id !== null) {
				return prevAnimals.map((animal) =>
					animal.id?.toString() === data.id?.toString()
						? { ...animal, name: data.name, quantity: data.quantity }
						: animal
				);
			} else {
				// Check if the animal already exists in the list
				const existingAnimal = prevAnimals.find(
					(animal) => animal.name === data.name
				);

				if (existingAnimal) {
					// If it exists, update the quantity
					return prevAnimals.map((animal) =>
						animal.name === data.name
							? {
									...animal,
									quantity: animal.quantity + data.quantity,
							  }
							: animal
					);
				} else {
					// If it doesn't exist, add it to the list
					const maxId = prevAnimals.reduce(
						(max, animal) => Math.max(max, parseInt(animal.id, 10)),
						0
					);
					return [...prevAnimals, { ...data, id: (maxId + 1).toString() }];
				}
			}
		});
	};

	const handleEditClick = (animalId: string) => {
		const animalToEdit = animals.find((animal) => animal.id === animalId);
		if (animalToEdit) {
			setSelectedAnimalId(Number(animalToEdit.id));
			setModalData(animalToEdit);
			setCreateNewAnimal(false);
			setModalIsOpen(true);
		}
	};

	const handleRemoveClick = (animalId: string) => {
		setAnimals((prevAnimals) =>
			prevAnimals.filter((animal) => animal.id !== animalId)
		);
		setHasUnsavedChanges(true);
	};

	const cancelChanges = async () => {
		try {
			const fetchedAnimals = await fetchAnimals(
				authTokens?.access!,
				logoutUser
			);
			setAnimals(fetchedAnimals);
		} catch (error) {
			console.error("Error fetching animals:", error);
		}
	};

	const saveTable = async () => {
		saveAnimals(authTokens?.access!, animals, logoutUser);
	};

	const handleSaveClick = () => {
		setConfirmationTitle("Confirm Save");
		setConfirmationMessage("Are you sure you want to save changes?");
		setConfirmationModalOpen(true);
	};

	const handleCancelClick = () => {
		setConfirmationTitle("Confirm Cancel");
		setConfirmationMessage("Are you sure you want to cancel changes?");
		setConfirmationModalOpen(true);
	};

	const onConfirmAction = () => {
		if (confirmationTitle === "Confirm Save") {
			saveTable();
			setHasUnsavedChanges(false);
			setConfirmationModalOpen(false);
		} else if (confirmationTitle === "Confirm Cancel") {
			cancelChanges();
			setHasUnsavedChanges(false);
			setConfirmationModalOpen(false);
		}
	};

	return (
		<div className="flex flex-col w-full md:w-[500px] px-1">
			<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
					<div className="overflow-hidden rounded-xl">
						<table className="min-w-full text-left text-sm font-light">
							<thead className="font-medium bg-green-500">
								<tr>
									<th scope="col" className="px-4 py-4 w-36">
										Animal Name
									</th>
									<th scope="col" className="px-4 py-4 w-[20px]">
										Quantity
									</th>
									<th scope="col" className="py-4 w-12"></th>
									<th scope="col" className="py-4 w-12"></th>
								</tr>
							</thead>
							<tbody>
								{animals.map((animal, index) => (
									<tr
										className={`${
											index % 2 === 0 ? "bg-white" : "bg-gray-200"
										}  dark:${index % 2 === 0 ? "bg-gray-900" : "bg-gray-700"}`}
										key={animal.id}
									>
										<td className="whitespace-nowrap px-4 py-4">
											{animal.name}
										</td>
										<td className="whitespace-nowrap px-4 py-4">
											{animal.quantity}
										</td>
										<td
											className="whitespace-nowrap px-4 py-4 underline cursor-pointer"
											onClick={() => {
												handleEditClick(animal.id);
											}}
										>
											Edit
										</td>
										<td
											className="whitespace-nowrap px-4 py-4 underline cursor-pointer text-red-500"
											onClick={() => {
												handleRemoveClick(animal.id);
											}}
										>
											Remove
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div className="flex justify-between">
				<button
					className="bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600"
					onClick={() => {
						setModalIsOpen(true);
						setCreateNewAnimal(true);
						setSelectedAnimalId(null);
					}}
				>
					+
				</button>
				<div className="flex justify-end">
					<button
						className="border-2 border-green-500 px-4 py-2 rounded-xl mr-2 hover:text-green-500"
						onClick={handleCancelClick}
					>
						Cancel
					</button>
					<button
						className="bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600"
						onClick={handleSaveClick}
					>
						Save
					</button>
				</div>
			</div>
			<AnimalModal
				modalIsOpen={modalIsOpen}
				onClose={() => setModalIsOpen(false)}
				onSave={(data: AnimalData) => onSaveModal(data)}
				createNewAnimal={createNewAnimal}
				modalData={modalData}
				selectedAnimalId={selectedAnimalId}
			/>

			<ConfirmationModal
				modalIsOpen={confirmationModalOpen}
				onClose={() => setConfirmationModalOpen(false)}
				onConfirm={onConfirmAction}
				title={confirmationTitle}
				message={confirmationMessage}
			/>
		</div>
	);
};

export default Table;
