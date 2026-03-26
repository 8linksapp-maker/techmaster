<template>
    <div class="relative flex items-center z-10 min-h-[700px] md:min-h-[820px] bg-cover bg-center bg-no-repeat" :style="{ backgroundImage: `url(/images/hero/hero-three.jpg)` }">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(post, i) in posts.edges" :key="i">
                <div class="container">
                    <div class="grid grid-cols-12 items-center">
                        <div class="col-span-12 lg:col-span-6 order-last lg:order-first">
                            <div class="content text-white xl:pr-20 mt-10 lg:mt-0">
                                <h5 class="text-white mb-6 hover:text-[#ffb16e]"><span class="text-[#7d6fb3]">By</span>
                                    <n-link :to="`/author/${post.node.author.node.slug}`">
                                        {{ post.node.author.node.name }}
                                    </n-link>
                                </h5>
                                <h2 class="text-white sm:text-3xl lg:text-[45px] font-semibold  hover:text-[#ffb16e]">
                                    <n-link :to="`/blog/${post.node.slug}`">
                                        {{ post.node.title | truncate(50, '...') }}
                                    </n-link>
                                </h2>
                                <div class="text-lg sm:text-xl text-white font-normal  pt-1 lg:children:!leading-[1.8]" v-html="post.node.excerpt"></div>
                                <div class="meta flex items-center mt-6">
                                    <div class="flex items-center">
                                        <i class="icofont-ui-calendar"></i>
                                        <p class="pl-2 text-[#ffb16e]">{{ formatDate(post.node.date) }}</p>
                                    </div>
                                    <div class="flex items-center pl-5">
                                        <i class="icofont-clock-time"></i>
                                        <p class="pl-2 text-[#ffb16e]"> {{ readingTime(post.node.content) }} min read</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-12 lg:col-span-6 order-first lg:order-last">
                            <div class="rounded-[10px] overflow-hidden border-2 border-[#895fb6] lg:h-[400px] p-2.5 sm:p-5">
                                <n-link :to="`/blog/${post.node.slug}`">
                                    <img :src="post.node.featuredImage.node.sourceUrl" :alt="post.node.title" class="h-full object-cover rounded-xl">
                                </n-link>
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
        <div class="swiper-pagination absolute left-1/2 !-translate-x-1/2 bottom-5 md:bottom-15 flex swiper-pagination-style"></div>
    </div>
</template>

<script>
    import { formatDate } from "~/mixins/formatDate";
    import { readingTime } from "~/mixins/readingTime";
    import { truncateString } from "~/mixins/truncateString";
    import postsQuery from "~/graphql/postsQuery";

    export default {
        mixins: [formatDate, readingTime, truncateString],
        data() {
            return {
                posts: [],
                swiperOption: {
                    speed: 800,
                    slidesPerView: 1,
                    spaceBetween: 10,
                    effect: "fade",
                    fadeEffect: {
                        crossFade: true
                    },
                     pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                }
            }
        },
        apollo: {
            posts: {
                prefetch: true,
                query: postsQuery(4)
            }
        }
    };
</script>

<style lang="scss">
    .swiper-pagination-style .swiper-pagination-bullet {
        @apply w-4 h-4 bg-[#8e61b9] mr-4 rounded-full last:mr-0;
    }
    .swiper-pagination-style .swiper-pagination-bullet-active {
       @apply bg-white;
    }
</style>
