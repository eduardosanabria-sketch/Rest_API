<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="d-flex align-center pa-4">
        <v-icon icon="mdi-tournament" class="mr-2"></v-icon>
        Gestión de Rosters
        <v-spacer></v-spacer>
        
        <v-btn color="primary" prepend-icon="mdi-plus" @click="openDialog()">
          Nuevo Roster
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

     
      <v-data-table
        :headers="headers"
        :items="rosters"
        item-value="id"
        :loading="loading"
        loading-text="Cargando rosters..."
        no-data-text="No hay rosters registrados"
      >
       
        <template v-slot:item.id="{ item }">
          {{ item.id ?? item.raw?.id ?? 'Sin ID' }}
        </template>

       
        <template v-slot:item.Nombre="{ item }">
          {{ item.Nombre ?? item.nombre ?? item.raw?.Nombre ?? item.raw?.nombre ?? 'Sin Nombre' }}
        </template>

        
        <template v-slot:item.Tipo="{ item }">
          {{ item.Tipo ?? item.tipo ?? item.raw?.Tipo ?? item.raw?.tipo ?? '-' }}
        </template>

       
        <template v-slot:item.Temporada="{ item }">
          {{ item.Temporada ?? item.temporada ?? item.raw?.Temporada ?? item.raw?.temporada ?? '-' }}
        </template>

        
        <template v-slot:item.cantidad_jugadores="{ item }">
          {{ item.cantidad_jugadores ?? item.raw?.cantidad_jugadores ?? 0 }}
        </template>

       
        <template v-slot:item.acciones="{ item }">
          <v-icon size="small" color="primary" class="mr-2" @click="openManagePlayers(item)" title="Gestionar Jugadores">
            mdi-account-multiple-plus
          </v-icon>
          <v-icon size="small" color="info" class="mr-2" @click="openDialog(item)" title="Editar Roster">
            mdi-pencil
          </v-icon>
          <v-icon size="small" color="error" @click="deleteRoster(item)" title="Eliminar Roster">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="pa-4">
          <span class="text-h5">{{ isEditing ? 'Editar Roster' : 'Nuevo Roster' }}</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="editedItem.Nombre"
              label="Nombre del Roster"
              required
            ></v-text-field>

            <v-text-field
              v-model="editedItem.Juego"
              label="Juego"
              required
            ></v-text-field>

            <v-select
              v-model="editedItem.Tipo"
              :items="['Principal', 'Academy']"
              label="Tipo de Roster"
              required
            ></v-select>

            <v-text-field
              v-model="editedItem.Temporada"
              label="Temporada (ej. 2026)"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="closeDialog">Cancelar</v-btn>
          <v-btn color="primary" @click="saveRoster">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    
    <v-dialog v-model="playerDialog" max-width="750px">
      <v-card>
        <v-card-title class="pa-4 d-flex align-center">
          <span>Jugadores del Roster: <strong>{{ activeRoster?.Nombre }}</strong></span>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" variant="text" @click="playerDialog = false"></v-btn>
        </v-card-title>

        <v-card-text>
         
          <v-row class="mb-4 align-center">
            <v-col cols="12" sm="6">
              <v-select
                v-model="newAssignment.id_jugador"
                :items="availablePlayers"
                item-title="Nombre"
                item-value="id"
                label="Seleccionar Jugador"
                density="compact"
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                v-model="newAssignment.rol_en_roster"
                :items="['titular', 'suplente']"
                label="Rol en el Roster"
                density="compact"
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" sm="2">
              <v-btn color="primary" block @click="assignPlayer">Asignar</v-btn>
            </v-col>
          </v-row>

          <v-divider class="mb-4"></v-divider>

         
          <h4 class="text-subtitle-1 mb-2">Jugadores Asignados Actualmente</h4>
          <v-data-table
            :headers="playerHeaders"
            :items="currentRosterPlayers"
            density="compact"
            no-data-text="No hay jugadores en este roster"
          >
            <template v-slot:item.acciones="{ item }">
              <v-icon size="small" color="error" @click="removePlayer(item.id)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const rosters = ref([]);
const loading = ref(false);
const dialog = ref(false);
const isEditing = ref(false);
const valid = ref(false);


const playerDialog = ref(false);
const activeRoster = ref(null);
const currentRosterPlayers = ref([]);
const availablePlayers = ref([]);

const newAssignment = ref({
  id_jugador: null,
  rol_en_roster: 'titular'
});

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Nombre', key: 'Nombre' },
  { title: 'Juego', key: 'Juego' },
  { title: 'Tipo', key: 'Tipo' },
  { title: 'Temporada', key: 'Temporada' },
  { title: 'Jugadores', key: 'cantidad_jugadores' },
  { title: 'Acciones', key: 'acciones', sortable: false }
];

const playerHeaders = [
  { title: 'Nombre', key: 'Nombre' },
  { title: 'Rol', key: 'Rol' },
  { title: 'Rol en Roster', key: 'Roster_Jugador.rol_en_roster' },
  { title: 'Acciones', key: 'acciones', sortable: false }
];

const defaultItem = { 
  id: null, 
  Nombre: '', 
  Juego: '', 
  Tipo: 'Principal', 
  Temporada: ''
};
const editedItem = ref({ ...defaultItem });

const fetchRosters = async () => {
  loading.value = true;
  try {
    const res = await api.get(`/v1/rosters?_t=${Date.now()}`);
    rosters.value = res.data.map(r => {
      const raw = r?.raw ?? r?.value ?? r;
      return {
        id: raw.id ?? raw.ID ?? raw.Id,
        Nombre: raw.Nombre ?? raw.nombre ?? '',
        Juego: raw.Juego ?? raw.juego ?? '',
        Tipo: raw.Tipo ?? raw.tipo ?? '',
        Temporada: raw.Temporada ?? raw.temporada ?? '',
        cantidad_jugadores: raw.cantidad_jugadores ?? 0
      };
    });
  } catch (error) {
    console.error('Error al cargar rosters:', error);
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
      Juego: rawItem.Juego ?? rawItem.juego ?? '',
      Tipo: rawItem.Tipo ?? rawItem.tipo ?? 'Principal',
      Temporada: rawItem.Temporada ?? rawItem.temporada ?? ''
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

const saveRoster = async () => {
  try {
    if (isEditing.value && editedItem.value.id) {
      await api.put(`/v1/rosters/${editedItem.value.id}`, editedItem.value);
    } else {
      await api.post('/v1/rosters', editedItem.value);
    }
    await fetchRosters();
    closeDialog();
  } catch (error) {
    console.error('Error al guardar roster:', error.response?.data || error.message);
  }
};

const deleteRoster = async (item) => {
  const rawItem = item?.raw ?? item?.value ?? item;
  const id = rawItem?.id ?? rawItem?.ID ?? rawItem?.Id;

  if (!id) {
    alert('No se pudo identificar el ID del roster.');
    return;
  }

  if (confirm('¿Estás seguro de que deseas eliminar este roster?')) {
    try {
      await api.delete(`/v1/rosters/${id}`);
      await fetchRosters();
    } catch (error) {
      console.error('Error al eliminar roster:', error);
    }
  }
};


const openManagePlayers = async (item) => {
  const rawItem = item?.raw ?? item?.value ?? item;
  activeRoster.value = rawItem;
  
  await fetchRosterDetails(rawItem.id);
  await fetchAvailablePlayers();
  
  playerDialog.value = true;
};

const fetchRosterDetails = async (rosterId) => {
  try {
    const res = await api.get(`/v1/rosters/${rosterId}`);
    currentRosterPlayers.value = res.data.Jugadores || [];
  } catch (error) {
    console.error('Error al cargar detalle del roster:', error);
  }
};

const fetchAvailablePlayers = async () => {
  try {
    const res = await api.get('/v1/jugadores');
    availablePlayers.value = res.data;
  } catch (error) {
    console.error('Error al cargar jugadores:', error);
  }
};

const assignPlayer = async () => {
  if (!newAssignment.value.id_jugador) return;
  try {
    await api.post(`/v1/rosters/${activeRoster.value.id}/jugadores`, newAssignment.value);
    await fetchRosterDetails(activeRoster.value.id);
    await fetchRosters(); 
    newAssignment.value.id_jugador = null;
  } catch (error) {
    alert(error.response?.data?.error || 'Error al asignar jugador');
  }
};

const removePlayer = async (idJugador) => {
  try {
    await api.delete(`/v1/rosters/${activeRoster.value.id}/jugadores/${idJugador}`);
    await fetchRosterDetails(activeRoster.value.id);
    await fetchRosters(); 
  } catch (error) {
    console.error('Error al quitar jugador:', error);
  }
};

onMounted(() => {
  fetchRosters();
});
</script>