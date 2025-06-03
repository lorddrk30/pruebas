<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const username = ref('');
const password = ref('');
const error = ref('');

const login = async () => {
  try {
    const res = await axios.post('http://localhost:3000/login', {
      username: username.value,
      password: password.value,
    });
    localStorage.setItem('token', res.data.token);
    router.push('/mapa');
  } catch (err) {
    error.value = 'Login incorrecto';
  }
};
</script>

<template>
  <div class="login">
    <h1>Iniciar Sesión</h1>
    <div>
      <input v-model="username" placeholder="Usuario" />
    </div>
    <div>
      <input type="password" v-model="password" placeholder="Contraseña" />
    </div>
    <button @click="login">Entrar</button>
    <p style="color:red" v-if="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.login {
  max-width: 300px;
  margin: auto;
  padding: 1rem;
}
</style>
