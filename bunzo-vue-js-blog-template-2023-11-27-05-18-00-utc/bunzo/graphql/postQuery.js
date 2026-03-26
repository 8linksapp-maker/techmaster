import {gql} from "graphql-tag";

const postQuery = () => {

    return gql`
        query getPost($slug: ID!) {
            post(id: $slug, idType: SLUG) {
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
    `
}

export default postQuery;