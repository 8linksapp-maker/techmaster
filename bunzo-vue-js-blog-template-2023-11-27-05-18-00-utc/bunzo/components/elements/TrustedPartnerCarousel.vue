<template>
    <div class="trusted-partner">
        <div class="container">
            <div class=" bg-[#f4eaff] py-section px-10 lg:px-20 rounded-[10px]">
                <swiper :options="partnerCarousel" class="children:items-center">
                    <swiper-slide v-for="(logo, i) in partnersLogo" :key="i">
                        <div class="text-center">
                            <img :src="logo" alt="logo">
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                partnerCarousel: {
                    speed: 750,
                    loop: true,
                    autoplay: true,
                    slidesPerView: 4,
                    spaceBetween: 70,
                    breakpoints: {
                        992:{
                            slidesPerView : 4
                        },
                        768:{
                            slidesPerView : 3,
                            spaceBetween: 70,
                        },
                        320:{
                            slidesPerView : 2,
                            spaceBetween: 30,
                        }
                    }
                },
                partnersLogo: [
                    '/images/partners/logo-1.png',
                    '/images/partners/logo-2.png',
                    '/images/partners/logo-3.png',
                    '/images/partners/logo-4.png',
                ]
            }
        },
    }
</script>
