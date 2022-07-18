<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <div class="header__block">
          <div>
            <h1>{{ title }}</h1>
          </div>
        </div>
        <!--header__block -->
        <nav class="nav">
          <router-link to="/" id="menu-button">
            <img alt="" src="menu.png" />
          </router-link>
        </nav>
      </div>
      <!-- header__wrapper -->
    </div>
    <!-- container -->
  </header>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style>
</style>