<template>
    <div class="inner lg:border-l-1">
        <div v-for="(item, i) in faqs?.edges" :key="i" class="item mb-7 pb-7 last:mb-0 border-b-1 last:border-b-0 first:pt-5 lg:pl-5">
             <button class="text-heading-light text-xl font-semibold flex items-center text-left" :class='{ "active": activeIndex === i }' @click='activeIndex = activeIndex === i ? null : i'>
                 <span class="w-10 h-10 rounded-lg bg-[#f4f4f4] block text-center text-sm leading-10 text-heading-light mr-5 min-w-max flex-shrink-0">{{ i + 1 }}</span>
                {{ item.node.title }}
            </button>

            <div v-if='i === activeIndex' class="content pl-15 pt-3">
                <p v-html="item.node.content"></p>
            </div>
        </div>
    </div>
</template>

<script>
    import faqsQuery from "~/graphql/faqs.gql";

    export default {
        data() {
            return {
                activeIndex: 0,
                faqs: [],
            };
        },

        apollo: {
            faqs: {
                prefetch: true,
                query: faqsQuery,
                variables (){
                    return{
                        limit: 50
                    }
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .active span {
        @apply bg-primary text-white;
    }
</style>
