<template>
    <div class="py-section">
        <div class="container">
            <div class="video-holder relative">
                <CoolLightBox 
                    :items="items" 
                    :index="index"
                    @close="index = null">
                </CoolLightBox>
                <img src="/images/banners/about-video-banner.jpg" alt="image">
                <a v-for="(image, imageIndex) in items" :key="imageIndex" href="#" @click="index = imageIndex">
                    <div class="icon w-[70px] h-[70px] rounded-full bg-primary text-center leading-[70px] text-xl text-white top-1/2 left-1/2 absolute transform -translate-y-1/2 -translate-x-1/2 border-2 border-white">
                        <i class="icofont-play"></i>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import CoolLightBox from 'vue-cool-lightbox'
    import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

    export default {
        components: {
            CoolLightBox,
        },

        data() {
            return {
                items: [
                    {
                        src: "https://www.youtube.com/watch?v=eS9Qm4AOOBY",
                        autoplay: true
                    },
                ],
                index: null
            }
        },
    };
</script>