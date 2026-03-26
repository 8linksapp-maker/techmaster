<template>
    <nav class="navigation-menu">
        <ul class="flex">
            <li v-for="(nav, i) in menu?.menuItems?.edges" :key="i" class="relative mr-12 group">
                <n-link :to="`${nav.node.path}`" class="block font-semibold group-hover:text-primary py-7" :class="colorVariant">
                    {{ nav.node.label }}
                    <i v-if="nav.node.childItems.edges.length" class="icofont-simple-down"></i>
                </n-link>

                <ul v-if="nav.node.childItems.edges.length" class="top-full left-0 absolute w-[200px] bg-white border-b-[3px] border-primary py-4 shadow-md shadow-black/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-[20px] group-hover:translate-y-0 z-30">
                    <li v-for="(item, index) in nav.node.childItems.edges" :key="index">
                        <n-link :to="`${item.node.path}`" class="block text-heading-light font-semibold py-1 px-4 hover:text-primary">{{ item.node.label }}</n-link>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>

<script>
    import menuQuery from "~/graphql/menu";
    export default {
        props: {
            colorVariant: {
                type: String,
                required: true
            },
        },

        data() {
            return {
                menu: []
            }
        },

        apollo: {
            menu: {
                prefetch: true,
                query: menuQuery("main-menu")
            }
        },
    }
</script>
