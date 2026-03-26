import {gql} from "graphql-tag";

const videoPostsQuery = () => {
    return gql `
        query getVideoPosts {
            postFormat(id: "17", idType: DATABASE_ID) {
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

export default videoPostsQuery;
