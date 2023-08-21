import { Navbar } from "../components/Navbar";
import { Calendar } from "../components/Calendar";
import { EventCard } from "../components/EvenCard";
import { TeamCard } from "../components/TeamCard";
import { useState, useEffect } from "react";
import axios from "axios";

export const Dashboard = () => {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const [popup, setPopup] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [membersInput, setMembersInput] = useState([]);
  const [selectedId, setSelectedId] = useState([]);

  const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=190590552645-svjo78cho19kki5hsvoh0m09irugra96.apps.googleusercontent.com&redirect_uri=http%3A//localhost%3A5173/finishlogin&scope=openid%20email%20https%3A//www.googleapis.com/auth/calendar&response_type=code&prompt=consent`;

  const today = new Date();
  const nextday = new Date(today);
  nextday.setDate(new Date(today).getDate() + 1);

  let weekDays = [];
  let weekDates = [];

  const getWeekDays = (locals) => {
    let baseDate = new Date();
    for (let i = 0; i < 7; i++) {
      weekDays.push(baseDate.toLocaleDateString(locals, { weekday: "long" }));
      baseDate.setDate(baseDate.getDate() + 1);
      weekDates.push(
        new Date(Date.now() + 3600 * 1000 * 24 * i).toLocaleDateString()
      );
    }
    return weekDays;
  };
  getWeekDays("en-US");

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

  useEffect(() => {
    fetchTeamData();
    fetchUsers();
  }, []);

  const createTeam = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/team", {
        name: nameInput,
        description: descInput,
        members: selectedId,
        admin: selectedId,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setNameInput("");
    setDescInput("");
    setSelectedId([]);
    setMembersInput([]);
    setUserNames(users);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    createTeam();
    fetchTeamData();
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
    <div>
      <Navbar></Navbar>

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
                placeholder="name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
              <input
                type="text"
                placeholder="description"
                value={descInput}
                onChange={(e) => setDescInput(e.target.value)}
              />
              {membersInput.map((member) => (
                <p>{member}</p>
              ))}
              <select
                name="members"
                id="members"
                placeholder="choose a teammate"
                onChange={(e) => inputChange(e)}
              >
                <option disabled selected>
                  choose a teammate
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
              <TeamCard name={team.name} members={team.members}></TeamCard>
            );
          })}
        </div>
        <h2>events</h2>
        <div className="events">
          {weekDays.map((day, i) => {
            return (
              <EventCard key={i} day={day} date={weekDates[i]}></EventCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};
