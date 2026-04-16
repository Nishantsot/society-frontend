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
      desc: "The official robotics society of ADGIPS and the oldest tech society of the college, established in 2011 - embodies a rich legacy of innovation, technical excellence, and competitive achievement. Over the years, the society has played a pivotal role in fostering a strong culture of hands-on learning, problem-solving, and technological leadership. Robogyan has earned national recognition by winning the Smart India Hackathon multiple times and securing top positions in national-level robotics competitions hosted at premier IITs across India",
      img: "robogyan.png",
    },
    {
      title: "Avant Grade",
      desc: "Official art society of ADGIPS, established in 2018, stands as a dynamic collective of creative individuals committed to visual expression, artistic exploration, and cultural engagement. Over the years, the society has cultivated a vibrant space where ideas take form through art, fostering a culture of creativity, collaboration, and experimentation.",
      img: "avant.png",
    },
    {
      title: "Confluez",
      desc: "The official photography society of ADGIPS, founded in 2015 — is one of the most recognized and respected creative communities within the college, with photography at its core.",
      img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="hero-bg">
  <div className="hero-overlay">
    <div className="container py-5 text-center">

      <motion.span
        className="badge bg-danger px-3 py-2 mb-3"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
       Connect • Create • Lead
      </motion.span>

      <motion.h1
        className="fw-bold hero-title gradient-text"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Where Passion Meets Opportunity
      </motion.h1>

      <motion.p
        className="hero-text text-white mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Discover college societies, participate in exciting events,
        and build skills that shape your future.
      </motion.p>

      <motion.div
        className="d-flex flex-column flex-sm-row gap-3 mt-4 hero-buttons justify-content-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button className="btn btn-danger px-4 py-2 fw-bold">
          🚀 Explore Societies
        </button>

        <button className="btn btn-outline-light px-4 py-2 fw-bold">
          📅 View Events
        </button>
      </motion.div>

    </div>
  </div>
</div>

      <div className="container pb-5">

        <motion.h2
          className="text-center text-danger mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Popular Societies
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
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >

                <img
                  src={society.img}
                  className="card-img-top society-img"
                  alt={society.title}
                />

                <div className="card-body">
                  <h5 className="card-title">{society.title}</h5>

                  <p className="card-text">
                    {society.desc}
                  </p>

                  
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