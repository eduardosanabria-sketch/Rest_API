<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="d-flex align-center pa-4">
        <v-icon icon="mdi-account-group" class="mr-2"></v-icon>
        Gestión de Jugadores
        <v-spacer></v-spacer>
        
        <v-btn color="primary" prepend-icon="mdi-plus" @click="openDialog()">
          Nuevo Jugador
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

    
      <v-data-table
        :headers="headers"
        :items="jugadores"
        item-value="id"
        :loading="loading"
        loading-text="Cargando jugadores..."
        no-data-text="No hay jugadores registrados"
      >
     
        <template v-slot:item.id="{ item }">
          {{ item.raw?.id ?? item.id ?? 'Sin ID' }}
        </template>

    
        <template v-slot:item.Nombre="{ item }">
          {{ item.raw?.Nombre ?? item.Nombre ?? 'Sin Nombre' }}
        </template>

      
        <template v-slot:item.acciones="{ item }">
          <v-icon size="small" color="info" class="mr-2" @click="openDialog(item)">
            mdi-pencil
          </v-icon>
          <v-icon size="small" color="error" @click="deleteJugador(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>


    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="pa-4">
          <span class="text-h5">{{ isEditing ? 'Editar Jugador' : 'Nuevo Jugador' }}</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="editedItem.Nombre"
              label="Nombre Real"
              required
            ></v-text-field>

            <v-text-field
              v-model="editedItem.Nickname"
              label="Nickname"
              required
            ></v-text-field>

            <v-text-field
              v-model="editedItem.Pais"
              label="País"
            ></v-text-field>

            <v-text-field
              v-model="editedItem.Rol"
              label="Rol"
            ></v-text-field>

            <v-select
              v-model="editedItem.Estado"
              :items="['activo', 'inactivo']"
              label="Estado"
              required
            ></v-select>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="closeDialog">Cancelar</v-btn>
          <v-btn color="primary" @click="saveJugador">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const jugadores = ref([]);
const loading = ref(false);
const dialog = ref(false);
const isEditing = ref(false);
const valid = ref(false);

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Nombre', key: 'Nombre' },
  { title: 'Nickname', key: 'Nickname' },
  { title: 'País', key: 'Pais' },
  { title: 'Rol', key: 'Rol' },
  { title: 'Estado', key: 'Estado' },
  { title: 'Acciones', key: 'acciones', sortable: false }
];

const defaultItem = { 
  id: null, 
  Nombre: '', 
  Nickname: '', 
  Pais: '', 
  Rol: '', 
  Estado: 'activo' 
};
const editedItem = ref({ ...defaultItem });

const fetchJugadores = async () => {
  loading.value = true;
  try {
    const res = await api.get(`/v1/jugadores?_t=${Date.now()}`);
    console.log("ESTRUCTURA REAL DEL JUGADOR:", res.data[0]); 
    
    jugadores.value = res.data.map(j => {
      const raw = j?.raw ?? j?.value ?? j;
      return {
        id: raw.id ?? raw.ID ?? raw.Id ?? raw.id_jugador ?? raw.PK_id,
        Nombre: raw.Nombre ?? raw.nombre ?? '',
        Nickname: raw.Nickname ?? raw.nickname ?? '',
        Pais: raw.Pais ?? raw.pais ?? '',
        Rol: raw.Rol ?? raw.rol ?? '',
        Estado: raw.Estado ?? raw.estado ?? 'activo'
      };
    });
  } catch (error) {
    console.error('Error al cargar jugadores:', error);
  } finally {
    loading.value = false;
  }
};

const openDialog = (item = null) => {
  const rawItem = item?.raw ?? item?.value ?? item;
  const itemId = rawItem?.id ?? rawItem?.ID ?? rawItem?.Id;

  if (rawItem && itemId) {
    isEditing.value = true;
    editedItem.value = { 
      id: itemId,
      Nombre: rawItem.Nombre ?? rawItem.nombre ?? '',
      Nickname: rawItem.Nickname ?? rawItem.nickname ?? '',
      Pais: rawItem.Pais ?? rawItem.pais ?? '',
      Rol: rawItem.Rol ?? rawItem.rol ?? '',
      Estado: rawItem.Estado ?? rawItem.estado ?? 'activo'
    };
  } else {
    isEditing.value = false;
    editedItem.value = { ...defaultItem };
  }
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  editedItem.value = { ...defaultItem };
};

const saveJugador = async () => {
  try {
    const jugadorId = editedItem.value.id;
    if (isEditing.value && jugadorId) {
      await api.put(`/v1/jugadores/${jugadorId}`, editedItem.value);
    } else {
      await api.post('/v1/jugadores', editedItem.value);
    }
    await fetchJugadores();
    closeDialog();
  } catch (error) {
    console.error('Error al guardar jugador:', error.response?.data || error.message);
  }
};

const deleteJugador = async (item) => {
  const rawItem = item?.raw ?? item?.value ?? item;
  const id = rawItem?.id ?? rawItem?.ID ?? rawItem?.Id;

  if (!id) {
    console.error('ID de jugador no válido para eliminar:', item);
    alert('No se pudo identificar el ID del jugador.');
    return;
  }

  if (confirm(`¿Estás seguro de que deseas eliminar este jugador?`)) {
    try {
      await api.delete(`/v1/jugadores/${id}`);
      await fetchJugadores();
    } catch (error) {
      console.error('Error al eliminar jugador:', error);
    }
  }
};

onMounted(() => {
  fetchJugadores();
});
</script>