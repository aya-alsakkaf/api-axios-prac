import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { Todo } from "../data/Todo";
import { mockTodos } from "../data/mockData";

export default function TodoDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // useEffect(() => {
  //   if (id) {
  //     const foundTodo = mockTodos.find((todo) => todo.id === id);
  //     setTodo(foundTodo || null);
  //   }
  // }, [id]);

  const displayToDoDetails = () => {
    if (id) {
      const foundTodo = mockTodos.find((todo) => todo.id === id);
      setTodo(foundTodo || null);
    }
  };

  const handleToggleComplete = () => {
    if (!todo) return;

    setIsUpdating(true);

    // Simulate API delay
    setTimeout(() => {
      setTodo({
        ...todo,
        completed: !todo.completed,
      });
      setIsUpdating(false);
    }, 500);
  };

  const handleDelete = () => {
    if (!todo) return;

    setIsUpdating(true);

    // Simulate API delay
    setTimeout(() => {
      // Just navigate back in this mock version
      router.back();
    }, 500);
  };

  if (!todo) {
    return (
      <View style={styles.centered}>
        <TouchableOpacity style={styles.button} onPress={displayToDoDetails}>
          <Text style={styles.buttonText}>Load Todo Details</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{todo.title}</Text>

        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Status:</Text>
          <Text
            style={[
              styles.statusText,
              todo.completed ? styles.completedText : styles.incompleteText,
            ]}
          >
            {todo.completed ? "Completed" : "Not Completed"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>User ID:</Text>
          <Text style={styles.infoValue}>{todo.userId}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Todo ID:</Text>
          <Text style={styles.infoValue}>{todo.id}</Text>
        </View>

        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>
            Mark as {todo.completed ? "incomplete" : "complete"}
          </Text>
          <Switch
            value={todo.completed}
            onValueChange={handleToggleComplete}
            disabled={isUpdating}
            trackColor={{ false: "#ddd", true: "#81b0ff" }}
            thumbColor={todo.completed ? "#3498db" : "#f4f3f4"}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Back to List</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}
            disabled={isUpdating}
          >
            <Text style={styles.buttonText}>Delete Todo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  statusLabel: {
    fontSize: 16,
    color: "#555",
    marginRight: 10,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  completedText: {
    color: "#2ecc71",
  },
  incompleteText: {
    color: "#e74c3c",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: "#555",
    width: 80,
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  toggleLabel: {
    fontSize: 16,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
    maxHeight: 50,
    justifyContent: "center",
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
