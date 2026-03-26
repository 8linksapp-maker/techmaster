<template>
    <div class="about-wrapper">
        <Breadcrumb slug="About" />
        <ImageWithVideo />
        <AboutHistory />
        <AboutMissionVision />
        <TeamWrapper />
        <div class="py-section bg-[#edf0f8]">
            <Newsletter />
        </div>
    </div>
</template>

<script>
    export default {
        components: {
            Breadcrumb: () => import("~/components/elements/Breadcrumb"),
            ImageWithVideo: () => import("~/components/about/ImageWithVideo"),
            AboutHistory: () => import("~/components/about/AboutHistory"),
            AboutMissionVision: () => import("~/components/about/AboutMissionVision"),
            TeamWrapper: () => import("~/components/about/TeamWrapper"),
            Newsletter: () => import("~/components/elements/Newsletter"),
        },

        head() {
            return {
                title: "About Us"
            }
        }
    }
</script>