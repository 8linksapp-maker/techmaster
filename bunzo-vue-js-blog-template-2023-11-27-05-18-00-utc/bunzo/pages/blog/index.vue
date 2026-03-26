<template>
    <div class="blog-posts">
        <Breadcrumb slug="All Post" />

        <div class="py-section">
            <div class="container">
                <h1 class=" sr-only">All Posts</h1>
                <div v-if="!loading">
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-[30px] gap-y-[40px]">
                        <PostStyleTwo v-for="(post, index) in posts.edges" :key="index" :post="post" excerpt text-variant="lg:text-2xl" />
                    </div>
                </div>
                <div v-else>
                    <LoadingBar />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import postsQuery from "~/graphql/postsQuery";

    export default {
        components: {
            Breadcrumb: () => import("~/components/elements/Breadcrumb"),
            PostStyleTwo: () => import("~/components/posts/PostStyleTwo"),
            LoadingBar: () => import("~/components/utilities/LoadingBar"),
        },
        
        data() {
            return {
                posts: [],
                loading: 0
            }
        },

        apollo: {
            $loadingKey: 'loading',
            posts: {
                prefetch: true,
                query: postsQuery(100)
            }
        },

        head() {
            return {
                title: "All Posts"
            }
        }
    };
</script>