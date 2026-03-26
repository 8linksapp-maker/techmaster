<template>
    <div class="main">
        <Header />
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