<template>
    <ul class='mobile-menu'>
        <li v-for='(link, i) in menu?.menuItems?.edges' :key='i' class="mb-1.5 relative group">
            <n-link :to="link.node.path" class="font-semibold leading-9 capitalize text-heading-light group-hover:text-primary">
                {{ link.node.label }}
            </n-link>
            <span v-if="link.node.childItems.edges.length" class='submenu-toggle text-lg w-9 h-9 leading-9 top-0 right-0 absolute text-center cursor-pointer bg-[#f4f4f4] inline-block'>
                <i class="icofont-thin-down"></i>
            </span>
            <ul  v-if="link.node.childItems.edges.length" class="submenu hidden pt-1.5 pl-4">
                <li v-for='submenuLink in link.node.childItems.edges' :key='submenuLink.title' class="mb-1.5 font-medium hover:text-primary">
                    <n-link :to="submenuLink.node.path"> {{ submenuLink.node.label }} </n-link>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
    import menuQuery from "~/graphql/menu";
    export default {
        data() {
            return {
                menu: [],
            }
        },
        mounted() {
            const getSiblings = function (e) {
                const siblings = [];
                if(!e.parentNode) {
                    return siblings;
                }
                let sibling  = e.parentNode.firstChild;
                while (sibling) {
                    if (sibling.nodeType === 1 && sibling !== e) {
                        siblings.push(sibling);
                    }
                    sibling = sibling.nextSibling;
                }
                return siblings;
            };

            const subMenuToggle = document.querySelectorAll('.submenu-toggle');
            subMenuToggle.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    if(!this.classList.contains('active')) {
                        this.classList.add('active')
                        this.nextElementSibling.classList.add('active')
                        this.closest('li').classList.add('active')
                        getSiblings(this.closest('li')).forEach(function(item) {
                            item.classList.remove('active')
                            item.querySelectorAll('li, .submenu-toggle, .submenu').forEach(function(child) {
                                child.classList.remove('active')
                            })
                        })
                    } else {
                        this.closest('li').classList.remove('active')
                        this.closest('li').querySelectorAll('li, .submenu-toggle, .submenu').forEach(function(child) {
                            child.classList.remove('active')
                        })
                    }
                })
            })
        },

        apollo: {
            menu: {
                prefetch: true,
                query: menuQuery("main-menu")
            }
        },
    }
</script>

<style lang='scss' scoped>
    .submenu.active {
        @apply block;
    }
    .submenu-toggle.active i {
        @apply -rotate-180 inline-block transition-all;
    }
</style>
