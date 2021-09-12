import { gql } from 'apollo-server';
import axios from 'axios';

export const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # Rocket Type
  type Rocket {
    rocket_id: String
    rocket_name: String
    rocket_type: String
  }

  # Launch Type
  type Launch {
    flight_number: Int
    mission_name: String
    launch_year: String
    launch_date_local: String
    launch_success: Boolean
    rocket: Rocket
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
    launches: [Launch]
    launch(flight_number: Int): Launch
    rockets: [Rocket]
    rocket(id: Int): Rocket
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
export const resolvers = {
  Query: {
    launches: () => {
      return axios
        .get('https://api.spacexdata.com/v3/launches')
        .then((res) => res.data);
    },
    launch: (_, { flight_number }) => {
      return axios
        .get(`https://api.spacexdata.com/v3/launches/${flight_number}`)
        .then((res) => res.data);
    },
    rockets: () => {
      return axios
        .get('https://api.spacexdata.com/v3/rockets')
        .then((res) => res.data);
    },
    rocket: (_, { id }) => {
      return axios
        .get(`https://api.spacexdata.com/v3/rocket/${id}`)
        .then((res) => res.data);
    },
  },
};
