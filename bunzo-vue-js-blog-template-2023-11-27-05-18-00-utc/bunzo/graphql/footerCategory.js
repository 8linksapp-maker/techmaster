import {gql} from "graphql-tag";

const menuQuery = (name) => {
    const queryArguments = `id: "${name}", idType: NAME`;

    return gql`
        query MyQuery {
            menu(${queryArguments}) {
                menuItems {
                    edges {
                        node {
                            label
                            path
                        }
                    }
                }
            }
        }
    `
}

export default menuQuery;