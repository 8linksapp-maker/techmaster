<template>
    <div v-if="!loading" class="author-page-wrapper">
        <Breadcrumb link="Author" :slug="user.name" />

        <div class="py-section">
            <div  class="container">
                <div class="grid grid-cols-7 gap-8">
                    <div class="lg:col-span-5 col-span-7">
                        <div  class="grid md:grid-cols-2 mt-9 first:mt-0 gap-x-[30px] gap-y-9">
                            <PostStyleTwo v-for="(post, i) in user.posts.edges" :key="i" :post="post" excerpt />
                        </div>
                    </div>
                    <div class="lg:col-span-2 col-span-7">
                        <div class="author-profile text-center border border-[#f4f4f4] rounded-xl py-7 px-3.5 relative">
                            <div class="gravatar w-32 h-32 m-auto border border-[#f4f4f4] p-2 rounded-full overflow-hidden">
                                <img class="rounded-full w-full" :src="user.avatar.url" :alt="user.name">
                            </div>
                            <h3 class="text-xl mt-6 mb-5">
                                {{ user.name }}
                            </h3>
                            <p v-html="user.description"></p>
                            <div class="flex space-x-2 justify-center">
                                <SocialIcon icon="icofont-facebook" url="https://www.facebook.com/" />
                                <SocialIcon icon="icofont-twitter" url="https://twitter.com/" />
                                <SocialIcon icon="icofont-skype" url="https://www.skype.com/" />
                                <SocialIcon icon="icofont-linkedin" url="https://www.linkedin.com/" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <LoadingBar />
    </div>
    
</template>

<script>
    import queryAuthorPosts from "~/graphql/author";

    export default {
        components: {
            PostStyleTwo: () => import("~/components/posts/PostStyleTwo"),
            Breadcrumb: () => import("~/components/elements/Breadcrumb"),
            SocialIcon: () => import("~/components/elements/SocialIcon"),
            LoadingBar: () => import("~/components/utilities/LoadingBar"),
        },
        
        data() {
            return {
                user: [],
                loading: 0,
            }
        },

        apollo: {
            $loadingKey: 'loading',
            user: {
                prefetch: true,
                query: queryAuthorPosts(),
                variables() {
                    return {
                        authorSlug: this.$route.params.slug  
                    }
                }
            }
        },

        head() {
            return {
                title: this.user.name
            }
        },
    };
</script>