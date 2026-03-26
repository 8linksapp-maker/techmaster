<template>
    <div class="blog-details-wrapper">
        <Breadcrumb link="Blog" url="/blog" :slug="post.title" />

        <div v-if="!loading" class="details pt-section">
            <div class="container">
                <div class="grid grid-cols-1">
                    <PostDetails :post="post" />
                </div>
            </div>
        </div>
        <div v-else>
            <LoadingBar />
        </div>

        <Comment />
    </div>
</template>

<script>
    import postQuery from "~/graphql/postQuery";

    export default {
        components: {
            Breadcrumb: () => import("~/components/elements/Breadcrumb"),
            PostDetails: () => import("~/components/posts/PostDetails"),
            Comment: () => import("~/components/elements/Comment"),
            LoadingBar: () => import("~/components/utilities/LoadingBar"),
        },

        data() {
            return {
                post: {},
                loading: 0
            }
        },

        apollo: {
            $loadingKey: 'loading',
            post: {
                prefetch: true,
                query: postQuery(),
                variables() {
                    return { 
                        slug: this.$route.params.slug 
                    };
                }
            }
        },

        head() {
            return {
                title: this.post.title
            }
        },
    }
</script>