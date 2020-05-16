import { GolangSVG, PhotoshopSVG, LightroomSVG, XdSVG } from "./SVG";
import React, { useState, useRef } from "react";
import photo from "../assets/photos/b&w.png";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import {
  faJs,
  faReact,
  faHtml5,
  faCss3Alt,
  faJava,
} from "@fortawesome/free-brands-svg-icons";

const About = React.forwardRef((props, ref) => {
  const Info = (props) => {
    return (
      <div className="info">
        <span className="title">{props.title}</span>
        <span className="description">{props.me}</span>
        <div className="image-container-mobile">
          <img src={photo} alt="photo" />
        </div>
      </div>
    );
  };

  const Skills = React.forwardRef((props, ref) => {
    const arrowDownStyle = {
      fontSize: "1.4rem",
      position: "absolute",
      marginLeft: "auto",
      marginRight: "auto",
      bottom: "0",
      left: "45.5%",
    };
    const Skill = (props) => {
      return (
        <div
          className={`skill ${props.description !== "" && "skill-expandable"}`}
        >
          {props.icon}
          <span className="name">{props.name}</span>
          <span className="desc">{props.description}</span>
          {props.description !== "" && (
            <Icon
              className="arrow-down"
              style={arrowDownStyle}
              icon={faAngleDown}
            />
          )}
        </div>
      );
    };

    return (
      <div className="skills">
        <span
          style={{
            color: "var(--text-color)",
            textTransform: "uppercase",
            fontFamily: "Segoe UI Regular",
            fontSize: "2rem",
            marginBottom: "0.8em",
          }}
        >
          skills
        </span>
        <div ref={ref} className="slide">
          <div className="skills-set">
            {/*skill set 1*/}
            {props.skills.map((skill, i) => (
              <Skill
                key={i}
                icon={skill.icon}
                name={skill.name}
                description={skill.description}
              />
            ))}
          </div>
          <div className="skills-set">
            {/*skill set 2*/}

            {props.skills1.map((skill, i) => (
              <Skill
                key={i}
                icon={skill.icon}
                name={skill.name}
                description={skill.description}
              />
            ))}
          </div>
        </div>
      </div>
    );
  });

  const Pagination = React.forwardRef((props, ref) => {
    const { prev, next } = ref;
    const { onNext, onPrev } = props;
    return (
      <div className="pagination">
        <div ref={prev} className="page active" onClick={onPrev}></div>
        <div ref={next} className="page" onClick={onNext}></div>
      </div>
    );
  });

  const [me, setMe] = useState(
    "Hi! I'm Kevin Bryan Bautista a 24 year old developer, I got into programming because of my passion for video games and managed to publish some of my small games on Google Play. I'm also knowledgeable in Web Development both in backend and frontend development, but I consider myself more of a frontend developer. I have experience in Golang as it was the used programming language in my previous job. I'm really into frontend developement because I love designing websites and experimenting with various tools, after leaving my previous job I taught myself React which I'm planning to use for both web and mobile development."
  );

  //skill set 1
  const [skills, setSkills] = useState([
    {
      icon: <Icon className="skill-icon" icon={faJs} />,
      name: "JavaScript",
      description: "Vanilla js & a bit of jQuery / Vue.js",
    },
    {
      icon: <Icon className="skill-icon" icon={faReact} />,
      name: "React.js",
      description: "",
    },
    {
      icon: <Icon className="skill-icon" icon={faHtml5} />,
      name: "HTML",
      description: "",
    },
    {
      icon: <Icon className="skill-icon" icon={faCss3Alt} />,
      name: "CSS",
      description: "Vanilla CSS & Bootstrap 4",
    },
    {
      icon: <Icon className="skill-icon" icon={faJava} />,
      name: "Java",
      description: "Game Dev / Libgdx Framework",
    },
    {
      icon: <GolangSVG />,
      name: "Golang",
      description: "Standard Golang",
    },
  ]);

  //skill set 2
  const skills1 = [
    {
      icon: <PhotoshopSVG />,
      name: "Photoshop",
      description: "",
    },
    {
      icon: <LightroomSVG />,
      name: "Lightroom",
      description: "",
    },
    {
      icon: <XdSVG />,
      name: "Adobe Xd",
      description: "",
    },
  ];

  const carouseSlide = useRef();
  const Prev = useRef();
  const Next = useRef();
  const onPrev = () => {
    carouseSlide.current.style.transform = "translateX(0%)";
    carouseSlide.current.style.transition = "transform 400ms ease-in-out";
    Next.current.classList.remove("active");
    Prev.current.classList.toggle("active");
  };

  const onNext = () => {
    carouseSlide.current.style.transform = "translateX(-100%)";
    carouseSlide.current.style.transition = "transform 400ms ease-in-out";
    Prev.current.classList.remove("active");
    Next.current.classList.toggle("active");
  };

  return (
    <div ref={ref} className="about">
      <div className="about-flex">
        <div className="flex-column">
          <Info title="about me" me={me} />
          <Skills ref={carouseSlide} skills={skills} skills1={skills1} />
          <Pagination
            ref={{ prev: Prev, next: Next }}
            onNext={onNext}
            onPrev={onPrev}
          />
        </div>
        <div className="image-container">
          <img src={photo} alt="photo" />
        </div>
      </div>
    </div>
  );
});

export default About;
