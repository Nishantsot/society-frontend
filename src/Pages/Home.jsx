import React from "react";
import Navbar from "../Components/Navbar";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function Home() {
  const popularSocieties = [
    {
      title: "Coding Club",
      desc: "Programming competitions and hackathons.",
      img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "AI & ML Club",
      desc: "Artificial intelligence and machine learning workshops.",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Dance Club",
      desc: "Dance performances and cultural competitions.",
      img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Photography Club",
      desc: "Creative photography sessions and exhibitions.",
      img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const upcomingEvents = [
    {
      title: "Hackathon 2025",
      desc: "Organized by Coding Club",
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Dance Competition",
      desc: "Organized by Dance Club",
      img: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Photography Exhibition",
      desc: "Organized by Photography Club",
      img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "AI Workshop",
      desc: "Organized by AI & ML Club",
      img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="container py-4 py-md-5">
        <div className="hero-section">
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-6">
              <h1 className="fw-bold text-danger display-6 display-md-5">
                <i className="bi bi-buildings-fill me-2"></i>
                College Society Management Portal
              </h1>

              <p className="lead mt-3 hero-text">
                Welcome to the Society Management Portal where students explore
                technical and non-technical societies, participate in events
                and build leadership skills.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                <button className="btn btn-danger px-4 py-2">
                  Explore Societies
                </button>
                <button className="btn btn-outline-danger px-4 py-2">
                  Upcoming Events
                </button>
              </div>
            </div>

            <div className="col-12 col-md-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80"
                className="img-fluid hero-image"
                alt="College students"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-5">
        <h2 className="text-center text-danger mb-4 section-title">
          Popular Societies
        </h2>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
          }}
        >
          {popularSocieties.map((society, index) => (
            <SwiperSlide key={index}>
              <div className="card society-card h-100">
                <img
                  src={society.img}
                  className="card-img-top society-img"
                  alt={society.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{society.title}</h5>
                  <p className="card-text">{society.desc}</p>
                  <button className="btn btn-sm btn-danger">Join Now</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="container pb-5">
        <h2 className="text-center text-danger mb-4 section-title">
          Upcoming Events
        </h2>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
          }}
        >
          {upcomingEvents.map((event, index) => (
            <SwiperSlide key={index}>
              <div className="card society-card h-100">
                <img
                  src={event.img}
                  className="card-img-top society-img"
                  alt={event.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">{event.desc}</p>
                  <button className="btn btn-sm btn-outline-danger">
                    View Details
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <footer className="footer text-center">
        <p className="mb-0">© College Societies Management Portal</p>
      </footer>
    </>
  );
}

export default Home;