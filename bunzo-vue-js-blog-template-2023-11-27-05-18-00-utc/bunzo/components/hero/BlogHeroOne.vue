<template>
    <div class="bg-gray-light py-section">
        <div class="container">
            <div class="grid grid-cols-12 gap-7">
                <div class="lg:col-span-3 col-span-12">
                    <HeroCategories />
                </div>
                <div class="lg:col-span-9 col-span-12 space-y-[30px]">
                    <PostOne v-for="(post, index) in posts.edges" :key="index" :post="post" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import postsQuery from "~/graphql/postsQuery";
    export default {
        components: {
            HeroCategories: () => import("~/components/categories/HeroCategories"),
            PostOne: () => import("~/components/posts/PostOne")
        }, 
        data() {
            return {
                posts: []
            }
        },

        apollo: {
            posts: {
                prefetch: true,
                query: postsQuery(2)
            }
        },
    }
</script>

