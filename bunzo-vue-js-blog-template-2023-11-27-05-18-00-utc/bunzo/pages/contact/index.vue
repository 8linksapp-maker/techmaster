<template>
    <div class="contact-wrapper">
        <Breadcrumb slug="Contact" />
        <OfficeLocationWrapper />

        <div class="contact-map pb-section">
            <div class="container">
                <div class="grid md:grid-cols-2 gap-x-8">
                    <ContactForm />
                    <GoogleMap />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
            Breadcrumb: () => import("~/components/elements/Breadcrumb"),
            OfficeLocationWrapper: () => import("~/components/contact/OfficeLocationWrapper"), 
            ContactForm: () => import("~/components/contact/ContactForm"), 
            GoogleMap: () => import("~/components/contact/GoogleMap"), 
        },

        head() {
            return {
                title: "Contact Us"
            }
        }
    }
</script>