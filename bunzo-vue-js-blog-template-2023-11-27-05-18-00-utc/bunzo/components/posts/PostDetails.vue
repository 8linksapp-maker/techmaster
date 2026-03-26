<template>
    <article class="text-center">
        <ul class="meta flex justify-center text-[#626262] mb-5">
            <li class="relative mr-2 sm:mr-3 pr-3 sm:pr-4 after:w-1 after:h-1 after:bg-black after:top-1/2 after:right-0 after:transform after:-translate-y-1/2 after:absolute after:content-[''] after:rounded-full last:after:hidden font-semibold text-heading-light">
                <span class="text-[#9b9ea1]">By</span>
                <n-link :to="`/author/${post.author.node.slug}`" class="hover:text-primary">{{ post.author.node.name }}</n-link>
            </li>
            <li class="relative mr-2 sm:mr-3 pr-3 sm:pr-4 after:w-1 after:h-1 after:bg-black after:top-1/2 after:right-0 after:transform after:-translate-y-1/2 after:absolute after:content-[''] after:rounded-full last:after:hidden">
                <p>{{ formatDate(post.date) }}</p>
            </li>
            <li class="relative mr-2 sm:mr-3 pr-3 sm:pr-4 after:w-1 after:h-1 after:bg-black after:top-1/2 after:right-0 after:transform after:-translate-y-1/2 after:absolute after:content-[''] after:rounded-full last:after:hidden">{{ readingTime(post.content) }} min read</li>
        </ul>
        <div class="title">
            <h1 class="text-xl md:text-[32px] font-semibold  leading-[1.3] mb-5">{{ post.title }}</h1>
        </div>
        <div class="categories mt-7 mb-10">
            <n-link v-for="cat in post.categories.edges" :key="cat.id" :to="`/categories/${cat.node.slug}`" class="category bg-white-deep capitalize rounded-lg px-4 py-2 mr-3 inline-block">
                {{ cat.node.name }}
            </n-link>
        </div>
        <iframe v-if="post?.video" :src="`https://www.youtube.com/embed/${post.video}?autoplay=1`" class="w-full aspect-video"></iframe>
        <img v-else :src="post?.featuredImage?.node?.sourceUrl" :alt="post.title" class="w-full rounded-[10px]">
        <div class="content text-left mt-9 md:px-15">
            <span v-html="post.content"></span>
        </div>

        <div class="share-post sm:flex justify-between items-center md:mx-15 py-3 mt-10 border-y-1">
            <h4 class="sm:mb-0">Share this article:</h4>
            <div class="social-link flex justify-center sm:justify-end space-x-2">
                <SocialIcon icon="icofont-facebook" url="https://www.facebook.com/" />
                <SocialIcon icon="icofont-twitter" url="https://twitter.com/" />
                <SocialIcon icon="icofont-skype" url="https://www.skype.com/" />
                <SocialIcon icon="icofont-linkedin" url="https://www.linkedin.com/" />
            </div>
        </div>
    </article>
</template>

<script>
    import { formatDate } from "~/mixins/formatDate";
    import { readingTime } from "~/mixins/readingTime";

    export default {
        components: {
            SocialIcon: () => import("~/components/elements/SocialIcon"),
        },

        mixins: [formatDate, readingTime],

        props: {
            post: {
                type: Object,
                default: () => {},
            },
        },


    };
</script>

<style lang="scss">
    blockquote {
        h4 {
            @apply pt-3 mb-0 text-lg;
        }
        p {
            @apply font-semibold pt-3;
        }
    }
</style>
