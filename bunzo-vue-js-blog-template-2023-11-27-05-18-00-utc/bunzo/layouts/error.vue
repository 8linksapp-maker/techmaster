<template>
    <div class="relative h-screen flex items-center">
        <div class="container text-center">
            <div class="error-image">
                <img src="/images/banners/error-404.png" alt="Not Found Image">
            </div>
            <h4 v-if="error.statusCode === 404" class="text-xl mt-10">Oops! Page not found!</h4>
            <h4 v-else class="text-xl mt-10">An error occurred</h4>
            <h1 class=" text-2xl md:text-4xl !leading-[1.2] mb-7">We are sorry for this error.<br> Can't find this page.</h1>
            <button class="bg-primary text-white px-5 py-4 font-semibold rounded-lg transition-all hover:bg-primary-dark" @click="$router.go(-1)">
                <i class="icofont-long-arrow-left text-xl align-middle"></i>
                Go back previous page
            </button>
        </div>
        <div class="error-shape absolute left-24 bottom-0 hidden lg:block">
            <img src="/images/shape/error-shap.png" alt="shape">
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            error: {
                type: Object,
                default: () => {},
            },
        }   
    }
</script>