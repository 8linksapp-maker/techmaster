 import {gql} from "graphql-tag";

const postsQuery = (limit = 3, postsType, slug) => {
    let queryArguments = `first: ${limit}`;

    if (slug) {
        queryArguments = `${queryArguments}, where:{${postsType}Name:"${slug}"}`;
    }

    return gql`
        query getPosts {
            posts(${queryArguments}) {
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
    `
}
export default postsQuery;