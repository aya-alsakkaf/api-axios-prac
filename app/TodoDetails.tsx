import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Todo } from "../models/Todo";
import { deleteTodo, fetchTodoById, updateTodo } from "../services/api";

export default function TodoDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodo();
  }, [id]);

  const loadTodo = async () => {
    if (!id) {
      setError("No todo ID provided");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const todoData = await fetchTodoById(Number(id));
      if (todoData) {
        setTodo(todoData);
        setError(null);
      } else {
        setError("Todo not found");
      }
    } catch (err) {
      setError("Failed to load todo details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async () => {
    if (!todo) return;

    try {
      setUpdating(true);
      const updatedTodo = { ...todo, completed: !todo.completed };
      const result = await updateTodo(todo.id, { completed: !todo.completed });

      if (result) {
        setTodo(updatedTodo);
        setError(null);
      } else {
        setError("Failed to update todo status");
      }
    } catch (err) {
      setError("An error occurred while updating");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!todo) return;

    try {
      setUpdating(true);
      const success = await deleteTodo(todo.id);

      if (success) {
        // Navigate back after successful deletion
        router.back();
      } else {
        setError("Failed to delete todo");
        setUpdating(false);
      }
    } catch (err) {
      setError("An error occurred while deleting");
      console.error(err);
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading todo details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!todo) {
    return (
      <View style={styles.centered}>
        <Text>Todo not found</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
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
            disabled={updating}
            trackColor={{ false: "#ddd", true: "#81b0ff" }}
            thumbColor={todo.completed ? "#3498db" : "#f4f3f4"}
          />
        </View>

        {updating && (
          <View style={styles.updatingContainer}>
            <ActivityIndicator size="small" color="#3498db" />
            <Text style={styles.updatingText}>Updating...</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Back to List</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}
            disabled={updating}
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
  updatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  updatingText: {
    marginLeft: 10,
    color: "#666",
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
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});
