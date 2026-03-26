<template>
    <div class="home-three">
        <BlogHeroThree />
        <RecentPostWrapperTwo />
        <NewsletterTwo btn-variant="bg-[#FF7D6B]" bg-image="/images/banners/newsletter-two.jpg" />
        <TrendingPostCarousel />
        <TrustedPartnerCarousel class="py-section pt-0" />
    </div>
</template>

<script>
    export default {
        components: {
            BlogHeroThree: () => import("~/components/hero/BlogHeroThree"),
            RecentPostWrapperTwo: () => import("~/components/posts/RecentPostWrapperTwo"),
            NewsletterTwo: () => import("~/components/elements/NewsletterTwo"),
            TrendingPostCarousel: () => import("~/components/posts/TrendingPostCarousel"),
            TrustedPartnerCarousel: () => import("~/components/elements/TrustedPartnerCarousel"),
        },
        layout: "layoutStyleThree",

        head() {
            return {
                title: 'Home Three'
            }
        },
    }
</script>
