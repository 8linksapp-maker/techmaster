<template>
    <div class="widget">
        <h4 class="text-white leading-none mb-5 sm:mb-6 md:mb-9">Category</h4>
        <div class="body">
            <ul class=" space-y-4">
                <li>
                    <n-link to="/categories/travel" class="text-white hover:text-primary">Travel</n-link>
                </li>
                <li>
                    <n-link to="/categories/business" class="text-white hover:text-primary">Business</n-link>
                </li>
                <li>
                    <n-link to="/categories/medical" class="text-white hover:text-primary">Medical</n-link>
                </li>
                <li>
                    <n-link to="/categories/marketing" class="text-white hover:text-primary">Marketing</n-link>
                </li>
                <li>
                    <n-link to="/categories/technology" class="text-white hover:text-primary">Technology</n-link>
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