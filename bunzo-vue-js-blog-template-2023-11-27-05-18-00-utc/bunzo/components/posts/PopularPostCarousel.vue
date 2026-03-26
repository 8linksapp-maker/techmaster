<template>
    <div class="popular-post py-section min-h-[300px]">
        <div class="container">
            <div class="section-title mb-12 flex justify-between items-center">
                <h2 class="md:text-4xl font-semibold  leading-6 mb-0" :class="titleVariation">Most Popular</h2>
                <div class="carousel-arrow flex items-center">
                    <!-- Swiper Navigation Start -->
                    <div class="swiper-button-prev !static !mt-0 !w-12 !h-12 leading-[48px] text-center border-2 border-[#f4f4f4] rounded-lg text-3xl !text-heading-light ml-3 first:ml-0 hover:bg-primary hover:border-primary hover:!text-white transition-all">
                        <i class="icofont-long-arrow-left"></i>
                    </div>
                    <div class="swiper-button-next !static !mt-0 !w-12 !h-12 leading-[48px] text-center border-2 border-[#f4f4f4] rounded-lg text-3xl !text-heading-light ml-3 first:ml-0 hover:bg-primary hover:border-primary hover:!text-white transition-all">
                        <i class="icofont-long-arrow-right"></i>
                    </div>
                    <!-- Swiper Navigation End -->
                </div>
            </div>
            <swiper :options="swiperOption">
                <swiper-slide v-for="post in popularPosts?.edges" :key="post.id">
                    <PostStyleTwo :post="post" text-variant="lg:text-2xl" />
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
    import popularPosts from "~/graphql/trendingPosts";

    export default {
        components: {
            PostStyleTwo: () => import("~/components/posts/PostStyleTwo"),
        },

        props: {
            titleVariation: {
                type: String,
                default: ''
            },
        },

        data() {
            return {
                popularPosts: [],
                swiperOption: {
                    speed: 750,
                    loop: true,
                    spaceBetween: 30,
                    autoHeight: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    breakpoints: {
                        992:{
                            slidesPerView : 3
                        },
                        768:{
                            slidesPerView : 2
                        },
                        320:{
                            slidesPerView : 1
                        }
                    }
                }
            }
        },

        apollo: {
            popularPosts: {
                prefetch: true,
                query: popularPosts(50)
            }
        },
    };
</script>
