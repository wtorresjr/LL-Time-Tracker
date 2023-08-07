<template>
  <h1>THIS PAGE REQUIRES AUTHENTICATION</h1>
  <router-link to="/" id="loginRedir">GO TO LOGIN</router-link>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;
  }
}
* {
  margin: 0;
  padding: 0;
}
#loginRedir {
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  text-align: center;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

h1 {
  text-align: center;
}
</style>
