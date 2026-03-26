<template>
    <div class="home-two">
        <BlogHeroTwo />
        <PopularPostCarousel />
        <RecentPostWrapper />
        <NewsletterTwo class="py-section pt-0" bg-image="/images/banners/newsletter.jpg" />
    </div>
</template>

<script>
    export default {
        components: {
            BlogHeroTwo: () => import("~/components/hero/BlogHeroTwo"),
            PopularPostCarousel: () => import("~/components/posts/PopularPostCarousel"),
            RecentPostWrapper: () => import("~/components/posts/RecentPostWrapper"),
            NewsletterTwo: () => import("~/components/elements/NewsletterTwo"),
        },
        layout: "layoutForTransparentHeader",

        head() {
            return {
                title: 'Home Two'
            }
        },
    }
</script>
