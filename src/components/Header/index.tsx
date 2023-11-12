import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/logo.png";

const Header: React.FC = () => {
	let { user, logoutUser } = useContext(AuthContext)!;
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="bg-white dark:bg-slate-700 shadow-2xl">
			<nav
				className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8 "
				aria-label="Global"
			>
				<div className="flex lg:flex-1">
					<Link to="/" className="-m-1.5 p-1.5">
						<span className="sr-only">Farm Manager</span>
						<img className="h-16 w-auto" src={logo} alt="" />
					</Link>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end ">
					<p
						onClick={user ? logoutUser : () => {}} //
						className="text-sm font-semibold leading-6 hover:text-green-600 cursor-pointer px-5 py-2 border-2 border-gray-900 dark:border-white hover:border-green-600 rounded-2xl"
					>
						{user ? "Log out" : "Log in"} <span aria-hidden="true">&rarr;</span>
					</p>
				</div>
			</nav>
			<Dialog
				className="lg:hidden"
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
			>
				<div className="fixed inset-0 z-10" />
				<Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-slate-700 px-3 py-3 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<Link to="/" className="-m-1.5 p-1.5">
							<span className="sr-only">Farm Manager</span>
							<img className="h-16 w-auto" src={logo} alt="Farm Manager" />
						</Link>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5"
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="py-6">
								<p
									onClick={user ? logoutUser : () => {}}
									className="mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-50 cursor-pointer"
								>
									{user ? "Log out" : "Log in"}
								</p>
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</header>
	);
};

export default Header;
