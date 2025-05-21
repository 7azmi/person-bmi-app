<template>
  <div id="app">
    <nav>
      <router-link to="/">Home (View All)</router-link> |
      <router-link to="/add">Add Person</router-link> |
      <router-link to="/stats">Statistics</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
/* Keep existing styles from previous echo command for App.vue */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983; /* Vue green */
}
body {
    font-family: "Segoe UI", sans-serif;
    background-color: #f4f7f9;
    padding: 20px;
    margin: 0;
}
.container {
    max-width: 700px;
    margin: auto;
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
h2,
h3 {
    border-bottom: 2px solid #42b983;
    padding-bottom: 10px;
}
form {
    margin-bottom: 20px;
}
input[type="text"], input[type="number"] {
    display: block;
    width: calc(100% - 22px);
    padding: 10px;
    margin-bottom: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    box-sizing: border-box;
}
button {
    background-color: #42b983;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}
button:hover {
    background-color: #36a46f;
}
ul {
    padding: 0;
    list-style: none;
}
li {
    background: #f0f9f5;
    padding: 15px;
    margin-bottom: 10px;
    border-left: 5px solid #42b983;
    border-radius: 5px;
}
</style>
