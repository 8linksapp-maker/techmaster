<template>
    <div class="header-main">
        <HeaderTopBar class="hidden lg:block" />
        <div class="header-middle py-4 border-b-[1px] border-[#f3f3f3]">
            <div class="container">
                <div class="grid grid-cols-4 items-center justify-between">
                    <div class="col-span-2 logo">
                        <n-link to="/">
                            <img src="/images/logo/logo.png" alt="logo">
                        </n-link>
                    </div>
                    <div class="col-span-2 text-right hidden lg:block rounded-lg overflow-hidden">
                        <n-link to="/">
                            <img src="/images/banners/Add-banner.jpg" alt="banner" class="hover:scale-110 transition-all duration-500">
                        </n-link>
                    </div>
                    <div class="col-span-2 text-right block lg:hidden">
                        <button class="text-xl w-11 h-11 leading-10 rounded-md border-[1px] border-[#ddd] hover:bg-primary hover:text-white hover:border-primary transition-all mr-2" @click="searchOpen = !searchOpen">
                            <i class="icofont-search"></i>
                        </button>
                        <button class="text-xl w-11 h-11 leading-10 rounded-md border-[1px] border-[#ddd] hover:bg-primary hover:text-white hover:border-primary transition-all" @click="navOpen = !navOpen">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="inline-block" height="1.5em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-bottom py-3 lg:py-0 hidden lg:block" :class="{ 'fixed top-0 left-0 w-full bg-white z-50 transition-all shadow-md animate-fadeInDown' : isSticky }">
            <div class="container">
                <div class="grid grid-cols-12 items-center">
                    <div class="col-span-6 md:col-span-9">
                        <Navigation color-variant="text-heading-light" />
                    </div>
                    <div class="col-span-6 md:col-span-3">
                        <div class="search-box relative">
                            <input v-model="searchInputText" type="search" placeholder="Search.." class=" text-heading-light border-1 rounded-md pl-3 pr-10 py-3 w-full focus:outline outline-primary outline-1" @keyup.enter="searchInputChangeHandler()">
                            <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary text-xl" aria-label="Search" @click="searchInputChangeHandler()">
                                <i class="icofont-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <OffCanvasMobileMenu :class="{'show-mobile-menu' : navOpen}" @toggleAsideMenu="navOpen = !navOpen" />
        <OffcanvasSearchBox :class="{'show-search-box' : searchOpen}" @searchToggle="searchOpen = !searchOpen" />
    </div>
</template>

<script>
    export default {
        components: {
            Navigation: () => import("~/components/header/Navigation"),
            HeaderTopBar: () => import("~/components/header/HeaderTopBar"),
            OffCanvasMobileMenu: () => import("~/components/header/OffCanvasMobileMenu"),
            OffcanvasSearchBox: () => import("~/components/header/OffcanvasSearchBox"),
        },
        data() {
            return {
                navOpen: false,
                searchOpen: false,
                isSticky: false,
                searchInputText: this.$route.params.search
            }
        },
        watch: {
            '$route' () {
                this.navOpen = false
                this.searchOpen = false
            }
        },
        mounted(){
            window.addEventListener('scroll', () => {
                const scroll = window.scrollY
                if(scroll >= 200){
                    this.isSticky = true
                } else {
                    this.isSticky = false
                }
            }) 
        },
        methods: {
            searchInputChangeHandler(){
                this.$router.push(`/search/${this.searchInputText}`);
            }
        },
    }
</script>