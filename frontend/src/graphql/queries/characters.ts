import { graphql } from '../../gql';

export const GET_CHARACTERS = graphql(`
  query GetCharacters($filter: CharacterFilterInput) {
    characters(filter: $filter) {
      id
      image
      name
      status
      gender
      description
    }
  }
`);
