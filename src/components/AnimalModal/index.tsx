import { Fragment, useRef, useState, ChangeEvent, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

type AnimalData = {
	id?: number | string | null;
	name: string;
	quantity: number;
};

interface AnimalModalProps {
	modalIsOpen: boolean;
	onClose: () => void;
	onSave: (data: AnimalData) => void;
	createNewAnimal: boolean;
	modalData?: AnimalData;
	selectedAnimalId?: number | null;
}

const AnimalModal: React.FC<AnimalModalProps> = ({
	modalIsOpen,
	onClose,
	onSave,
	createNewAnimal,
	modalData,
	selectedAnimalId,
}) => {
	const [animalName, setAnimalName] = useState<string>(modalData?.name || "");
	const [animalQuantity, setAnimalQuantity] = useState<string | number>(
		modalData?.quantity.toString() || ""
	);

	const cancelButtonRef = useRef(null);

	useEffect(() => {
		setAnimalName(modalData?.name || "");
		setAnimalQuantity(modalData?.quantity.toString() || "");
	}, [modalData]);

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAnimalName(e.target.value);
	};

	const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setAnimalQuantity(value === "" || isNaN(Number(value)) ? "" : value);
	};

	const handleSave = () => {
		const data: AnimalData = {
			id: null,
			name: animalName,
			quantity: parseInt(animalQuantity.toString(), 10),
		};
		if (selectedAnimalId) {
			onSave({ ...data, id: Number(selectedAnimalId) });
		} else {
			onSave(data);
		}
		onClose();
	};

	return (
		<Transition.Root show={modalIsOpen} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10 modal-popup"
				initialFocus={cancelButtonRef}
				onClose={() => onClose}
			>
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg bg-gray-100 dark:bg-gray-900">
								<div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
									<div className="sm:flex sm:items-start">
										<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
											<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
												<Dialog.Title
													as="h3"
													className="text-base font-semibold leading-6"
												>
													{createNewAnimal
														? "Create New Animal"
														: "Edit Animal"}
												</Dialog.Title>
												<div className="mt-2">
													<input
														type="text"
														defaultValue={animalName}
														onChange={handleNameChange}
														placeholder="Animal name"
														className="w-full rounded-md border-2 p-2"
													/>
													<input
														type="number"
														defaultValue={animalQuantity}
														onChange={handleQuantityChange}
														placeholder="Quantity"
														className="w-full mt-2 rounded-md border-2 p-2"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 modal-popup-footer">
									<button
										type="button"
										className="bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600"
										onClick={handleSave}
									>
										{createNewAnimal ? "Add" : "Save"}
									</button>
									<button
										type="button"
										className="border-2 border-green-500 px-4 py-2 rounded-xl mr-2 hover:text-green-500"
										onClick={onClose}
										ref={cancelButtonRef}
									>
										Cancel
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default AnimalModal;
