<template>
    <div class="footer-area bg-secondary py-section">
        <div class="container">
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-12 sm:col-span-6 xl:col-span-3">
                    <WidgetText />
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 mt-8 md:mt-0">
                    <WidgetSubscribe />
                </div>
                <div class="col-span-12 xl:col-span-6">
                    <div class="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:pl-5 sm:mt-10 xl:mt-0">
                        <WidgetLinks class="mt-8 md:mt-0" />
                        <WidgetQuickLinks class="mt-8 md:mt-0" />
                        <WidgetCategory class="mt-6 md:mt-0" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
            WidgetText: () => import('~/components/footer/WidgetText'),
            WidgetSubscribe: () => import('~/components/footer/WidgetSubscribe'),
            WidgetLinks: () => import('~/components/footer/WidgetLinks'),
            WidgetQuickLinks: () => import('~/components/footer/WidgetQuickLinks'),
            WidgetCategory: () => import('~/components/footer/WidgetCategory'),
        },
    };
</script>