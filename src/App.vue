<template>
  <header class="flex-v-center">I'm the Header</header>

  <main>
    <weapon></weapon>
  </main>
</template>

<script>
import Weapon from './pages/Weapon/Weapon.vue';

export default {
  name: 'App',
  components: { Weapon },
};
</script>
