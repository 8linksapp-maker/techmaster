<template>
    <div class="relative flex items-center z-10 min-h-[600px] lg:min-h-[850px] bg-cover bg-center bg-no-repeat" :style="{ backgroundImage: `url(/images/hero/home-2-hero-bg.jpg)` }">
        <div class="bg-blue-dark bg-opacity-70 w-full h-full absolute top-0 left-0 -z-10"></div>
        <div class="hero-text absolute bottom-0 bg-center bg-no-repeat h-20 w-full" :style="{ backgroundImage: `url(/images/hero/hero-text-banner.png)` }"></div>
        <div class="container">
            <div class="content text-center pt-20">
                <h5 class="text-primary uppercase">All Solution In One</h5>
                <h2 class="text-white text-2xl md:text-3xl lg:text-6xl leading-[1.2] mb-0">
                    <span class="block text-4xl md:text-6xl lg:text-[96px] font-semibold ">Unlimited</span>
                    Advice, Tutorial, Resource
                </h2>
                <div class="cat-list mt-6 md:mt-12 space-x-5 space-y-5 max-w-[600px] mx-auto">
                    <n-link v-for="(category, i) in categories.edges" :key="i" :to="`/categories/${category.node.slug}`" class="inline-block bg-white text-primary font-semibold rounded-md hover:text-white hover:bg-primary px-5 sm:px-7 py-2 sm:py-3 capitalize">{{ category.node.name }}</n-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import categoriesQuery from "~/graphql/categories";
    export default {
        data() {
            return {
                categories: []
            }
        },
        apollo: {
            categories: {
                prefetch: true,
                query: categoriesQuery(50)
            }
        }
    };
</script>
