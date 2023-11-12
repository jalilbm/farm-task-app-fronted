import Header from "../../components/Header";
import Table from "../../components/Table";

const Home: React.FC = () => {
	return (
		<>
			<Header />
			<div className="flex items-center flex-col h-screen bg-gray-100 dark:bg-slate-500">
				<h1 className="text-2xl mt-16 mb-8">Manage Your Farm</h1>
				<Table />
			</div>
		</>
	);
};

export default Home;
