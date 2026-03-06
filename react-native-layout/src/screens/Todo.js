import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function TodoScreen() {
  const [task, setTask] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const handleAddTodo = () => {
    if (task.trim().length === 0) return;
    const newTodo = {
      id: Date.now().toString(),
      text: task,
      completed: false,
    };
    setTodoList([...todoList, newTodo]);
    setTask('');
  };


  const toggleTodo = (id) => {
    setTodoList(todoList.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };


  const deleteTodo = (id) => {
    setTodoList(todoList.filter(item => item.id !== id));
  };


  const filteredTodos = todoList.filter(item =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const renderTodoItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => toggleTodo(item.id)} style={styles.todoTextContainer}>
        <Ionicons
          name={item.completed ? "checkbox" : "square-outline"}
          size={24}
          color={item.completed ? "#4CAF50" : "#555"}
        />
        <Text style={[styles.itemText, item.completed && styles.completedText]}>
          {item.text}
        </Text>
      </TouchableOpacity>
     
      <TouchableOpacity onPress={() => deleteTodo(item.id)}>
        <Ionicons name="trash-outline" size={24} color="#FF5252" />
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <View style={styles.searchSection}>

          <Ionicons style={styles.searchIcon} name="search" size={20} color="#888"/>
          <TextInput
            style={styles.searchInput}
            placeholder="Search tasks..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>


      <FlatList
        data={filteredTodos}
        renderItem={renderTodoItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />



      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTodo}>
          <View style={styles.addWrapper}>
            <Ionicons name="add" size={30} color="white" />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b3d3ff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#2b54f8',
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#EEE',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEE',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    padding: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  itemContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  todoTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#AAA',
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 30,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: '80%',
  },
  addWrapper: {
    width: 55,
    height: 55,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

