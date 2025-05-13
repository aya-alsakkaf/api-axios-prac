import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Todo } from "../models/Todo";

interface TodoItemProps {
  todo: Todo;
  onToggle?: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
  const router = useRouter();

  const handleToggle = (e: any) => {
    e.stopPropagation();
    if (onToggle) {
      onToggle(todo.id);
    }
  };

  const handlePress = () => {
    router.push({
      pathname: "/screens/TodoDetails",
      params: { id: todo.id.toString() },
    });
  };

  return (
    <TouchableOpacity
      style={[styles.container, todo.completed && styles.completed]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <TouchableOpacity style={styles.checkbox} onPress={handleToggle}>
        {todo.completed && <View style={styles.checkmark} />}
      </TouchableOpacity>
      <Text style={[styles.title, todo.completed && styles.titleCompleted]}>
        {todo.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "white",
  },
  completed: {
    backgroundColor: "#f9f9f9",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#3498db",
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#3498db",
  },
  title: {
    fontSize: 16,
    flex: 1,
    color: "#333",
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
});
