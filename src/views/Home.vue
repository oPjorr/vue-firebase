<template>
  <v-container class="pa-8" fluid>
    <h1 class="h1">Minha Lista de Tarefas</h1>
    <v-form>
      <v-text-field
        label="Nova Tarefa"
        v-model="novaTarefa"
        @keydown.enter="adicionar"
      >
        <v-icon slot="append" @click="adicionar">mdi-send</v-icon>
      </v-text-field>
    </v-form>
    <v-divider></v-divider>
    <v-list>
      <v-list-item-group>
        <v-list-item
          v-for="tarefa of tarefas"
          :key="tarefa.id"
          :class="{ removed: tarefa.checked }"
        >
          <label>{{ tarefa.titulo }}</label>
          <v-spacer></v-spacer>
          <v-icon>mdi-calendar-month</v-icon>
           {{tarefa.dataGravacao}}
          <input type="checkbox" class="checado" v-model="tarefa.checked" />
          <v-icon @click="deleteTask(tarefa.id)"
            >mdi-delete</v-icon
          >
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  data() {
    return {
      uid: "",
      novaTarefa: "",
      tarefas: [],
      data: new Date(),
    };
  },
  mounted() {
    this.uid = fb.auth.currentUser.uid;
    this.buscarTarefasDoServidor();
  },
  methods: {
    async buscarTarefasDoServidor() {
      this.tarefas = [];
      const logTasks = await fb.tasksCollection
        .where("owner", "==", this.uid)
        .get();
      for (const doc of logTasks.docs) {
        this.tarefas.push({
          id: doc.id,
          titulo: doc.data().titulo,
          dataGravacao: doc.data().dataGravacao,
          checked: false,
        });
      }
    },
    async adicionar() {
      await fb.tasksCollection.add({
        titulo: this.novaTarefa,
        dataGravacao:
          this.data.getDate() +
          "/" +
          (this.data.getMonth() + 1) +
          "/" +
          this.data.getFullYear(),
        owner: this.uid,
      });
      this.novaTarefa = "";
      this.buscarTarefasDoServidor();
    },
    async deleteTask(id) {
      await fb.tasksCollection.doc(id).delete();
      this.buscarTarefasDoServidor();
    },
  },
};
</script>

<style>
.removed label {
  text-decoration: line-through;
  color: red;
}

.checado {
  width: 50px;
  height: 20px;
}
</style>
