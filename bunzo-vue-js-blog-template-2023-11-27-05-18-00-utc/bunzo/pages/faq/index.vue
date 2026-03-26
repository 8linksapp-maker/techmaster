<template>
    <div class="faq-wrapper">
        <Breadcrumb slug="FAQ" />

        <div class="container py-section">
            <div class="grid lg:grid-cols-2 border-t-0 md:border-t-1 border-b-1 items-center">
                <FaqSectionTitle />
                <client-only>
                    <FaqAccordion />
                </client-only>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
            Breadcrumb: () => import("~/components/elements/Breadcrumb"),
            FaqSectionTitle: () => import("~/components/faq/FaqSectionTitle"),
            FaqAccordion: () => import("~/components/faq/FaqAccordion"),
        },

        head() {
            return {
                title: "FAQ's"
            }
        }
    };
</script>