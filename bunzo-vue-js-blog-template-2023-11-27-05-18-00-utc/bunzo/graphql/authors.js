import {gql} from "graphql-tag";

const authorQuery = (limit = 3) => {
    const queryArguments = `first: ${limit}`;
    
    return gql `
        query getAuthorPosts {
            users(${queryArguments}) {
                edges {
                    node {
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
            }
        }
    `
}

export default authorQuery;