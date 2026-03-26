<template>
    <div class="widget">
        <h4 class="text-white leading-none mb-5 sm:mb-6 md:mb-9">Quick Links</h4>
        <div class="body">
            <ul class=" space-y-4">
                <li>
                    <n-link to="/about" class="text-white hover:text-primary">Discussion</n-link>
                </li>
                <li>
                    <n-link to="/contact" class="text-white hover:text-primary">Support</n-link>
                </li>
                <li>
                    <n-link to="/privacy-policy" class="text-white hover:text-primary">Privacy Policy</n-link>
                </li>
                <li>
                    <n-link to="/contact" class="text-white hover:text-primary">Customer Support</n-link>
                </li>
                <li>
                    <n-link to="/terms-conditions" class="text-white hover:text-primary">Terms & Conditions</n-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WidgetQuickLinks"
    };
</script>