<template>
    <div class="header-top bg-primary py-2">
        <div class="container">
            <div class="grid md:grid-cols-3 gap-4 items-center">
                <div class="header-top__menu">
                    <ul class="flex justify-center md:justify-start">
                        <li class="mr-4 pr-5 relative last:mr-0 after:content-[''] after:absolute after:w-1 after:h-1 after:top-1/2 after:transform after:-translate-y-1/2 after:right-0 after:bg-white after:rounded-full last:after:content-none">
                            <n-link to="/contact" class="text-white">Help</n-link>
                        </li>
                        <li class="mr-4 pr-5 relative last:mr-0 after:content-[''] after:absolute after:w-1 after:h-1 after:top-1/2 after:transform after:-translate-y-1/2 after:right-0 after:bg-white after:rounded-full last:after:content-none">
                            <n-link to="/about" class="text-white">Status</n-link>
                        </li>
                        <li class="mr-4 pr-5 relative last:mr-0 after:content-[''] after:absolute after:w-1 after:h-1 after:top-1/2 after:transform after:-translate-y-1/2 after:right-0 after:bg-white after:rounded-full last:after:content-none">
                            <n-link to="/about" class="text-white">Writers</n-link>
                        </li>
                    </ul>
                </div>

                <div class="header-top__info">
                    <ul class="flex justify-center text-white space-x-10">
                        <li class="flex items-center">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="text-2xl inline-block mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16.57 22a2 2 0 0 0 1.43-.59l2.71-2.71a1 1 0 0 0 0-1.41l-4-4a1 1 0 0 0-1.41 0l-1.6 1.59a7.55 7.55 0 0 1-3-1.59 7.62 7.62 0 0 1-1.59-3l1.59-1.6a1 1 0 0 0 0-1.41l-4-4a1 1 0 0 0-1.41 0L2.59 6A2 2 0 0 0 2 7.43 15.28 15.28 0 0 0 6.3 17.7 15.28 15.28 0 0 0 16.57 22zM6 5.41 8.59 8 7.3 9.29a1 1 0 0 0-.3.91 10.12 10.12 0 0 0 2.3 4.5 10.08 10.08 0 0 0 4.5 2.3 1 1 0 0 0 .91-.27L16 15.41 18.59 18l-2 2a13.28 13.28 0 0 1-8.87-3.71A13.28 13.28 0 0 1 4 7.41zM20 11h2a8.81 8.81 0 0 0-9-9v2a6.77 6.77 0 0 1 7 7z"></path><path d="M13 8c2.1 0 3 .9 3 3h2c0-3.22-1.78-5-5-5z"></path></svg>
                            <a class="text-white" href="callto:0123456789">0123456789</a>
                        </li>
                        <li class="flex items-center">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="text-xl inline-block mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"></path></svg>
                            <a class="text-white" href="mailto:address@gmail.com">address@gmail.com</a>
                        </li>
                    </ul>
                </div>

                <div class="header-top__weather flex justify-center md:justify-end items-center order-first md:order-last">
                    <div class="flex items-center space-x-2">
                        <SocialIcon icon="icofont-facebook" url="https://www.facebook.com/" style-class="h-8 w-8 leading-8 !rounded-full !bg-transparent border border-[#f4f4f4] !text-white hover:!bg-white hover:!text-primary" />
                        <SocialIcon icon="icofont-twitter" url="https://twitter.com/" style-class="h-8 w-8 leading-8 !rounded-full !bg-transparent border border-[#f4f4f4] !text-white hover:!bg-white hover:!text-primary" />
                        <SocialIcon icon="icofont-skype" url="https://www.skype.com/" style-class="h-8 w-8 leading-8 !rounded-full !bg-transparent border border-[#f4f4f4] !text-white hover:!bg-white hover:!text-primary" />
                        <SocialIcon icon="icofont-linkedin" url="https://www.linkedin.com/" style-class="h-8 w-8 leading-8 !rounded-full !bg-transparent border border-[#f4f4f4] !text-white hover:!bg-white hover:!text-primary" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
            SocialIcon: () => import("~/components/elements/SocialIcon")
        },
    };
</script>
