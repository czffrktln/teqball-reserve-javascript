import { Navbar } from "../components/Navbar";
import { Calendar } from "../components/Calendar";
import { EventCard } from "../components/EventCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { createTheme } from "@mui/system";

export const Events = () => {
  //const [teams, setTeams] = useState([])
  const [users, setUsers] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const [popup, setPopup] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [membersInput, setMembersInput] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setSetEndTime] = useState("");
  const [attendees, setAttendees] = useState("");
  const [team, setTeam] = useState("");
  const [teamNames, setTeamNames] = useState("");
  const [location, setLocation] = useState("") 
  


  const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=190590552645-svjo78cho19kki5hsvoh0m09irugra96.apps.googleusercontent.com&redirect_uri=http%3A//localhost%3A5173/finishlogin&scope=openid%20email%20https%3A//www.googleapis.com/auth/calendar&response_type=code&prompt=consent`;

  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const formattedDate = getFormattedDate();

  const fetchTeamData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/team");
      setTeamNames(response.data);
      setTeam(response.data);
      //console.log(team)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEventData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/event");
      setEvents(response.data);
      //console.log(events)
    } catch (error) {
      console.log(error);
    }
  };

  const createEvent = async () => {
    try {
      const playersID = team.find((team) => team._id == selectedId).members;
      //console.log(playersID)
      const response = await axios.post("http://localhost:3000/api/event", {
        name: nameInput,
        description: descInput,
        location: location,
        startDate: startDate,
        startTime: startTime,
        endTime: endTime,
        attendees: playersID,
        team: selectedId,
      });
    } catch (error) {
      console.log(error);
    }
    setNameInput("");
    setDescInput("");
    setStartDate("");
    setStartTime(formattedDate);
    setSetEndTime("");
    setAttendees([]);
    setTeam(team);
    fetchEventData();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    createEvent();
  };

  const inputChange = (e) => {
    //console.log(e.target)
    setSelectedId(team.find((team) => team.name === e.target.value)._id);
    //console.log(selectedId)

    // setMembersInput(prevState => [e.target.value , ...prevState ])
    // setSelectedId(prevState => [users.find( user => user.name===e.target.value)._id , ...prevState ])
    // setTeamNames(teamNames.filter( team => team.name!=e.target.value))
    // console.log(selectedId)
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
    fetchEventData();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className="main">
        <h1>Events</h1>
        <button onClick={() => setPopup((prevState) => !prevState)}>
          Create event
        </button>

        {popup && (
          <div className="form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Event name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
              <input
                type="text"
                placeholder="Description"
                value={descInput}
                onChange={(e) => setDescInput(e.target.value)}
              />
                {/* <input 
                    type="text"
                    placeholder="location" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                     /> */}
              {membersInput.map((member) => (
                <p>{member}</p>
              ))}
              <label></label>
              <input
                type="date"
                id="start"
                name="trip-start"
                // value= {formattedDate}
                min={formattedDate}
                onChange={(event) => setStartDate(event.target.value)}
              ></input>
              <input
                type="time"
                id="start-time"
                name="start-time"
                min="09:00"
                max="18:00"
                required
                onChange={(event) => setStartTime(event.target.value)}
              ></input>
              <input
                type="time"
                id="end-time"
                name="end-time"
                min="09:00"
                max="18:00"
                required
                onChange={(event) => setSetEndTime(event.target.value)}
              ></input>
              <select
                name="team"
                id="team"
                placeholder="choose a teammate"
                onChange={(e) => inputChange(e)}
              >
                <option disabled selected>
                  choose team
                </option>
                {teamNames.map((team) => (
                  <option value={team.name} key={team._id}>
                    {" "}
                    {team.name}{" "}
                  </option>
                ))}
              </select>
              <button type="submit">Create</button>
            </form>
          </div>
        )}

        <div className="events">
          {events.map((event, i) => {
            return (
              <EventCard
                key={i}
                name={event.name}
                description={event.description}
                location={event.location}
                date={event.startDate}
                startTime={event.startTime}
                endTime={event.endTime}
                team={team.find(team=> team._id==event.team).name}
              ></EventCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// name: { type: String, required: true },
//   description: { type: String },
//   members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
//   admin: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
