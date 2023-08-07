<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'; // Import useStore from vuex

// Data properties
const email = ref('');
const password = ref('');
const csrfToken = ref('');

const store = useStore(); // Use the vuex store

// Fetch CSRF token when the component is created
onMounted(() => {
  fetchCSRFToken();
});

// Fetch CSRF token from the server and store it
const fetchCSRFToken = () => {
  axios.get('http://localhost:8000/api/csrf/restore', {
    withCredentials: true,
  })
  .then(response => {
    csrfToken.value = response.data['XSRF-Token'];
  })
  .catch(error => {
    console.error('Error fetching CSRF token:', error);
  });
};

// Handle login
const loginUser = () => {
  const formData = {
    credential: email.value,
    password: password.value,
  };

  axios.post('http://localhost:8000/api/login', formData, {
    headers: {
      'X-CSRF-TOKEN': csrfToken.value,
    },
    withCredentials: true,
  })
  .then(response => {
    console.log('Login successful!');

    // Dispatch the setAuthenticated action
    store.dispatch('setAuthenticated', true);

    router.push('/user-options');
  })
  .catch(error => {
    console.error('Login failed:', error);
  });
};

const router = useRouter();
</script>

<template>
  <h1>Login</h1>

  <div class="flex-class">
    <form @submit.prevent="loginUser">
      <input type="text" name="credential" id="emailInput" v-model="email" />
      <input type="password" name="password" id="passwordInput" v-model="password" />
      <div id="buttonsId">
        <button id="signUpBtn">SIGN UP</button>
        <button id="loginBtn" type="submit">LOGIN</button>
      </div>
    </form>
  </div>
</template>

<style>
h1 {
  width: 100%;
}

#signUpBtn {
  background-color: Gray;
  color: white;
}
#loginBtn {
  background-color: green;
  color: white;
}

.flex-class {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  justify-items: space-around;
}

#buttonsId {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

button {
  width: 40%;
  height: 50px;
  border-radius: 10px;
  margin: 10px 0 10px 0;
  font-size: 20px;
  font-weight: bold;
}

#emailInput,
#passwordInput {
  width: 100%;
  margin: 10px 0 10px 0;
  height: 50px;
  font-size: 26px;
  border-radius: 10px;
}
</style>
