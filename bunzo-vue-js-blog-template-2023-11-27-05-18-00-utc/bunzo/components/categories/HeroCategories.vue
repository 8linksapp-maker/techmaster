<template>
    <div class="categories grid lg:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-5">
        <CategoryStyleOne v-for="(category, index) in categories.edges" :key="index" :category="category" img-height="h-[125px]" />
    </div>
</template>

<script>
    import categoriesQuery from "~/graphql/categories";

    export default {
        components: {
            CategoryStyleOne: () => import("~/components/categories/CategoryStyleOne"),
        },

        data() {
            return {
                categories: []
            }
        },

        apollo: {
            categories: {
                prefetch: true,
                query: categoriesQuery(4)
            }
        }
    };
</script>