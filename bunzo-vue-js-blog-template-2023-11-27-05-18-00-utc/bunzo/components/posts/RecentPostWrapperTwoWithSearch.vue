<template>
    <div class="py-section">
        <div class="container">
            <div class="section-title mb-12 lg:mb-15 flex justify-between items-center">
                <h2 class="md:text-4xl text-primary font-semibold  leading-6 mb-0">Recent Articles</h2>
                <form class="relative hidden lg:block">
                    <input v-model="searchText" type="text" placeholder="Search.." class=" text-heading-light border-1 rounded-md pl-3 pr-10 py-3 w-full focus:outline outline-primary outline-1">
                    <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-primary">
                        <i class="icofont-search"></i>
                    </button>
                </form>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-[30px] gap-y-10">
                <PostStyleTwo v-for="post in posts.edges" :key="post.id" :post="post" excerpt text-variant="lg:text-2xl text-primary hover:text-[#a50eff]" />
            </div>
        </div>
    </div>
</template>

<script>
    import searchQuery from "~/graphql/search.gql";

    export default {
        components: {
            PostStyleTwo: () => import("~/components/posts/PostStyleTwo"),
        },

        data() {
            return {
                posts: [],
                searchText: ''
            }
        },

         apollo: {
            posts: {
                prefetch: true,
                query: searchQuery,
                variables() {
                    return {
                        searchText: this.searchText
                    };
                },
                 skip () {
                    return !this.searchText
                }
            }
        },
    };
</script>
