<template>
    <p class="pl-5">{{ readingTime }} min read</p>
</template>

<script>
    export default {
        props: {
            content: {
                type: String,
                default: ''
            },
        },
        computed: {
            readingTime () {
                let minutes = 0;
                const contentString = JSON.stringify(this.content);
                const words = contentString.split(" ").length;
                const wordsPerMinute = 100;
                minutes = Math.ceil(words / wordsPerMinute);
                return minutes;
            }
        }
    }
</script>