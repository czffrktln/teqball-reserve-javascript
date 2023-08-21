export const EventCard = ({
  name,
  description,
  date,
  startTime,
  endTime,
  team,
  //location
}) => {
  return (
    <div className="event-card">
      <p>{name}</p>
      <p>{description}</p>
      {/* <p>{location}</p> */}
      <p>{date}</p>
      <p>
        {startTime} - {endTime}
      </p>
      <p>{team}</p>
      <button>+</button>
    </div>
  );
};
