<template>
    <div class="home-container">
        <BlogHeroOne />
        <TrendingPostsSectionOne />
        <AuthorPostWrapper />
        <div class="bg-[#fafafa] py-section">
            <TrendingCategoryCarousel />
            <Newsletter class="pt-section" />
        </div>
        <VideoPostWrapper />
    </div>
</template>

<script>
    export default {
        components: {
            BlogHeroOne: () => import("~/components/hero/BlogHeroOne"),
            TrendingCategoryCarousel: () => import("~/components/categories/TrendingCategoryCarousel"),
            TrendingPostsSectionOne: () => import("~/components/posts/TrendingPostsSectionOne"),
            AuthorPostWrapper: () => import("~/components/posts/AuthorPostWrapper"),
            Newsletter: () => import("~/components/elements/Newsletter"),
            VideoPostWrapper: () => import("~/components/posts/VideoPostWrapper"),
        },

        head() {
            return {
                title: 'Home'
            }
        },
    }
</script>
