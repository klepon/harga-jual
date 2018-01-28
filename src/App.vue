<template>
  <div class="container">
    <header class="row">
      <img class="logo" :src="logo" />
      <h1>{{storeName}}</h1>
    </header>
    <section id="vueApp">
      <router-view/>
    </section>
    <footer>
      <p>Footer app</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'vueApp',
  data() {
    return {
      logo: '/static/logo.png',
      storeName: 'Warung Gorengan',
    };
  },
};
</script>

<style>
header .logo {
  width: 50px;
  height: 50px;
}
</style>
