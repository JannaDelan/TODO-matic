import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default TaskInputField = (props) => {
  const [task, setTask] = useState('');

  useEffect(() => {
    // Update input field when in edit mode
    if (props.editMode) {
      setTask(props.editTaskText);
    } else {
      setTask('');
    }
  }, [props.editMode, props.editTaskText]);

  const handleAddTask = () => {
    if (task.trim()) {
      if (props.editMode) {
        // Update existing task
        props.updateTask(task);
      } else {
        // Add new task
        props.addTask(task);
      }
      setTask('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TextInput
        style={styles.inputField}
        value={task}
        onChangeText={(text) => setTask(text)}
        placeholder={'Enter a task...'}
        placeholderTextColor={'#fff'}
      />
      <TouchableOpacity onPress={handleAddTask}>
        <View style={styles.button}>
          <MaterialIcons name={props.editMode ? 'update' : 'keyboard-arrow-up'} size={24} color="black" />
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#fff',
    backgroundColor: 'black',
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 20,
  },
  inputField: {
    color: '#fff',
    height: 50,
    flex: 1,
  },
  button: {
    height: 30,
    width: 30,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});