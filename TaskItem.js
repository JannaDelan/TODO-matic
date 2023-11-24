import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default TaskItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(props.task);

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditedTask(props.task);
  };

  const saveEditing = () => {
    setIsEditing(false);
    props.editTask(props.index - 1, editedTask);
  };

  return (
    <View style={styles.container}>
      <View style={styles.indexContainer}>
        <Text style={styles.index}>{props.index}</Text>
      </View>
      <View style={styles.taskContainer}>
        {!isEditing ? (
          <>
            <Text style={styles.task}>{props.task}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={startEditing}>
                <MaterialIcons style={styles.edit} name="edit" size={18} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.deleteTask()}>
                <MaterialIcons style={styles.delete} name="delete" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <TextInput
              style={styles.editInput}
              value={editedTask}
              onChangeText={(text) => setEditedTask(text)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={saveEditing}>
                <MaterialIcons style={styles.save} name="save" size={18} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelEditing}>
                <MaterialIcons style={styles.cancel} name="cancel" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  indexContainer: {
    backgroundColor: 'black',
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  index: {
    color: '#fff',
    fontSize: 20,
  },
  taskContainer: {
    backgroundColor: 'black',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 50,
  },
  task: {
    color: '#fff',
    width: '70%',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  editInput: {
    color: '#fff',
    width: '70%',
    fontSize: 16,
  },
  edit: {
    marginRight: 10,
  },
  delete: {},
  save: {
    marginRight: 10,
  },
  cancel: {},
});