<template>
    <div class="container pt-15 pb-section">
        <div class="comment md:px-15">
            <Disqus shortname="admin" />
        </div>
    </div>
</template>

<script>
    import { Disqus } from 'vue-disqus';

    export default {
        components: {
            Disqus
        }
    };
</script>