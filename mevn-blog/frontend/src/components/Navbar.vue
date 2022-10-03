<template>
  <nav class="navbar is-warning" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="{ name: 'Home' }" class="navbar-item">
        <img src="https://avatars.githubusercontent.com/u/6128107?s=280&v=4" width="40" height="28">
      </router-link>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <strong class="navbar-item">Vue.Js CRUD API</strong>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link :to="{ name: 'Create' }" class="button is-dark">
              <strong>Create</strong>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>