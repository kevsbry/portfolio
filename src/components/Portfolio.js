import React, { useRef } from "react";
//react projects images
import citiesImg from "../assets/photos/react_projects/cities.png";
import mophoriaImg from "../assets/photos/react_projects/mophoria.png";
import serverImg from "../assets/photos/react_projects/smartserver.png";
import travelerEuImg from "../assets/photos/react_projects/traveler_europe.png";
import travelerPhImg from "../assets/photos/react_projects/traveler_philippines.png";
//game project images
import puffypuffImg from "../assets/photos/game_projects/puffypuff.png";
import lovehateImg from "../assets/photos/game_projects/love or hate.png";
import lovetrapImg from "../assets/photos/game_projects/love trap.png";
import faceoffImg from "../assets/photos/game_projects/faceoff.png";
import fasterImg from "../assets/photos/game_projects/faster.png";

const Portfolio = React.forwardRef((props, portfolioRef) => {
  // Pagination Component
  const Pagination = (props) => {
    const paginationRef = useRef();

    const onClickPage = (event) => {
      const pages = paginationRef.current.querySelectorAll("span");
      const target = event.target;
      pages.forEach((el) => el.classList.remove("active"));
      target.classList.add("active");
      let transformValue = event.target.dataset.transformValue;
      props.transformSlide(transformValue);
    };

    return (
      <div ref={paginationRef} className="pagination">
        {props.pages.map((page, i) => (
          <span
            key={i}
            className={page.isActive && "active"}
            data-transform-value={page.transformValue}
            onClick={onClickPage}
          >
            {page.name}
          </span>
        ))}
      </div>
    );
  };

  // Projects Component
  const Projects = React.forwardRef((props, ref) => {
    const gameProjects = [
      {
        image: puffypuffImg,
        link:
          "https://play.google.com/store/apps/details?id=com.nivekbryan.puffypuff",
        background: "#04213A",
      },
      {
        image: lovehateImg,
        link:
          "https://play.google.com/store/apps/details?id=com.nivekbryan.positivechoices",
        background: "#24e4e2",
      },
      {
        image: lovetrapImg,
        link:
          "https://play.google.com/store/apps/details?id=com.nivekbryan.lovetrap",
        background: "#607d8b",
      },
      {
        image: faceoffImg,
        link:
          "https://play.google.com/store/apps/details?id=com.nivekbryan.thefaceoff",
        background: "#607d8b",
      },
      {
        image: fasterImg,
        link:
          "https://play.google.com/store/apps/details?id=com.nivekbryan.fasternfaster",
        background: "#3498db",
      },
    ];

    const openPage = (link) => {
      window.open(link, "_blank");
    };

    const ReactProjects = (props) => {
      return (
        <div className="react-project-set">
          <div className="column-one">
            <img
              src={mophoriaImg}
              alt="mophoria image"
              onClick={() => {
                openPage("https://kevsbry.github.io/mophoria");
              }}
            />
          </div>
          <div className="column-two">
            <div className="project-one">
              <img
                src={travelerPhImg}
                alt="traveler ph image"
                onClick={() => {
                  openPage("https://kevsbry.github.io/traveler-philippines/");
                }}
              />
            </div>
            <div className="project-two">
              <img
                src={serverImg}
                alt="server image"
                onClick={() => {
                  openPage("https://kevsbry.github.io/smart-server/");
                }}
              />
            </div>
            <div className="project-three">
              <img
                src={citiesImg}
                alt="cities image"
                onClick={() => {
                  openPage("https://kevsbry.github.io/traveler-europe/");
                }}
              />
            </div>
          </div>
          <div className="column-three">
            <img
              src={travelerEuImg}
              alt="traveler eu image"
              onClick={() => {
                openPage("https://kevsbry.github.io/traveler-europe/");
              }}
            />
          </div>
        </div>
      );
    };

    const GameProjects = (props) => {
      return (
        <div className="game-project-set">
          {props.projects.map((project, i) => (
            <a key={i} href={project.link} target="_blank">
              <img
                style={{ background: project.background }}
                src={project.image}
                alt="game project image"
              />
            </a>
          ))}
        </div>
      );
    };

    return (
      <div className="projects">
        <div ref={ref} className="slide">
          <ReactProjects />
          <GameProjects projects={gameProjects} />
        </div>
      </div>
    );
  });

  const slideRef = useRef();
  const transformSlide = (amount) => {
    slideRef.current.style.transform = `translateX(-${amount}%)`;
    slideRef.current.style.transition = "transform 500ms ease-in-out";
  };

  const pages = [
    {
      name: "react.js",
      isActive: true,
      transformValue: 0,
    },
    {
      name: "games",
      isActive: false,
      transformValue: 100,
    },
  ];

  return (
    <div ref={portfolioRef} className="portfolio">
      <span className="title">my works</span>
      <Pagination pages={pages} transformSlide={transformSlide} />
      <Projects ref={slideRef} />
    </div>
  );
});

export default Portfolio;
