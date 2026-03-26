<template>
    <div class="test">
        <div class="container">
            <div class="grid grid-cols-12 sm:gap-8">
                <div class="col-span-12 lg:col-span-4 mt-7 sm:mt-0 first:mt-0">
                    <div class="p-5 sm:p-10 bg-[#fafafa] rounded-xl">
                        <div class=" mb-5 w-[90px] h-[90px] text-center leading-[90px] bg-primary rounded-lg">
                            <img src="/images/icons/open-platform.png" alt="icon">
                        </div>
                        <h4 class="mb-4">Open Platform</h4>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since the 1500s when an unknown printer took galley type and scrambled.</p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard.</p>
                    </div>
                </div>
                <div class="col-span-12 lg:col-span-8 mt-7 sm:mt-0 first:mt-0">
                    <div class="p-5 sm:p-10 bg-[#fafafa] rounded-xl">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div class="content">
                                <div class=" mb-5 w-[90px] h-[90px] text-center leading-[90px] bg-primary rounded-lg">
                                    <img src="/images/icons/digital-publishing.png" alt="icon">
                                </div>
                                <h4 class="mb-4">Digital Publishing</h4>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since the 1500s when an unknown printer took galley type and scrambled.</p>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard.</p>
                            </div>
                            <div class="image-holder">
                                <div class="relative">
                                    <img class="w-full" src="/images/banners/about-ex-share.jpg" alt="image">
                                    <div class="absolute bottom-7 left-0 right-0 text-center">
                                        <n-link to="/contact" class="bg-primary px-5 py-4 font-medium rounded-lg inline-block text-white hover:text-white hover:bg-primary-dark transition-all">Share your thinking <i class="icofont-long-arrow-right text-xl align-middle"></i></n-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>