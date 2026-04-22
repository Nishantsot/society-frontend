import React from "react";
import Navbar from "../Components/Navbar";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { motion } from "framer-motion";

import "swiper/css";

function Home() {

const popularSocieties = [
{
title: "Robogyan",
desc: "Robotics society focused on innovation, hands-on learning, and national hackathons, building real-world engineering skills through projects and competitions.",
img: "/robogyan.png",
},
{
title: "Avant Garde",
desc: "Creative art society encouraging visual expression, collaboration, and artistic exploration through exhibitions, murals, and interactive cultural projects.",
img: "/avant.png",
},
{
title: "Confluenz",
desc: "Photography and media society capturing impactful moments through photography, cinematography, and design, shaping the visual identity of college events.",
img: "/confluez.png",
},
{
title: "Sports Committee",
desc: "Official sports body promoting teamwork, discipline, and fitness through tournaments, competitions, and large-scale events across intra and inter-college levels.",
img: "/sport.png",
},
{
title: "GDGC",
desc: "Tech community building developers through workshops, hackathons, and projects, helping students gain practical skills and industry exposure.",
img: "/gdc.png",
},
{
title: "Yakshagan",
desc: "Dramatics and filmmaking society fostering storytelling, theatre performances, and creative expression through competitions, workshops, and productions.",
img: "/yak.png",
},
{
title: "Enactus",
desc: "Entrepreneurial society creating sustainable social impact through innovative projects, empowering communities and developing responsible future leaders.",
img: "/enactus.png",
},
{
title: "Insync",
desc: "Western dance society promoting creativity, rhythm, and performance through competitions, choreography, and energetic stage performances.",
img: "/insyc.png",
},
{
title: "Word Wizards",
desc: "Student development society enhancing communication, confidence, and leadership skills through interactive sessions, activities, and real-world exposure.",
img: "/wizard.png",
},
{
title: "GeeksforGeeks",
desc: "Technical society focused on coding, development, and problem-solving through workshops, hackathons, and structured learning programs.",
img: "/geek.png",
},
{
title: "E-Cell",
desc: "Entrepreneurship cell promoting innovation, startup culture, and leadership through events, mentorship, and real-world business exposure.",
img: "/ecell.png",
}
];

return (
<> <Navbar />

```
  <div className="hero-bg">
    <motion.div
      className="hero-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container py-5 text-center">

        <motion.span
          className="badge bg-danger px-3 py-2 mb-3"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          Connect • Create • Lead
        </motion.span>

        <motion.h1
          className="fw-bold hero-title"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Where Passion Meets Opportunity
        </motion.h1>

        <motion.p
          className="hero-text text-white mt-3"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Discover college societies, participate in exciting events,
          and build skills that shape your future.
        </motion.p>

      </div>
    </motion.div>
  </div>

  <div className="container pb-5">

    <motion.h2
      className="text-center fw-bold societies-heading"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      Societies
    </motion.h2>

    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 2500 }}
      loop
      spaceBetween={20}
      breakpoints={{
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
      }}
    >
      {popularSocieties.map((society, index) => (
        <SwiperSlide key={index}>

          <motion.div
            className="card society-card h-100"
            whileHover={{ scale: 1.05 }}
          >

            {/* ✅ IMAGE FIXED */}
            <div className="society-img-wrapper">
              <img
                src={society.img}
                className="society-img-round"
                alt={society.title}
                onError={(e) => {
                  e.target.src = "/no-image.png";   // 🔥 fallback
                }}
              />
            </div>

            <div className="card-body">
              <h5 className="card-title">{society.title}</h5>
              <p className="card-text scroll-desc">{society.desc}</p>
            </div>

          </motion.div>

        </SwiperSlide>
      ))}
    </Swiper>
  </div>

  <footer className="footer-box">
    <p className="mb-0">© ADGIPS Societies Management Portal</p>
  </footer>
</>


);
}

export default Home;
