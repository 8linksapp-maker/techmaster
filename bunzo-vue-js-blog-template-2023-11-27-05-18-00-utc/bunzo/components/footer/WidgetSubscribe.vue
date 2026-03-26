<template>
    <div class="widget">
        <h4 class="text-white leading-none mb-5 sm:mb-6 md:mb-9">Subscribe</h4>
        <form class="body">
            <input type="text" placeholder="Your Name" required class=" bg-secondary-light mt-5 first:mt-0 py-4 px-3 text-white rounded-lg font-medium w-full focus:outline-none placeholder:text-white">
            <input type="email" placeholder="Your email address" required class=" bg-secondary-light mt-4 first:mt-0 py-4 px-3 text-white rounded-lg font-medium w-full focus:outline-none placeholder:text-white">
            <Button label="Subscribe Now" class="mt-4 text-white px-8" />
        </form>
    </div>
</template>

<script>
    export default {
        components: {
            Button: () => import("~/components/elements/Button"),
        },
    }
</script>