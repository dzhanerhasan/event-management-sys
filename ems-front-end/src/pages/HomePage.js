import CardElement from "../components/CardElement";
import viewAllPhoto from "../images/view-all.jpg";
import CreateEventPhoto from "../images/create-event.jpg";
import MyEventsPhoto from "../images/my-events.jpg";
import "../styles/HomePage.css";
import { useSelector } from "react-redux";

const HomePage = () => {
  const username = useSelector((state) => state.user.user.username);

  return (
    <div className="container-md my-5">
      <h1 className="text-center animated-title">
        Welcome to our Event Planning System
      </h1>
      <p className="text-center lead my-4 animated-description">
        Our intuitive event planning system is designed to simplify the entire
        process, from creating an event to managing guest lists and tracking
        RSVPs. With our platform, you can easily find and attend events that
        align with your interests, or even create your own event from scratch.
      </p>
      <div className="row">
        <CardElement
          imageSrc={viewAllPhoto}
          title="View All Events"
          text="Browse through all upcoming events in our system and find the ones that interest you."
          linkTo="/all-events"
          delay={1}
        />
        <CardElement
          imageSrc={CreateEventPhoto}
          title="Create Event"
          text="Start planning your next event by creating it in our system and adding all the necessary details."
          linkTo="/create-event"
          delay={1.2}
        />
        <CardElement
          imageSrc={MyEventsPhoto}
          title="My Profile"
          text="Keep track of all the events you have created and those that you are going to attend in one convenient location."
          linkTo={`/user-profile/${username}`}
          delay={1.4}
        />
      </div>
    </div>
  );
};

export default HomePage;
