import logo from "../../assets/logo.png";
import background from "../../assets/pages/login/background.png";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const Login: React.FC = () => {
	let { loginUser } = useContext(AuthContext)!;
	return (
		<section className="relative bg-gray-50 dark:bg-gray-900 h-screen flex items-center">
			<div
				className="absolute inset-0 bg-no-repeat bg-cover blur-sm"
				style={{ backgroundImage: `url(${background})` }}
			></div>
			<div className="relative flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="flex items-center mb-6 text-2xl font-bold">
					<img className="w-20 h-20 mr-2 " src={logo} alt="logo" />
					<p className="text-black">Farm Management</p>
				</div>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
							Welcome back
						</h1>
						<form className="space-y-4 md:space-y-6" onSubmit={loginUser}>
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium "
								>
									Email
								</label>
								<input
									type="text"
									name="username"
									id="username"
									className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-600"
									placeholder="name@company.com"
									required={true}
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium "
								>
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-600"
									required={true}
								/>
							</div>

							<button
								type="submit"
								className="w-full text-white  bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-900 dark:focus:ring-primary-800"
							>
								Sign in
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
