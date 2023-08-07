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

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      csrfToken: ''
    }
  },
  created() {
    // Fetch CSRF token from the server and store it in the Vue instance
    axios
      .get('http://localhost:8000/api/csrf/restore')

      .then((response) => {
        this.csrfToken = response.data.csrfToken
      })
      .catch((error) => {
        console.error('Error fetching CSRF token:', error)
      })
  },
  methods: {
    loginUser() {
      const formData = {
        credential: this.email,
        password: this.password
        // Add other form data if needed
      }

      // Include the CSRF token in the request header
      axios
        .post('http://localhost:8000/api/login', formData, {
          headers: {
            'X-CSRF-TOKEN': this.csrfToken
          
          },
          withCredentials: true
        })
        .then((response) => {
          // Assuming you receive a success response here,
          // you can redirect the user to another page or perform other actions.
          console.log('Login successful!')
        })
        .catch((error) => {
          // Handle error response
          console.error('Login failed:', error)
        })
    }
  }
}
</script>

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
