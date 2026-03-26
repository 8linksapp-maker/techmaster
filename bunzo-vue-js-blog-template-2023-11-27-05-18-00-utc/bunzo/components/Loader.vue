<template>
  <div v-if="loading" class="fixed z-50 w-full h-screen bg-white overflow-hidden flex justify-center items-center">
      <div class="animate-spinner w-10 h-10 my-[100px] mx-auto bg-primary rounded-full"></div>
  </div>
</template>

<script>
    export default {
        data: () => ({
            loading: false
        }),
        methods: {
            start() {
                this.loading = true
            },
            finish() {
                this.loading = false
            }
        }
    }
</script>