<template>
    <div  class="category-page-wrapper">
        <Breadcrumb link="Categories" url="/categories" :slug="$route.params.slug" />

        <div class="py-section">
            <div class="container">
                <div v-if="!loading">
                    <div v-if="category.posts.edges.length" class="grid lg:grid-cols-3 md:grid-cols-2 gap-x-[30px] gap-y-9">
                        <PostStyleTwo v-for="(post, index) in category.posts.edges" :key="index" :post="post" excerpt text-variant="lg:text-2xl" />
                    </div>
                    <div v-else class="text-center">
                        <h5>OOPS! There are no posts.</h5>
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
    import categoryPosts from "~/graphql/categoryPosts";

    export default {
        components: {
            Breadcrumb: () => import("~/components/elements/Breadcrumb"),
            PostStyleTwo: () => import("~/components/posts/PostStyleTwo"),
            LoadingBar: () => import("~/components/utilities/LoadingBar"),
        },
        data() {
            return {
                category: [],
                loading: 0,
            }
        },
        apollo: {
            $loadingKey: 'loading',
            category: {
                prefetch: true,
                query: categoryPosts(),
                variables() {
                    return { 
                        categorySlug: this.$route.params.slug  
                    };
                }
            }
        },
        head() {
            return {
                title: this.$route.params.slug
            }
        },
    }
</script>