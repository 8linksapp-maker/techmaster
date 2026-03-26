<template>
    <div class="breadcrumb flex justify-center bg-[#fafafa] px-5 py-section">
        <ul class="bg-white-deep flex flex-wrap justify-center px-5 py-3 rounded-lg text-center">
            <li class=" relative after:right-0 after:top-1/2 after:content-[' '] after:w-2 after:h-2 after:bg-black after:absolute after:transform after:-translate-y-1/2 after:rounded-full mr-4 pr-5 last:pr-0 last:after:hidden">
                <n-link to="/">Home</n-link>
            </li>
            <li v-if="link" class="relative after:right-0 after:top-1/2 after:content-[' '] after:w-2 after:h-2 after:bg-black after:absolute after:transform after:-translate-y-1/2 after:rounded-full mr-4 pr-5 last:pr-0 last:after:hidden">
                <n-link :to="url">{{ link }}</n-link>
            </li>
            <li class="relative after:right-0 after:top-1/2 after:content-[' '] after:w-2 after:h-2 after:bg-black after:absolute after:transform after:-translate-y-1/2 after:rounded-full mr-4 pr-5 last:pr-0 last:after:hidden">
                {{ slug }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            slug: {
                type: String,
                default: ''
            },
            link: {
                type: String,
                default: ''
            },
            url: {
                type: String,
                default: ''
            },
        },
    };
</script>