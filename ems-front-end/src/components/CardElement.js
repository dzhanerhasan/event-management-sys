import "../styles/CardElement.css";

import { Link } from "react-router-dom";

const CardElement = ({ imageSrc, title, text, linkTo, delay }) => {
  return (
    <div
      className="col-lg-4 col-md-6 mb-4 card-container"
      style={{ animationDelay: `${delay}s` }}
    >
      <Link to={linkTo} className="text-decoration-none">
        <div
          className="card h-100 rounded card-element"
          style={{ backgroundImage: `url(${imageSrc})` }}
        >
          <div className="card-body d-flex flex-column justify-content-center align-items-center">
            <h4 className="card-title text-white">{title}</h4>
            <p className="card-text text-white">{text}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardElement;
