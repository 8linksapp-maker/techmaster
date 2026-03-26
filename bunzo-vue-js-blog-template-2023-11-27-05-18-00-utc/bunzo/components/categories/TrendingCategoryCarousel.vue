<template>
    <div class="trending-topic">
        <div class="container">
            <div class="md:grid md:grid-cols-5">
                <div class="md:col-span-1">
                    <div class="mb-7 md:mb-0 flex justify-between items-center md:block">
                        <h2 class="text-2xl font-semibold  leading-6 mb-0">Trending Topic</h2>
                        <div class="carousel-arrow flex md:mt-7">
                            <!-- Swiper Navigation Start -->
                            <div class="trending-button-prev w-10 h-10 leading-10 text-center bg-heading-light text-white rounded-full text-xl ml-3 first:ml-0 hover:bg-primary transition-all">
                                <i class="icofont-long-arrow-left"></i>
                            </div>
                            <div class="trending-button-next w-10 h-10 leading-10 text-center bg-heading-light text-white rounded-full text-xl ml-3 first:ml-0 hover:bg-primary transition-all">
                                <i class="icofont-long-arrow-right"></i>
                            </div>
                            <!-- Swiper Navigation End -->
                        </div>
                    </div>
                </div>
                <div class="md:col-span-4">
                    <div class="category-carousel">
                        <swiper :options="trendingOptions">
                            <swiper-slide v-for="(category, index) in categories.edges" :key="index" class="categories">
                                <CategoryStyleOne :category="category" />
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import categoriesQuery from "~/graphql/categories";

    export default {
        components: {
            CategoryStyleOne: () => import("~/components/categories/CategoryStyleOne"),
        },
        data() {
            return {
                categories: [],

                trendingOptions: {
                    speed: 750,
                    slidesPerView: 4,
                    spaceBetween: 20,
                    navigation: {
                        nextEl: '.trending-button-next',
                        prevEl: '.trending-button-prev',
                    },
                    breakpoints: {
                        992:{
                            slidesPerView : 4
                        },
                        768:{
                            slidesPerView : 3
                        },
                        480:{
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
            categories: {
                prefetch: true,
                query: categoriesQuery(100)
            }
        }
    };
</script>
