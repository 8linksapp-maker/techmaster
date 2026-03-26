<template>
        <a :href="url" aria-label="icon" target="_blank" class="w-11 h-11 text-heading-light bg-[#f4f4f4] block text-center leading-8  hover:bg-primary hover:text-white rounded-md" :class="styleClass">
            <i :class="icon"></i>
        </a>
</template>

<script>
    export default {
        props: {
            icon: {
                type: String,
                required: true
            },
            url: {
                type: String,
                default: '#'
            },
            styleClass: {
                type: String,
                default: ''
            }
        },
    }
</script>
