<template>
    <div class="bg-primary">
        <div class="footer-main py-section">
            <div class="container">
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12 sm:col-span-6 xl:col-span-4">
                        <div class="widget lg:pr-10">
                            <h4 class="text-white leading-none mb-5 sm:mb-6 md:mb-9">Subscribe</h4>
                            <form class="body">
                                <input type="text" placeholder="Your Name" required class=" bg-transparent border-2 border-[#453095] mt-5 first:mt-0 py-4 px-3 text-white rounded-lg font-medium w-full focus:outline-none">
                                <input type="email" placeholder="Your email address" required class=" bg-transparent border-2 border-[#453095] mt-4 first:mt-0 py-4 px-3 text-white rounded-lg font-medium w-full focus:outline-none">
                                <Button label="Subscribe Now" class="mt-5 text-white px-8 bg-[#a50eff]" />
                            </form>
                            <div class="flex mt-8 space-x-2 md:space-x-3">
                                <SocialIcon icon="icofont-facebook" url="https://www.facebook.com/" style-class="bg-[#402a92] !text-white hover:bg-[#a50eff]" />
                                <SocialIcon icon="icofont-twitter" url="https://twitter.com/" style-class="bg-[#402a92] !text-white hover:bg-[#a50eff]" />
                                <SocialIcon icon="icofont-instagram" url="https://www.instagram.com/" style-class="bg-[#402a92] !text-white hover:bg-[#a50eff]" />
                                <SocialIcon icon="icofont-pinterest" url="https://www.pinterest.com/" style-class="bg-[#402a92] !text-white hover:bg-[#a50eff]" />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-12 xl:col-span-8">
                        <div class="grid grid-cols-2 gap-x-10 sm:grid-cols-3 xl:pl-5 sm:mt-10 xl:mt-0">
                            <div class="widget mt-8 md:mt-0">
                                <h4 class="text-white leading-none mb-5 sm:mb-6 md:mb-9">Company</h4>
                                <div class="body">
                                    <ul class="space-y-4">
                                        <li>
                                            <n-link to="/faq" class="text-white hover:text-[#a50eff]">FAQ's</n-link>
                                        </li>
                                        <li>
                                            <n-link to="/contact" class="text-white hover:text-[#a50eff]">Careers</n-link>
                                        </li>
                                        <li>
                                            <n-link to="/about" class="text-white hover:text-[#a50eff]">About Us</n-link>
                                        </li>
                                        <li>
                                            <n-link to="/contact" class="text-white hover:text-[#a50eff]">Contact Us</n-link>
                                        </li>
                                        <li>
                                            <n-link to="/blog" class="text-white hover:text-[#a50eff]">Blog</n-link>
                                        </li>
                                        <li>
                                            <n-link to="/categories" class="text-white hover:text-[#a50eff]">Categories</n-link>
                                        </li>
                                        <li>
                                            <n-link to="/contact" class="text-white hover:text-[#a50eff]">Support</n-link>
                                        </li>
                                        <li>
                                            <n-link to="/about" class="text-white hover:text-[#a50eff]">Local Print Ads</n-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="widget mt-8 md:mt-0">
                                <h4 class="text-white leading-none mb-5 sm:mb-6 md:mb-9">Quick Links</h4>
                                <div class="body">
                                    <ul class=" space-y-4">
                                        <li>
                                            <n-link to="/about" class="text-white hover:text-[#a50eff]">Discussion</n-link>
                                        </li>
                                        <li>
                                            <n-link to="/contact" class="text-white hover:text-[#a50eff]">Careers</n-link>
                                        </li>
                                        <li>
                                            <n-link to="/categories" class="text-white hover:text-[#a50eff]">Categories</n-link>
                                        </li>
                                        <li>
                                            <n-link to="/contact" class="text-white hover:text-[#a50eff]">Support</n-link>
                                        </li>
                                        <li>
                                            <n-link to="/faq" class="text-white hover:text-[#a50eff]">Course FAQ’s</n-link>
                                        </li>
                                        <li>
                                            <n-link to="/privacy-policy" class="text-white hover:text-[#a50eff]">Privacy Policy</n-link>
                                        </li>
                                        <li>
                                            <n-link to="/contact" class="text-white hover:text-[#a50eff]">Customer Support</n-link>
                                        </li>
                                        <li>
                                            <n-link to="/terms-conditions" class="text-white hover:text-[#a50eff]">Terms & Conditions</n-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="widget mt-8 md:mt-0">
                                <h4 class="text-white leading-none mb-5 sm:mb-6 md:mb-9">Category</h4>
                                <div class="body">
                                    <ul class=" space-y-4">
                                        <li>
                                            <n-link to="/categories" class="text-white hover:text-[#a50eff]">Categories</n-link>
                                        </li>
                                        <li>
                                            <n-link to="/categories/food" class="text-white hover:text-[#a50eff]">Food</n-link>
                                        </li>
                                        <li>
                                            <n-link to="/categories/travel" class="text-white hover:text-[#a50eff]">Travel</n-link>
                                        </li>
                                        <li>
                                            <n-link to="/categories/business" class="text-white hover:text-[#a50eff]">Business</n-link>
                                        </li>
                                        <li>
                                            <n-link to="/categories/medical" class="text-white hover:text-[#a50eff]">Medical</n-link>
                                        </li>
                                        <li>
                                            <n-link to="/categories/marketing" class="text-white hover:text-[#a50eff]">Marketing</n-link>
                                        </li>
                                        <li>
                                            <n-link to="/categories/technology" class="text-white hover:text-[#a50eff]">Technology</n-link>
                                        </li>
                                        <li>
                                            <n-link to="/terms-conditions" class="text-white hover:text-[#a50eff]">Terms & Conditions</n-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright border-t-1 border-[#3b2590] py-4">
            <div class="container">
                <div class="text-base text-center text-white">
                    <p>© 2022 Bunzo Made with <i class="icofont icofont-heart-alt text-red-600"></i> by <a href="#" target="_blank">Codecarnival</a></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
            Button: () => import("~/components/elements/Button"),
            SocialIcon: () => import("~/components/elements/SocialIcon"),
        },
    };
</script>