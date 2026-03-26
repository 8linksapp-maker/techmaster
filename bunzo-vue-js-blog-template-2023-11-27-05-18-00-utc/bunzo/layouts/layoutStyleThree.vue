<template>
    <div class="theme-blue">
        <HeaderThree />
        <Nuxt />
        <FooterStyleTwo />
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