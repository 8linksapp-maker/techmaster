<template>
    <div class="author-wrapper py-section pt-0">
        <div class="container">
            <div class="section-title mb-8 py-5 border-y-1 border-[#ededed] flex justify-between items-center">
                <h2 class="text-2xl font-semibold  leading-6 mb-0">From Author's</h2>
                <div class="carousel-arrow flex items-center">
                    <!-- Swiper Navigation Start -->
                    <div class="swiper-button-prev !static !mt-0 !w-10 !h-10 leading-10 text-center !text-heading-light bg-[#f4f4f4] rounded-full text-xl ml-3 first:ml-0 hover:bg-primary hover:!text-white transition-all">
                        <i class="icofont-long-arrow-left"></i>
                    </div>
                    <div class="swiper-button-next !static !mt-0 !w-10 !h-10 leading-10 text-center !text-heading-light bg-[#f4f4f4] rounded-full text-xl ml-3 first:ml-0 hover:bg-primary hover:!text-white transition-all">
                        <i class="icofont-long-arrow-right"></i>
                    </div>
                    <!-- Swiper Navigation End -->
                </div>
            </div>
            <swiper :options="swiperOption">
                <div v-for="(author, i) in users.edges" :key="i" class="post swiper-slide">
                    <div class="grid grid-cols-7 gap-8">
                        <div class="lg:col-span-5 md:col-span-4 col-span-7 order-last md:order-first">
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-7">
                                <div v-for="post in author.node.posts.edges.slice(0, 4)" :key="post.id">
                                    <PostStyleTwo :post="post" />
                                </div>
                            </div>
                        </div>
                        <div class="lg:col-span-2 md:col-span-3 col-span-7 order-first md:order-last">
                            <AuthorProfile :author="author" />
                        </div>
                    </div>
                </div>
            </swiper>
        </div>
    </div>
</template>

<script>
    import authorQuery from "~/graphql/authors";

    export default {
        components: {
            PostStyleTwo: () => import("~/components/posts/PostStyleTwo"),
            AuthorProfile: () => import("~/components/author/AuthorProfile"),
        },

        data() {
            return {
                users: [],
                swiperOption: {
                    speed: 750,
                    loop: true,
                    autoHeight: true,
                    slidesPerView: 1,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                }
            }
        },

        apollo: {
            users: {
                prefetch: true,
                query: authorQuery(10),
            }
        },
    };
</script>
