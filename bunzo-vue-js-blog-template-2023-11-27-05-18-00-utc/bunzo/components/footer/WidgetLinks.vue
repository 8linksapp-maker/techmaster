<template>
    <div class="widget">
        <h4 class="text-white leading-none mb-5 sm:mb-6 md:mb-9">Company</h4>
        <div class="body">
            <ul class=" space-y-4">
                <li>
                    <n-link to="/faq" class="text-white hover:text-primary">FAQ's</n-link>
                </li>
                <li>
                    <n-link to="/contact" class="text-white hover:text-primary">Careers</n-link>
                </li>
                <li>
                    <n-link to="/about" class="text-white hover:text-primary">About Us</n-link>
                </li>
                <li>
                    <n-link to="/contact" class="text-white hover:text-primary">Contact Us</n-link>
                </li>
                <li>
                    <n-link to="/blog" class="text-white hover:text-primary">Blog</n-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WidgetLinks"
    };
</script>