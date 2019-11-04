<template>
  <nav class="nav">
    <button class="button" @click="onClickLogin">
      プロラボアカウントでログイン
    </button>
  </nav>
</template>

<script>
export default {
  methods: {
    onClickLogin() {
      this.$auth.loginWith('prolab');
    },
  },
};
</script>

<style>

</style>
