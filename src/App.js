import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfo,
  faSuitcase,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import "./assets/font/font.css";
import "./App.css";
import "./responsive.css";
import Home from "./components/Home";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";

function App() {
  const Navigation = React.forwardRef((props, ref) => {
    const { navRef } = ref; 
    const { nav } = props;

    const smoothScroll = (scrollTo) => {
      var startY = window.pageYOffset; //current scroll position
      var stopY = scrollTo; // scroll to
      var distance = stopY > startY ? stopY - startY : startY - stopY;

      var speed = Math.round(distance / 100);
      if (speed >= 20) speed = 20;
      var step = Math.round(distance / 25);
      var leapY = stopY > startY ? startY + step : startY - step;
      var timer = 0;
      if (stopY > startY) {
        for (var i = startY; i < stopY; i += step) {
          setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
          leapY += step;
          if (leapY > stopY) leapY = stopY;
          timer++;
        }
        return;
      }
      for (var i = startY; i > stopY; i -= step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY -= step;
        if (leapY < stopY) leapY = stopY;
        timer++;
      }
    };

    const onClickList = (e) => {
      const lists = navRef.current.querySelectorAll("li");
      lists.forEach((el) => {
        el.classList.remove("active");
        e.target.classList.add("active");
      });
      let scrollTo = e.target.dataset.offsetTop;
      smoothScroll(scrollTo);
    };

    return (
      <ul ref={navRef} className="navigation">
        {nav.map((list, i) => (
          <li
            key={i}
            onClick={onClickList}
            className={i === 0 ? "active" : "color-white"}
            data-offset-top={list.top}
          >
            {list.icon}
            {list.name}
          </li>
        ))}
      </ul>
    );
  });

  const ScrollProgress = React.forwardRef((props, ref) => {
    return (
      <div ref={ref.progressRef} className="scroll-progress">
        <div className="progress-thumb"></div>
      </div>
    );
  });

  // <===========================>
  const navRef = useRef();
  const scrollProgressRef = useRef();
  const homeRef = useRef();
  const aboutRef = useRef();
  const portfolioRef = useRef();
  const [nav, setNav] = useState([]);

  const scrollProgress = () => {
    const thumb = scrollProgressRef.current.querySelector(".progress-thumb");
    let maxScrollable = document.body.scrollHeight - window.innerHeight;
    let transformValue = (window.scrollY / maxScrollable) * 100;
    if (window.innerWidth > 850)
      thumb.style.transform = `translateY(${transformValue}%)`;
    else
      thumb.style.transform = `translateX(${
        (window.scrollY / maxScrollable) * 100
      }%)`;
  };

  const parallax = () => {
    // parallax
    const homeTitle = homeRef.current.querySelector(".home .title");
    const homeImage = homeRef.current.querySelector(
      ".home .background-picture img"
    );

    if (window.innerWidth > 850)
      homeTitle.style.transform = `translateY(${window.pageYOffset * 0.3}%)`;
    else homeTitle.style.transform = `translateY(${window.pageYOffset * 0.1}%)`;

    if (window.innerWidth > 1800) {
      homeImage.style.transform = `translateY(${window.pageYOffset * 0.5}px`;
    }

    if (window.innerWidth <= 1800 && window.innerWidth > 1410) {
      homeImage.style.transform = `translateY(${
        window.pageYOffset * 0.5
      }px) scale(1.2)`;
    } else if (window.innerWidth <= 1410 && window.innerWidth > 1100) {
      homeImage.style.transform = `translateY(${
        window.pageYOffset * 0.5
      }px) scale(1.8)`;
    } else if (window.innerWidth <= 1100 && window.innerWidth > 950) {
      homeImage.style.transform = `translateY(${
        window.pageYOffset * 0.5
      }px) scale(2)`;
    } else if (window.innerWidth <= 950 && window.innerWidth > 850) {
      homeImage.style.transform = `translateY(${
        window.pageYOffset * 0.5
      }px) scale(2.4)`;
    } else if (window.innerWidth <= 850 && window.innerWidth > 700) {
      homeImage.style.transform = `translateY(${
        window.pageYOffset * 0.5
      }px) scale(1.6)`;
    } else if (window.innerWidth <= 700 && window.innerWidth > 550) {
      homeImage.style.transform = `translateY(${
        window.pageYOffset * 0.5
      }px) scale(2)`;
    } else if (window.innerWidth <= 550 && window.innerWidth > 500) {
      homeImage.style.transform = `translateY(${
        window.pageYOffset * 0.5
      }px) scale(2.1)`;
    } else if (window.innerWidth <= 500 && window.innerHeight > 819) {
      homeImage.style.transform = `translateY(${
        window.pageYOffset * 0.5
      }px) scale(2.5)`;
    } else if (window.innerWidth <= 500 && window.innerHeight < 819) {
      homeImage.style.transform = `translateY(${
        window.pageYOffset * 0.5
      }px) scale(2.6)`;
    }
  };

  const onScroll = () => {
    let aboutBox = aboutRef.current.getBoundingClientRect();
    let portfolioBox = portfolioRef.current.getBoundingClientRect();
    let threshold = navRef.current.offsetTop + navRef.current.clientHeight; //when to apply gray color on nav
    const lists = navRef.current.querySelectorAll("li");

    if (aboutBox.top - threshold < 0) {
      lists.forEach((li) => {
        li.classList.remove("color-white");
        li.classList.add("color-gray");
      });
    } else {
      lists.forEach((li) => {
        li.classList.remove("color-gray");
        li.classList.add("color-white");
      });
    }

    //adding active class on nav list when scrolling
    if (
      aboutBox.top < window.innerHeight / 2 &&
      aboutBox.top > -(window.innerHeight / 2)
    ) {
      lists.forEach((li, i) => {
        if (i === 1) li.classList.add("active");
        else li.classList.remove("active");
      });
    } else if (aboutBox.top > window.innerHeight / 2) {
      lists.forEach((li, i) => {
        if (i === 0) li.classList.add("active");
        else li.classList.remove("active");
      });
    }

    if (
      portfolioBox.top < window.innerHeight / 2 &&
      portfolioBox.top > -(window.innerHeight / 2)
    ) {
      lists.forEach((li, i) => {
        if (i === 2) li.classList.add("active");
        else li.classList.remove("active");
      });
    } else if (
      portfolioBox.top < window.innerHeight / 2 &&
      portfolioBox.top < -(window.innerHeight / 2)
    ) {
      lists.forEach((li, i) => {
        if (i === 3) li.classList.add("active");
        else li.classList.remove("active");
      });
    }

    scrollProgress();
    parallax();
  };

  // const onResize = () => {
  //   parallax();
  // };

  useEffect(() => {
    setNav([
      {
        icon: <Icon className="nav-icon" icon={faHome} />,
        name: "home",
        top: homeRef.current.offsetTop,
      },
      {
        icon: <Icon className="nav-icon" icon={faInfo} />,
        name: "about",
        top: aboutRef.current.offsetTop,
      },
      {
        icon: <Icon className="nav-icon" icon={faSuitcase} />,
        name: "portfolio",
        top: portfolioRef.current.offsetTop,
      },
      {
        icon: <Icon className="nav-icon" icon={faPhone} />,
        name: "contact",
        top: document.body.scrollHeight,
      },
    ]);

    window.addEventListener("scroll", onScroll);
    // window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      // window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="App">
      <Navigation ref={{ navRef: navRef }} nav={nav} />
      <ScrollProgress ref={{ progressRef: scrollProgressRef }} />
      <Home ref={homeRef} />
      <About ref={aboutRef} />
      <Portfolio ref={portfolioRef} />
      <Contact />
    </div>
  );
}

export default App;
