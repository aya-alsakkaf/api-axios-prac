import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Todo } from "../models/Todo";
import { fetchTodos } from "../services/api";
import { TodoItem } from "./TodoItem";
import getAllTodos from "@/api/todos";

export const TodoList: React.FC = () => {
	const router = useRouter();
	const [todos, setTodos] = useState<Todo[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleLoadTodos = async () => {
		const data = await getAllTodos();
		console.log("Data", data);
	};

	const handleFetchTodos = async () => {
		try {
			setLoading(true);
			const data = await fetchTodos();
			setTodos(data);
			setError(null);
		} catch (err) {
			setError("Failed to load todos. Please try again.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const handleToggleTodo = (id: number) => {
		setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
	};

	const handleCreateTodo = () => {
		router.push("/screens/CreateTodo");
	};

	if (loading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color="#3498db" />
				<Text style={styles.loadingText}>Loading todos...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.buttonRow}>
				<TouchableOpacity style={styles.fetchButton} onPress={handleFetchTodos} disabled={loading}>
					<Text style={styles.fetchButtonText}>Fetch Todos</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.fetchButton} onPress={handleLoadTodos} disabled={loading}>
					<Text style={styles.fetchButtonText}>Load Todos</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.createButton} onPress={handleCreateTodo}>
					<Text style={styles.fetchButtonText}>Create Todo</Text>
				</TouchableOpacity>
			</View>

			{error && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{error}</Text>
				</View>
			)}

			{todos.length > 0 ? (
				<FlatList
					style={styles.list}
					data={todos}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => <TodoItem todo={item} onToggle={handleToggleTodo} />}
				/>
			) : (
				!loading && (
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>No todos available. Press the button to fetch todos.</Text>
					</View>
				)
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	list: {
		flex: 1,
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	loadingText: {
		marginTop: 10,
		fontSize: 16,
		color: "#666",
	},
	errorContainer: {
		backgroundColor: "#ffe6e6",
		padding: 10,
		margin: 10,
		borderRadius: 5,
	},
	errorText: {
		color: "red",
		fontSize: 16,
		textAlign: "center",
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 10,
		marginTop: 10,
	},
	fetchButton: {
		backgroundColor: "#3498db",
		padding: 15,
		borderRadius: 5,
		flex: 1,
		marginRight: 5,
		alignItems: "center",
	},
	createButton: {
		backgroundColor: "#2ecc71",
		padding: 15,
		borderRadius: 5,
		flex: 1,
		marginLeft: 5,
		alignItems: "center",
	},
	fetchButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	emptyText: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
	},
});
