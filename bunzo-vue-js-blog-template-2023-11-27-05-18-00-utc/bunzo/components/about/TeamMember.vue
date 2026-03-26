<template>
    <div class="member rounded-xl overflow-hidden group">
        <div class="relative before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-black before:to-primary before:opacity-0 group-hover:before:opacity-80 before:transition-all duration-500">
            <img class="w-full" :src="member.imgSrc" :alt="member.name">
            <div class="flex justify-center absolute top-0 left-0 right-0 opacity-0 group-hover:opacity-100 group-hover:top-10 transition-all duration-500 space-x-2">
                <SocialIcon v-for="(item, index) in member.socialLink" :key="index" :url="item.url" :icon="item.icon" />
            </div>
            <div class="caption absolute bottom-0 left-0 right-0 text-center opacity-0 group-hover:opacity-100 group-hover:bottom-10 transition-all duration-500">
                <h5 class="text-white text-[16px] mb-1">{{ member.name }}</h5>
                <p class="text-white">{{ member.designation }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
            SocialIcon: () => import("~/components/elements/SocialIcon"),
        },
        
        props: {
            member: {
                type: Object,
                default: () => {},
            },
        },
    };
</script>