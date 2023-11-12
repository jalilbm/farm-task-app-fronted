import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ConfirmationModalProps {
	modalIsOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	modalIsOpen,
	onClose,
	onConfirm,
	title,
	message,
}) => {
	const cancelButtonRef = useRef(null);

	return (
		<Transition.Root show={modalIsOpen} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				initialFocus={cancelButtonRef}
				onClose={onClose}
			>
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 shadow-xl transition-all sm:my-8 sm:max-w-lg sm:w-full">
								<div className="bg-white dark:bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
									<div className="sm:flex sm:items-start">
										<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
											<Dialog.Title
												as="h3"
												className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
											>
												{title}
											</Dialog.Title>
											<div className="mt-2">
												<p className="text-sm text-gray-500 dark:text-gray-300">
													{message}
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
									<button
										type="button"
										className="bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600"
										onClick={onConfirm}
									>
										Confirm
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

export default ConfirmationModal;
