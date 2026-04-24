import { useState } from "react";
import Ionicons from "@react-native-vector-icons/ionicons";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

const TodoScreen = () => {
    const [task, setTask] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const todoList = useQuery(api.todos.get);
    const addTodo = useMutation(api.todos.add);
    const toggleTodoMutation = useMutation(api.todos.toggle);
    const deleteTodoMutation = useMutation(api.todos.remove);

    if (todoList === undefined) {
        return <Text>Loading tasks...</Text>;
    }

    const filterTodos = todoList.filter(item =>
        item.text.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
    );


    const handleAddTodo = async () => {
        if (task.trim().length === 0) return;
        await addTodo({ text: task });
        setTask('');
    };

        const toggleTodo = (id: Id<"todos">, currentStatus: boolean) => {
        toggleTodoMutation({ id, isCompleted: !currentStatus });
    };

    const confirmDelete = (id: Id<"todos">) => {
        Alert.alert("Delete Task", "Are you sure you want to remove this?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => deleteTodoMutation({ id })
            },
        ]);
    };

        return (
        <View style={styles.container}>
            {/* 1. Header Section (Purple) */}
            <View style={styles.header}>
                <Text style={styles.title}>My Tasks</Text>
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={20} color="#666" />
                    <TextInput
                        placeholder="Search todos..."
                        style={styles.searchBar}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* 2. Body Section (White with Rounded Top) */}
            <View style={styles.bodyContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {filterTodos.map(item => (
                        <View style={styles.todoItem} key={item._id}>
                            <TouchableOpacity style={styles.textWrapper} onPress={() => toggleTodo(item._id, item.isCompleted)}>
                                <Ionicons
                                    name={item.isCompleted ? "checkmark-circle" : "ellipse-outline"}
                                    size={28}
                                    color={item.isCompleted ? "#7D7AFF" : "#CCC"}
                                />
                                <Text style={[styles.todoText, item.isCompleted && styles.todoCompleted]}>
                                    {item.text}
                                </Text>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => confirmDelete(item._id)}>
                                <Ionicons name="trash-outline" size={24} color="#FF5252" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                {/* 3. Input Section */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
                >
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Add a new task"
                            style={styles.input}
                            value={task}
                            onChangeText={setTask}
                        />
                        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
                            <Ionicons name="add" size={32} color="black" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7D7AFF", // Consistent Purple theme
    },
    header: {
        paddingTop: 70,
        paddingHorizontal: 30,
        paddingBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 15,
        paddingHorizontal: 15,
    },
    searchBar: {
        flex: 1,
        height: 50,
        marginLeft: 10,
    },

    bodyContainer: {
        flex: 1,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 50, // Consistent with Login screen
        borderTopRightRadius: 50,
        paddingHorizontal: 30,
        paddingTop: 40,
    },
    todoItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 20,
        marginBottom: 15,
        borderWidth: 1,         // Using border instead of shadow
        borderColor: "#F0F0F0",
    },
    textWrapper: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    todoText: {
        fontSize: 16,
        color: "#333",
        marginLeft: 12,
    },

    todoCompleted: {
        textDecorationLine: "line-through",
        color: "#AAA",
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 30,
        paddingTop: 10,
    },
    input: {
        flex: 1,
        height: 55,
        backgroundColor: "#F5F5F5", // Light gray inputs
        borderRadius: 15,
        paddingHorizontal: 20,
    },
    addButton: {
        backgroundColor: "#FFCC00", // Golden Yellow accent
        borderRadius: 15,
        width: 55,
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 15,
    },
});

export default TodoScreen;
