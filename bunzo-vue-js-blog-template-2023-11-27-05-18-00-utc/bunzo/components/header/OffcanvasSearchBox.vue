<template>
    <div class="fixed top-0 left-0 w-screen h-screen opacity-0 invisible z-50 transition-all">
        <div class="top-0 left-0 w-full h-full absolute bg-black bg-opacity-80 content-['']" @click="$emit('searchToggle')"></div>
        <div class="mobile-search-inner p-5 relative w-full h-40 text-left bg-white -translate-y-full transition-all duration-500">
            <button class="absolute top-24 left-1/2 -translate-x-1/2 text-4xl hover:text-primary group" @click="$emit('searchToggle')">
                <i class="icofont-close-line group-hover:rotate-180 block transition-all duration-500"></i>
            </button>
            <div class="search-box relative">
                <input v-model="searchInputText" type="text" placeholder="Write your search keyword..." class="text-heading-light border-1 rounded-md pl-3 pr-15 py-3 w-full focus:border-primary focus:outline-none">
                <button aria-label="Search" class="w-12 h-full absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-primary text-xl rounded-tr-md rounded-br-md" @click="searchInputChangeHandler()">
                    <i class="icofont-search"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchInputText: this.$route.params.search
            }
        },
        methods: {
            searchInputChangeHandler(){
                this.$router.push(`/search/${this.searchInputText}`);
            }
        },
    };
</script>

<style lang="scss" scoped>
    .show-search-box {
        @apply opacity-100 visible;
    }
    .show-search-box .mobile-search-inner {
        @apply transform-none;
    }
</style>