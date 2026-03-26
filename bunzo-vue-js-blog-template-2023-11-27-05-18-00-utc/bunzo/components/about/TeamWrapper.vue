<template>
    <div class="team-area pb-section">
        <div class="container">
            <div class="text-center mb-9">
                <h6 class="text-[16px] mb-4">Meet Our Team Members</h6>
                <h2 class=" text-2xl md:text-[38px]">Leadership & Experienced Team</h2>
            </div>

            <div class="grid grid-cols-12 gap-7">
                <div v-for="(member, i) in teamMemberData" :key="i" class="col-span-12 xs:col-span-6 md:col-span-4 lg:col-span-3">
                    <TeamMember :member="member" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
            TeamMember: () => import("~/components/about/TeamMember"),
        },
        data() {
            return {
                teamMemberData: [
                    {
                        imgSrc: "/images/team/team-1.jpg",
                        name: "Luella Bernstein",
                        designation: "Founder",
                        socialLink: [
                            {
                                url: "#",
                                icon: "icofont-facebook"
                            },
                            {
                                url: "#",
                                icon: "icofont-skype"
                            },
                            {
                                url: "#",
                                icon: "icofont-twitter"
                            },
                        ]
                    },
                    {
                        imgSrc: "/images/team/team-2.jpg",
                        name: "Uzzal Hossain",
                        designation: "Developer",
                        socialLink: [
                            {
                                url: "#",
                                icon: "icofont-facebook"
                            },
                            {
                                url: "#",
                                icon: "icofont-skype"
                            },
                            {
                                url: "#",
                                icon: "icofont-twitter"
                            },
                        ]
                    },
                    {
                        imgSrc: "/images/team/team-3.jpg",
                        name: "Maria",
                        designation: "Developer",
                        socialLink: [
                            {
                                url: "#",
                                icon: "icofont-facebook"
                            },
                            {
                                url: "#",
                                icon: "icofont-skype"
                            },
                            {
                                url: "#",
                                icon: "icofont-twitter"
                            },
                        ]
                    },
                    {
                        imgSrc: "/images/team/team-4.jpg",
                        name: "Maya",
                        designation: "Developer",
                        socialLink: [
                            {
                                url: "#",
                                icon: "icofont-facebook"
                            },
                            {
                                url: "#",
                                icon: "icofont-skype"
                            },
                            {
                                url: "#",
                                icon: "icofont-twitter"
                            },
                        ]
                    },
                    {
                        imgSrc: "/images/team/team-5.jpg",
                        name: "Luella Bernstein",
                        designation: "Founder",
                        socialLink: [
                            {
                                url: "#",
                                icon: "icofont-facebook"
                            },
                            {
                                url: "#",
                                icon: "icofont-skype"
                            },
                            {
                                url: "#",
                                icon: "icofont-twitter"
                            },
                        ]
                    },
                    {
                        imgSrc: "/images/team/team-6.jpg",
                        name: "Jackulin",
                        designation: "Developer",
                        socialLink: [
                            {
                                url: "#",
                                icon: "icofont-facebook"
                            },
                            {
                                url: "#",
                                icon: "icofont-skype"
                            },
                            {
                                url: "#",
                                icon: "icofont-twitter"
                            },
                        ]
                    },
                    {
                        imgSrc: "/images/team/team-7.jpg",
                        name: "Maria",
                        designation: "Developer",
                        socialLink: [
                            {
                                url: "#",
                                icon: "icofont-facebook"
                            },
                            {
                                url: "#",
                                icon: "icofont-skype"
                            },
                            {
                                url: "#",
                                icon: "icofont-twitter"
                            },
                        ]
                    },
                    {
                        imgSrc: "/images/team/team-8.jpg",
                        name: "Maya",
                        designation: "Developer",
                        socialLink: [
                            {
                                url: "#",
                                icon: "icofont-facebook"
                            },
                            {
                                url: "#",
                                icon: "icofont-skype"
                            },
                            {
                                url: "#",
                                icon: "icofont-twitter"
                            },
                        ]
                    },
                ]
            }
        },
    };
</script>