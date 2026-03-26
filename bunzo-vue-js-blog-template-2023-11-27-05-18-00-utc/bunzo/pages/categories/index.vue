<template>
    <div class="categories-wrapper">
        <Breadcrumb slug="Categories" />

        <div class="categories py-section">
            <div class="container">
                <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-[30px]">
                    <CategoryStyleOne v-for="(category, index) in categories.edges" :key="index" :category="category" />
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    import categoriesQuery from "~/graphql/categories";
    export default {
        components: {
            Breadcrumb: () => import("~/components/elements/Breadcrumb"),
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
                query: categoriesQuery(100)
            }
        },

        head() {
            return {
                title: "All Categories"
            }
        }
    }
</script>