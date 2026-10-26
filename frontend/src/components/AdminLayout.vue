<template>
  <v-app>
    <!-- Barra lateral -->
    <v-navigation-drawer v-model="drawer" permanent>
      <v-list-item title="Esports Admin" subtitle="Panel de Control"></v-list-item>
      <v-divider></v-divider>
      
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-account-group" title="Jugadores" to="/admin/jugadores"></v-list-item>
        <v-list-item prepend-icon="mdi-shield-account" title="Rosters" to="/admin/rosters"></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="error" prepend-icon="mdi-logout" @click="handleLogout">
            Cerrar Sesión
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Barra superior -->
    <v-app-bar>
      <v-app-bar-title>Gestión de Torneos y Roster</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../../src/services/api';

const router = useRouter();
const drawer = ref(true);

const handleLogout = async () => {
  try {
    // Llama al endpoint de logout para limpiar la cookie en el servidor/navegador
    await api.post('/v1/auth/logout');
    router.push('/login');
  } catch (error) {
    console.error('Error al cerrar sesión', error);
  }
};
</script>