import React from "react";
import photo from "../assets/photos/black and white.png";

const Home = React.forwardRef((props, ref) => {
  const Title = () => {
    return (
      <div className="title">
        <span className="text">Hi! I'm</span>
        <span className="name">Kevin Bryan</span>
        <span className="job">I'm a Web & Game Developer</span>
      </div>
    );
  };

  return (
    <div ref={ref} className="home">
      <div className="background-picture">
        <img src={photo} alt="background picture" />
      </div>
      <Title />
    </div>
  );
});

export default Home;
