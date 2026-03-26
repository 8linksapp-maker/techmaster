<template>
    <div class="header-main" :class="{ 'fixed top-0 left-0 w-full bg-white z-50 transition-all shadow-md animate-fadeInDown' : isSticky }">
        <div class="py-4 lg:py-1" >
            <div class="container">
                <div class="grid grid-cols-4 items-center justify-between">
                    <div class="col-span-2 lg:col-span-1 logo">
                        <n-link to="/">
                            <img src="/images/logo/logo.png" alt="logo">
                        </n-link>
                    </div>
                    <div class="col-span-2 lg:col-span-3 hidden lg:block ml-auto">
                        <Navigation color-variant="text-primary" />
                    </div>
                    <div class="col-span-2 text-right block lg:hidden">
                        <button class="text-primary text-xl w-11 h-11 leading-10 rounded-md border-[1px] border-primary hover:bg-primary hover:text-white hover:border-primary transition-all mr-2" @click="searchOpen = !searchOpen">
                            <i class="icofont-search"></i>
                        </button>
                        <button class="text-primary text-xl w-11 h-11 leading-10 rounded-md border-[1px] border-primary hover:bg-primary hover:text-white hover:border-primary transition-all" @click="navOpen = !navOpen">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="inline-block" height="1.5em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path></svg>
                        </button>
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
            OffCanvasMobileMenu: () => import("~/components/header/OffCanvasMobileMenu"),
            OffcanvasSearchBox: () => import("~/components/header/OffcanvasSearchBox"),
        },

        data() {
            return {
                navOpen: false,
                searchOpen: false,
                isSticky: false
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
        }
    }
</script>