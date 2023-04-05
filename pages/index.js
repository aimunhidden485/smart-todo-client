import Head from "next/head";
import Image from "next/image";
import { Nunito } from "next/font/google";
import { AiFillPlusSquare } from "react-icons/ai";
import { useEffect, useState } from "react";
import useAddTaskModal from "@/components/hooks/useAddTaskModal";
import AddTaskModal from "@/components/AddTaskModal";
import { getAllTasks } from "@/apiRoute";
import axios from "axios";
import Task from "@/components/Task";
import { useRouter } from "next/router";
import UpdateTaskModal from "@/components/UpdateTaskModal";
import useTasks from "@/components/hooks/useTasks";
import useUserState from "@/components/hooks/user";
import ShowTaskModal from "@/components/ShowTaskModal";

const nunito = Nunito({ subsets: ["latin"] });

export default function Home() {
	const addTaskModal = useAddTaskModal();
	const [isLoading, setIsLoading] = useState(false);
	const [userData, setUserData] = useState({});
	const setTasks = useTasks((state) => state.setTasksData);
	const tasks = useTasks((state) => state.tasksData);
	const setUser = useUserState((state) => state.onLogin);
	const router = useRouter();

	useEffect(() => {
		setIsLoading(true);
		const user = JSON.parse(localStorage.getItem("todo-user"));
		setUserData(user);
		setUser(user);
		if (user) {
			setIsLoading(false);
			axios.get(`${getAllTasks}/${user._id}`)
				.then((data) => {
					setTasks(data.data);
					setIsLoading(false);
				})
				.catch((err) => console.log(err))
				.finally(() => setIsLoading(false));
		}
	}, []);

	useEffect(() => {
		if (!userData) {
			router.push("/login");
		}
	}, [userData]);

	return (
		<>
			<Head>
				<title>Smart Todos</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={nunito.className}>
				<div className="relative max-w-6xl mx-auto h-screen flex py-12 w-full ">
					<div className="w-full px-2">
					<div className="mb-4">
								<h1 className="text-center sm:text-3xl text-cyan-700  font-bold text-xl">Welcome <span className="text-slate-800">{userData?.firstName}</span></h1>
							</div>
						<div className="flex sm:w-4/5 md:w-2/5 w-full mx-auto justify-between items-center  bg-white px-4 sm:py-8 py-4 rounded-md shadow-lg">
							
							<p className="font-semibold text-gray-600">Let's set your Daily goals</p>
							<AiFillPlusSquare onClick={addTaskModal.onOpen} className="text-cyan-500 text-3xl cursor-pointer" />

							<AddTaskModal />
							<UpdateTaskModal tasks={tasks} />
						</div>
						{/* show all tasks */}
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 w-fit px-2   mx-auto  justify-center">
							{tasks?.map((task) => (
								<Task key={task._id} task={task} />
							))}
						</div>
					</div>
							<ShowTaskModal/>
				</div>
			</main>
		</>
	);
}
