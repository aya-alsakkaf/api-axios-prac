import { usePathname } from "expo-router";
import instance from ".";

const getAllTodos = async () => {
	const response = await instance.get("/todos");
	return response.data;
};

const getOneTodo = async (id: number) => {
	const response = await instance.get(`/todos/${id}`);
	return response.data;
};
export { getAllTodos, getOneTodo };
