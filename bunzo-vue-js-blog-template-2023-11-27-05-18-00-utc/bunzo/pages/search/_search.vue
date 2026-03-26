<template>
    <div class="blog-posts">
        <Breadcrumb slug="Search result" />

        <div class="py-section">
            <div class="container">
                <div v-if="!loading">
                    <div v-if="!slug" class="text-center">
                        <h4 class="mb-0 text-[#777]">Search for post</h4>
                    </div>
                    <div v-if="posts?.edges?.length !== 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-[30px] gap-y-[40px]">
                        <PostStyleTwo v-for="(post, index) in posts.edges" :key="index" :post="post" excerpt text-variant="lg:text-2xl" />
                    </div>
                    <div v-else class="text-center">
                        <h4 class="mb-0 text-[#777]">Your search keyword <span class=" text-primary">{{ slug }}</span> did not match any post</h4>
                    </div>
                </div>
                <div v-else class=" text-center">
                    <h4 class="mb-0 text-[#777]">Searching your keyword...</h4>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
    import searchQuery from "~/graphql/search.gql"

    export default {
        components: {
            Breadcrumb: () => import("~/components/elements/Breadcrumb"),
            PostStyleTwo: () => import("~/components/posts/PostStyleTwo"),
        },
        
        data() {
            return {
                posts: [],
                loading: 0,
                slug: this.$route.params.search
            }
        },

        apollo: {
            $loadingKey: 'loading',
            posts: {
                prefetch: true,
                query: searchQuery,
                variables() {
                    return { 
                        searchText: this.slug 
                    };
                },
                 skip () {
                    return !this.slug
                },

            }
        },

        head() {
            return {
                title: "All Posts"
            }
        }
    };
</script>