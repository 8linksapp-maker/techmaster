 import {gql} from "graphql-tag";

const categoriesQuery = (limit = 3) => {
    const queryArguments = `first: ${limit}`;

    return gql`
        query getCategoriesQuery {
            categories(${queryArguments}, where: {exclude: "1"}) {
                edges {
                    node {
                        id
                        name
                        slug
                        uri
                        thumbnail
                    }
                }
            }
        }
    `
}
export default categoriesQuery;