<template>
    <div class="theme-salmon">
        <HeaderTwo />
        <Nuxt />
        <Footer />
        <FooterBottom />
    </div>
</template>

<script>
    export default {
        mounted() {
            this.$nextTick(() => {
                this.$nuxt.$loading.start()
                setTimeout(() => this.$nuxt.$loading.finish(), 1000)
            })
        }
    };
</script>