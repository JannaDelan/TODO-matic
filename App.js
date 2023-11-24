import React, { useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import TaskInputField from './components/TaskInputField';
import TaskItem from './components/TaskItem';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const addTask = (task) => {
    if (editIndex !== -1) {
      // Editing existing task
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = task;
      setTasks(updatedTasks);
      setEditIndex(-1);
    } else {
      // Adding new task
      setTasks([...tasks, task]);
    }
    Keyboard.dismiss();
  };

  const deleteTask = (deleteIndex) => {
    setTasks(tasks.filter((_, index) => index !== deleteIndex));
    setEditIndex(-1); // Reset editIndex when deleting a task
  };

  const editTask = (editIndex) => {
    setEditIndex(editIndex);
  };

  return (
    <ImageBackground
      source={require('./assets/dark.jpg')} // Update the path accordingly
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>TODOMATIC</Text>
        <ScrollView style={styles.scrollView}>
          {tasks.map((task, index) => (
            <View key={index} style={styles.taskContainer}>
              <TaskItem
                index={index + 1}
                task={task}
                deleteTask={() => deleteTask(index)}
                editTask={() => editTask(index)}
              />
            </View>
          ))}
        </ScrollView>
        <TaskInputField
          addTask={addTask}
          editMode={editIndex !== -1}
          editTaskText={tasks[editIndex]}
          updateTask={(updatedTask) => addTask(updatedTask)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add an overlay to make text more readable
  },
  heading: {
    color: 'white',
    fontSize: 40,
    fontWeight: '600',
    marginTop: 40,
    marginBottom: 10,
    marginLeft: 120,
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  },
});
