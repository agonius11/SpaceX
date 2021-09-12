import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const LAUNCHES_QUERY = gql`
  query LauchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

const Launches = () => {

  const { loading, error, data } = useQuery(LAUNCHES_QUERY);

  if (loading) return <p>Loading...!</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h3 className="my-3">Launches</h3>
      <table class="table table-hover">
        <thead>
          <tr style={{ backgroundColor: "#333", color: "#fff" }}>
            <th scope="col">Mision</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.launches.map((launch) => (
            <tr>
              <td>
                <strong>{launch.mission_name}</strong>
              </td>
              <td>{launch.launch_date_local}</td>
              <td>
                <span
                  style={{ color: "white", padding: "5px" }}
                  className={`badge bg-${
                    launch.launch_success ? "success" : "danger"
                  }`}
                >
                  {launch.launch_success ? "Success" : "Fail"}
                </span>
              </td>
              <td>
                {" "}
                <Link
                  to={`/launch/${launch.flight_number}`}
                  className="btn btn-secondary"
                >
                  Launch Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Launches;
