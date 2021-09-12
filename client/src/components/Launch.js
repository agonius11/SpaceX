import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams, Link } from "react-router-dom";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

const Launch = () => {
  const { flight_number } = useParams();

  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number: Number(flight_number) },
  });

  if (loading) return <p>Loading...!</p>;
  if (error) return <p>Error :(</p>;

  const {
    launch: {
      mission_name,
      launch_year,
      launch_success,
      launch_date_local,
      rocket: { rocket_id, rocket_name, rocket_type },
    },
  } = data;

  const mission_stats = launch_success ? "text-success" : "text-danger";

  return (
    <div>
      <h1 className="my-3">
        <span className="text-dark">Mission : </span>
        <span className={mission_stats}>{mission_name}</span>
      </h1>

      <div className="row">
        <div className="col-md-6">
          <h4 className="mb-3">Launch Details</h4>
          <ul className="list-group">
            <li className="list-group-item">Flight_number : {flight_number}</li>
            <li className="list-group-item">Launch Year : {launch_year}</li>
            <li className="list-group-item">
              Launch Date Local : {launch_date_local}
            </li>
            <li className="list-group-item">
              Launch Successful :{" "}
              <span className={mission_stats}>
                {launch_success ? "yes" : "no"}
              </span>
            </li>
          </ul>
        </div>

        <div class="col-md-6">
          <h4 className="mb-3">Rocket Details</h4>
          <ul className="list-group">
            <li className="list-group-item">Rocket ID : {rocket_id}</li>
            <li className="list-group-item">Rocket Name : {rocket_name}</li>
            <li className="list-group-item">Rocket Type : {rocket_type}</li>
          </ul>
        </div>
      </div>

      <br />

      <Link to="/" className="btn btn-secondary">
        Back
      </Link>
    </div>
  );
};

export default Launch;
