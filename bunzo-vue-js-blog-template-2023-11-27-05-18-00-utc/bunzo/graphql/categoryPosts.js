import {gql} from "graphql-tag";

const categoryPostsQuery = () => {
    return gql `
        query getCategoryPosts($categorySlug: ID!){
            category(id: $categorySlug, idType: SLUG) {
                name
                posts(first: 100) {
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

export default categoryPostsQuery;
