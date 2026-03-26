<template>
    <div class="recent-post py-section pt-0">
        <div class="container">
            <div class="section-title mb-12 pb-12 flex justify-between items-center border-b-1 border-[#ededed]">
                <h2 class="md:text-4xl font-semibold  leading-6 mb-0">Recent Articles</h2>
                <n-link to="/blog" class="text-normal font-semibold hover:text-primary">See More <i class="icofont-long-arrow-right"></i></n-link>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-[30px] gap-y-10">
                <PostStyleTwo v-for="post in posts.edges" :key="post.id" :post="post" excerpt text-variant="lg:text-2xl" />
            </div>
        </div>
    </div>
</template>

<script>
    import postsQuery from "~/graphql/postsQuery";

    export default {
        components: {
            PostStyleTwo: () => import("~/components/posts/PostStyleTwo"),
        },

        data() {
            return {
                posts: []
            }
        },

        apollo: {
            posts: {
                prefetch: true,
                query: postsQuery(9)
            }
        }
    };
</script>
