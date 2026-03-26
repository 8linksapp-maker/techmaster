<template>
    <div class="fixed top-0 left-0 w-screen h-screen opacity-0 invisible z-50 transition-all">
        <div class="top-0 left-0 w-full h-full absolute bg-black bg-opacity-80 content-['']" @click="$emit('toggleAsideMenu')"></div>
        <div class="mobile-menu-inner relative w-[400px] max-w-[80%] h-full text-left bg-white -translate-x-full transition-all">
            <button aria-label="Settings" class="absolute top-0 left-full w-16 h-16 text-4xl text-heading-light hover:text-primary bg-white group" @click="$emit('toggleAsideMenu')">
                <i class="icofont-close-line group-hover:rotate-180 block transition-all duration-500"></i>
            </button>
            <div class="h-full overflow-y-auto">
                <div class="px-5 py-8">
                    <div class="menu-navigation">
                        <ResponsiveMobileMenu />
                    </div>
                    <div class="mt-8">
                        <ul class="space-y-2.5">
                            <li>
                                <i class="icofont-phone"></i>
                                <a class="pl-2.5 hover:text-primary" href="callto:0123456789">0123456789</a>
                            </li>
                            <li>
                                <i class="icofont-envelope"></i>
                                <a class="pl-2.5 hover:text-primary" href="mailto:info@yourdomain.com">info@yourdomain.com</a>
                            </li>
                        </ul>
                    </div>

                    <div class="mt-8">
                        <div class="flex items-center space-x-7">
                            <SocialIcon icon="icofont-facebook" url="https://www.facebook.com/" style-class="w-auto h-auto leading-none bg-transparent hover:bg-transparent hover:text-primary" />
                            <SocialIcon icon="icofont-twitter" url="https://twitter.com/" style-class="w-auto h-auto leading-none bg-transparent hover:bg-transparent hover:text-primary" />
                            <SocialIcon icon="icofont-skype" url="https://www.skype.com/" style-class="w-auto h-auto leading-none bg-transparent hover:bg-transparent hover:text-primary" />
                            <SocialIcon icon="icofont-linkedin" url="https://www.linkedin.com/" style-class="w-auto h-auto leading-none bg-transparent hover:bg-transparent hover:text-primary" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
            ResponsiveMobileMenu: () => import('@/components/header/ResponsiveMobileMenu'),
            SocialIcon: () => import('@/components/elements/SocialIcon'),
        },
    };
</script>

<style lang="scss">
    .show-mobile-menu {
        @apply opacity-100 visible;
    }
    .show-mobile-menu .mobile-menu-inner {
        @apply transform-none;
    }
</style>