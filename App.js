import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Modal, TextInput, AsyncStorage } from "react-native";
import TaskList from "./src/components/TaskList";
import * as Animatable from "react-native-animatable";

import { Ionicons } from "@expo/vector-icons";

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {
  
  //representa as anotações
  const [task, setTask] = useState([]);
  //constante para passar ao MODAL para manipulá-lo
  const [open, setOpen] = useState(false);
  // representa o Input
  const [input, setInput] = useState("");

  //Buscando todas as tarefas ao iniciar o app
  useEffect(() => {
    async function loadTask() {

      const taskStorage = await AsyncStorage.getItem("@task");
      
      if (taskStorage) {
        setTask(JSON.parse(taskStorage));
      } 

    }

    loadTask();

  }, []);

  //salvando tarefas caso tenha uma mudança
  useEffect(() => {

    async function saveTasks() {
      await AsyncStorage.setItem("@task", JSON.stringify(task));
    }

    saveTasks();
  }, [task]);

  function handleAdd() {
    if (input === "") return;

    const data = {
      key: input,
      task: input
    };

    setTask([...task, data]);
    setOpen(false);
    setInput("");
  }

  const handleDelete = useCallback((data) => {
    const find = task.filter(r => r.key !== data.key);
    setTask(find);
  })

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar backgroundColor="#171d31" barStyle="light-content" />

      <View>
        <Text style={styles.title}>Márcio cabelos</Text>
      </View>

      <FlatList
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false}
        data={task}
        keyExtractor={ (item) => String(item.key)}
        renderItem={ ({ item }) => <TaskList data={item} handleDelete={handleDelete} />}
      />

      <View>
        <Text style={styles.dev}>Dev: Lucas Dias - @_lucasdias08 - ld.lucasdias10@gmail.com</Text>
      </View>

      <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView style={styles.modal}>

          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Ionicons style={{ marginLeft: 5, marginRight: 5 }} name="md-arrow-back" size={40} color={"#fff"} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              Novo nome na lista
            </Text>
          </View>

          <Animatable.View
            animation="fadeInUp"
            useNativeDriver>
            <TextInput style={styles.modalBody}
              placeholder="Próximo da lista:"
              placeholderTextColor="#747474"
              multiline={true}
              autoCorrect={false}
              style={styles.input}
              value={input}
              onChangeText={(texto) => setInput(texto)}
            />

            <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
              <Text style={styles.handleAddText}>Adicionar</Text>
            </TouchableOpacity>
          </Animatable.View>

        </SafeAreaView>
      </Modal>

      <AnimatedBtn style={styles.fab}
        useNativeDriver
        animation="bounceInUp"
        duration={1500}
        onPress={() => setOpen(true)}
      >
        <Ionicons name="ios-add"
          size={35}
          color="#FFF"
        />
      </AnimatedBtn>

    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171d31",
  },
  title: {
    marginTop: 30,
    paddingBottom: 10,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF"
  },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "#0094ff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    right: 10,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3
    }
  },
  dev: {
    marginBottom: 0,
    fontSize: 15,
    textAlign: "center",
    color: "#FFF"
  },
  modal: {
    flex: 1,
    backgroundColor: "#171d31",
  },
  modalHeader: {
    marginLeft: 10,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  modalTitle: {
    marginLeft: 15,
    fontSize: 23,
    color: "#fff"
  },
  modalBody: {
    marginTop: 15
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: "#fff",
    padding: 9,
    height: 85,
    textAlignVertical: "top",
    color: "#000",
    borderRadius: 5
  },
  handleAdd: {
    backgroundColor: "#fff",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 5
  },
  handleAddText: {
    fontSize: 15
  }
})
