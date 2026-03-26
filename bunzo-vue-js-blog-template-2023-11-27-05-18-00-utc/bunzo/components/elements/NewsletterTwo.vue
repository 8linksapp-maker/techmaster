<template>
    <div class="newsletter-area">
        <div class="container relative">
            <div class="text-center pt-14 pb-[70px] px-4 rounded-[10px] bg-center bg-no-repeat bg-cover" :style="{ backgroundImage: `url(${bgImage})` }">
                <h2 class="text-2xl md:text-[44px] font-semibold  mb-3 text-white">Subscribe For Newsletter</h2>
                <h4 class="text-xl md:text-2xl font-normal text-white mb-7 md:mb-12">27+ peoples subscribe today</h4>
                <form class="block sm:flex justify-center">
                    <input type="email" placeholder="Enter your email" required class=" w-full md:w-[440px] border-2 p-3 rounded-lg bg-transparent focus:border-white focus:outline-none text-white text-lg placeholder:text-white">
                    <button class="bg-primary text-white px-5 py-4 font-medium rounded-lg hover:bg-primary-dark transition-all min-w-max ml-0 sm:ml-5 mt-5 sm:mt-0" :class="btnVariant">Subscribe Now</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            bgImage: {
                type: String,
                default: () => {},
            },
            btnVariant: {
                type: String,
                default: ''
            }
        },
    }
</script>
