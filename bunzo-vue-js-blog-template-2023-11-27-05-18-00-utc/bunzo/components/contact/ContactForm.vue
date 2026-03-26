<template>
    <div class="contact-form lg:pr-10">
        <h2 class="mb-7 text-2xl md:text-3xl -mt-2">Get in Touch</h2>
        <form class="space-y-5">
            <input type="text" placeholder="Name*" required class="bg-[#f4f4f4] w-full rounded-lg focus:outline outline-primary outline-1 font-medium px-5 py-4">
            <input type="email" placeholder="Email*" required class="bg-[#f4f4f4] w-full rounded-lg focus:outline outline-primary outline-1 font-medium px-5 py-4">
            <input type="text" placeholder="Phone" class="bg-[#f4f4f4] w-full rounded-lg focus:outline outline-primary outline-1 font-medium px-5 py-4">
            <textarea placeholder="Message" required class="bg-[#f4f4f4] w-full rounded-lg focus:outline outline-primary outline-1 font-medium px-5 py-4 h-min-20" rows="6"></textarea>
            <Button icon label="Send Message" style-variant="text-white" />
        </form>
    </div>
</template>

<script>
    export default {
        components: {
            Button: () => import("~/components/elements/Button"),
        }
    };
</script>
