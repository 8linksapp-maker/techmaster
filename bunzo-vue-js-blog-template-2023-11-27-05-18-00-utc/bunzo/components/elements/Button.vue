<template>
    <button class="bg-primary px-5 py-4 font-medium rounded-lg hover:text-white hover:bg-primary-dark transition-all" :class="styleVariant">
        {{ label }}
        <i v-if="icon" class="icofont-long-arrow-right text-xl align-middle"></i>
    </button>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: 'Learn more'
            },
            icon: {
               type: Boolean 
            },
            styleVariant: {
                type: String,
                default: ''
            }
        },
    };
</script>