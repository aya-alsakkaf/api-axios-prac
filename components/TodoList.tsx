import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Todo } from "../data/Todo";
import { mockTodos } from "../data/mockData";
import { TodoItem } from "./TodoItem";

export const TodoList: React.FC = () => {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleLoadTodos = () => {
    setTodos(mockTodos);
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleCreateTodo = () => {
    router.push({
      pathname: "/createTodo",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.fetchButton} onPress={handleLoadTodos}>
          <Text style={styles.fetchButtonText}>Load Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateTodo}
        >
          <Text style={styles.fetchButtonText}>Create Todo</Text>
        </TouchableOpacity>
      </View>

      {todos.length > 0 ? (
        <FlatList
          style={styles.list}
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem todo={item} onToggle={handleToggleTodo} />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No todos available. Create a new one!
          </Text>
        </View>
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
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
