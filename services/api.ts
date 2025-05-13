import axios from 'axios';
import { Todo } from '../models/Todo';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchTodos = async (): Promise<Todo[]> => {
    try {
        const response = await axios.get<Todo[]>(`${API_URL}/todos`);
        return response.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        return [];
    }
};

export const fetchTodoById = async (id: number): Promise<Todo | null> => {
    try {
        const response = await axios.get<Todo>(`${API_URL}/todos/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching todo with id ${id}:`, error);
        return null;
    }
};

export const createTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo | null> => {
    try {
        const response = await axios.post<Todo>(`${API_URL}/todos`, todo);
        return response.data;
    } catch (error) {
        console.error('Error creating todo:', error);
        return null;
    }
};

export const updateTodo = async (id: number, todo: Partial<Todo>): Promise<Todo | null> => {
    try {
        const response = await axios.put<Todo>(`${API_URL}/todos/${id}`, todo);
        return response.data;
    } catch (error) {
        console.error(`Error updating todo with id ${id}:`, error);
        return null;
    }
};

export const deleteTodo = async (id: number): Promise<boolean> => {
    try {
        await axios.delete(`${API_URL}/todos/${id}`);
        return true;
    } catch (error) {
        console.error(`Error deleting todo with id ${id}:`, error);
        return false;
    }
}; 