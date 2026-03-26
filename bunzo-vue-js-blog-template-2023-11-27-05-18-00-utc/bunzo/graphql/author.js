import {gql} from "graphql-tag";

const queryAuthorPosts = () => {
    return gql `
        query getAuthorPosts ($authorSlug: ID!) {
            user(id: $authorSlug, idType: SLUG) {
                id
                name
                slug
                description
                avatar {
                    url
                }
                posts {
                    edges {
                        node {
                            id
                            slug
                            uri
                            title(format: RENDERED)
                            excerpt(format: RENDERED)
                            content(format: RENDERED)
                            video
                            categories {
                                edges {
                                    node {
                                        id
                                        name
                                        slug
                                        uri
                                    }
                                }
                            }
                            tags {
                                edges {
                                    node {
                                        id
                                        name
                                        slug
                                    }
                                }
                            }
                            author {
                                node {
                                    id
                                    name
                                    uri
                                    slug
                                }
                            }
                            date
                            featuredImage {
                                node {
                                    id
                                    sourceUrl
                                }
                            }
                        }
                    }
                }
            }
        }
    `
}

export default queryAuthorPosts;