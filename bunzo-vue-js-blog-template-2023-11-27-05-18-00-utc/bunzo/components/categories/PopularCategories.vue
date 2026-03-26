<template>
    <div class="popular-categories py-section">
        <div class="container">
            <h2 class=" text-center text-primary font-semibold  text-4xl mb-14">Most Popular Category</h2>
            <div class="text-center px-7 space-x-5">
                <n-link v-for="(category, i) in categories.edges" :key="i" :to="`/categories/${category.node.slug}`" class="inline-block text-primary text-lg font-semibold bg-[#f4eaff] px-9 py-4 rounded-lg capitalize hover:text-white hover:bg-secondary">{{ category.node.name }}</n-link>
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
                prefetch:true,
                query: categoriesQuery(50)
            }
        }
    };
</script>
