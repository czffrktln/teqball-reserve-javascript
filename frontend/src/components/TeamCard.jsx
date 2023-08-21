import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export const TeamCard = ({
  name,
  description,
  members,
  events,
  joinHandle,
}) => {
  const { token } = useContext(UserContext);

  const [showDetails, setShowDetails] = useState(false);
  const [more, setMore] = useState("description");

  const [teamusers, setTeamusers] = useState([]);

  const handleClick = async () => {
    setShowDetails(!showDetails);
    Promise.all(members.map((id) => fetchMembers(id))).then(function (
      response
    ) {
      console.log("response", response);
      setTeamusers(response);
    });
  };

  console.log("teamusers", teamusers);

  // function getAllData(URLs){
  //   return Promise.all(URLs.map(fetchData));
  // }

  // function fetchData(URL) {
  //   return axios
  //     .get(URL)
  //     .then(function(response) {
  //       return {
  //         success: true,
  //         data: response.data
  //       };
  //     })
  //     .catch(function(error) {
  //       return { success: false };
  //     });
  // }

  const fetchMembers = async (id) => {
    console.log(id);
    try {
      const response = await axios.get(`http://localhost:3000/api/user/${id}`, {
        headers: {
          token: token,
        },
      });
      // console.log("response", response.data.name);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="team-card">
      <div className="infos">
        <p>{name}</p>

        <button onClick={handleClick}>More</button>

        <button onClick={joinHandle}>Join</button>
      </div>

      {showDetails && (
        <div>
          <div className="more-buttons">
            <button
              value="description"
              onClick={(e) => setMore(e.target.value)}
            >
              Description
            </button>
            <button value="members" onClick={(e) => setMore(e.target.value)}>
              Members
            </button>
            <button value="events" onClick={(e) => setMore(e.target.value)}>
              Events
            </button>
          </div>

          {more === "description" && <p>{description}</p>}
          {more === "members" && (
            <div>
              {teamusers.map((member) => {
                return (
                  <div className="member-icon">
                    <p>{member}</p>
                    <button>Admin</button>
                    <button>Remove</button>
                  </div>
                );
              })}
            </div>
          )}
          {more === "events" && (
            <div>
              {events.map((events) => {
                return (
                  <div className="member-icon">
                    <p>{events}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
