<template>
    <div class="video-post-wrapper py-section">
        <div class="container">
            <div class="section-title mb-12 flex justify-between items-center">
                <h2 class="text-2xl font-semibold  mb-0 leading-6">Featured Video</h2>
                <n-link to="/blog" class="text-normal font-semibold hover:text-primary">See More <i class="icofont-long-arrow-right"></i></n-link>
            </div>
            <div v-if="!loading">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-7">
                    <div v-for="post in postFormat?.posts?.edges" :key="post.id">
                        <PostStyleTwo :post="post" text-variant="lg:text-2xl" />
                    </div>
                </div>
            </div>
            <div v-else>
                <LoadingBar />
            </div>
        </div>
    </div>
</template>

<script>
    import videoPostsQuery from "~/graphql/videoPosts";

    export default {
        components: {
            PostStyleTwo: () => import("~/components/posts/PostStyleTwo"),
            LoadingBar: () => import("~/components/utilities/LoadingBar"),
        },

        data() {
            return {
                postFormat: {},
                loading: 0
            }
        },

        apollo: {
            $loadingKey: 'loading',
            postFormat: {
                prefetch: true,
                query: videoPostsQuery(4),
            }
        },
    };
</script>
