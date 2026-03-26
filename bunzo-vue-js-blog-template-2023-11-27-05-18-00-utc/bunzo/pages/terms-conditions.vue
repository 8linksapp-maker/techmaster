<template>
    <div class="terms-conditions">
        <Breadcrumb slug="Terms & Conditions" />

        <!-- privacy policy content start -->
        <section class="py-section">
            <div class="container">
                <div class="terms-condition">
                    <h1 class="text-2xl md:text-4xl font-semibold  leading-none mb-5">Terms & Conditions</h1>
                    <h5 class="text-lg md:text-xl">When we’re saying you in this page, we’re referring to a buyer. When we’re saying we in this page, we’re referring to the Bunzo authority.</h5>
                    <p># If you’re under 13 years, then do not visit/use our website.</p>
                    <p># To be a member/user of our website, you need to be 18 years old or more.</p>
                    <p># You need to provide true and correct information</p>
                    <p># When you will purchase an item, then confirm that you agree to our terms & conditions.</p>
                    <p># Your payment will be processed through PayPal or other third-party websites.</p>
                    <p># Images showing in the preview is demo purpose only. We don’t provide image copyright. You need to replace the images included in the demo content.</p>
                    <p># If you face any problem to download your item after purchasing, then you can send an email from our contact page.</p>
                    <p># We Will refund only if the product is broken. To make sure the product is broken or not, you need to contact us.</p>
                    <p># We have the right to change the policy, terms & Conditions, packages, price, features or any other things on this website.</p>
                    <p># As a customer or user of this website, you will need to agree with the terms & conditions.</p>
                    <p># If we make any change in terms & conditions, we will post here.</p>
                </div>
            </div>
        </section>
        <!-- privacy policy content end -->
    </div>
</template>

<script>
    export default {
        components: {
            Breadcrumb: () => import("~/components/elements/Breadcrumb"),
        },

        head() {
            return {
                title: "Terms & Conditions"
            }
        }
    };
</script>
