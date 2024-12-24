<template>
  <div class="app-container">
    <!-- This will render the child components based on the route -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
.app-container {
  min-height: 100vh;
}
</style>
