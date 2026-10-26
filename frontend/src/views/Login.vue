<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12 pa-4">
          <v-card-title class="text-h5 text-center font-weight-bold">
            Panel Admin - Esports
          </v-card-title>
          
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="nombre"
                label="Usuario"
                prepend-icon="mdi-account"
                type="text"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Contraseña"
                prepend-icon="mdi-lock"
                type="password"
                required
              ></v-text-field>

              <v-alert v-if="errorMsg" type="error" density="compact" class="mb-4">
                {{ errorMsg }}
              </v-alert>

              <v-btn color="primary" block type="submit" class="mt-4">
                Iniciar Sesión
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api.js';

const router = useRouter();
const nombre = ref('');
const password = ref('');
const errorMsg = ref('');

const handleLogin = async () => {
  try {
    errorMsg.value = '';
    
    await api.post('/v1/auth/login', {
      nombre: nombre.value,
      password: password.value
    });

   
    router.push('/admin/dashboard');
  } catch (error) {
    errorMsg.value = error.response?.data?.message || 'Error al iniciar sesión';
  }
};
</script>