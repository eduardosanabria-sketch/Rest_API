import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css'; 

// Importa la función para obtener el token CSRF desde tu api.js
import { fetchCsrfToken } from './services/api';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(router);
app.use(vuetify);

app.mount('#app');

// Solicita el token CSRF al iniciar la aplicación para que esté listo en las peticiones
fetchCsrfToken();