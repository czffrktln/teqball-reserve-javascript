import { Navbar } from "../components/Navbar";
import { TeamCard } from "../components/TeamCard";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export const Teams = () => {
  const { token } = useContext(UserContext);

  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const [popup, setPopup] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [membersInput, setMembersInput] = useState([]);
  const [selectedId, setSelectedId] = useState([]);

  console.log("teams", teams);
  console.log("users", users);

  const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=190590552645-svjo78cho19kki5hsvoh0m09irugra96.apps.googleusercontent.com&redirect_uri=http%3A//localhost%3A5173/finishlogin&scope=openid%20email%20https%3A//www.googleapis.com/auth/calendar&response_type=code&prompt=consent`;

  const fetchTeamData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/team");
      setTeams(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/user");
      setUsers(response.data);
      setUserNames(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const joinHandle = async (id) => {
    console.log(id);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/team/join",
        {
          teamId: id,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    fetchTeamData();
  };

  useEffect(() => {
    fetchTeamData();
    fetchUsers();
  }, []);

  const createTeam = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/team",
        {
          name: nameInput,
          description: descInput,
          members: selectedId,
          admin: selectedId,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setNameInput("");
    setDescInput("");
    setSelectedId([]);
    setMembersInput([]);
    setUserNames(users);
    fetchTeamData();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    createTeam();
  };

  const inputChange = (e) => {
    console.log(e.target);
    setMembersInput((prevState) => [e.target.value, ...prevState]);
    setSelectedId((prevState) => [
      users.find((user) => user.name === e.target.value)._id,
      ...prevState,
    ]);
    setUserNames(userNames.filter((user) => user.name != e.target.value));
    console.log(selectedId);
  };

  useEffect(() => {
    console.log(membersInput);
  }, [membersInput]);

  return (
    <>
      <Navbar></Navbar>
      <div className="main">
        <div className="dashboard">
          {/* <Calendar></Calendar> */}
          <h1>Teams</h1>
          <button onClick={() => setPopup((prevState) => !prevState)}>
            Create a team
          </button>
          {popup && (
            <div className="form">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={descInput}
                  onChange={(e) => setDescInput(e.target.value)}
                />
                {membersInput.map((member) => (
                  <p>{member}</p>
                ))}
                <select
                  name="members"
                  id="members"
                  placeholder="Choose a teammate"
                  onChange={(e) => inputChange(e)}
                >
                  <option disabled selected>
                    Choose a teammate
                  </option>
                  {userNames.map((user) => (
                    <option value={user.name} key={user._id}>
                      {" "}
                      {user.name}{" "}
                    </option>
                  ))}
                </select>
                <button type="submit">Create</button>
              </form>
            </div>
          )}

          <div className="teams">
            {teams.map((team) => {
              return (
                <TeamCard
                  name={team.name}
                  description={team.description}
                  members={team.members}
                  events={team.events}
                  joinHandle={() => joinHandle(team._id)}
                ></TeamCard>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
