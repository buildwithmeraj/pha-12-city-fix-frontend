import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "react-router";
import { Typewriter } from "react-simple-typewriter";
import { JackInTheBox } from "react-awesome-reveal";

const HeroCarousel = () => {
  const slides = [
    "https://i.ibb.co.com/5hHMYMvg/23935.jpg",
    "https://i.ibb.co.com/MyZ2kV4g/27358.jpg",
    "https://i.ibb.co.com/gMn6qjnP/20897.jpg",
    "https://i.ibb.co.com/JSrvrPS/69856.jpg",
    "https://i.ibb.co.com/BVS47FZm/2148394711.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="backdrop-blur-lg ">
      <div className="container mx-auto px-2 lg:px-4 py-2">
        <div className="rounded-2xl shadow-xl bg-gradient-to-r from-green-600 to-emerald-600 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center text-white p-8 lg:p-12">
              <div className="flex items-center justify-center gap-3 mb-8">
                <JackInTheBox>
                  <div className="w-14 h-14 bg-white rounded-lg p-2.5 shadow-md">
                    <img src={logo} alt="logo" className="w-10" />
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold">
                    City<span className="text-orange-400">Fix</span>
                  </h1>
                </JackInTheBox>
              </div>

              <h1 className="text-2xl lg:text-3xl font-semibold mb-4">
                Building Better Communities Together
              </h1>
              <p className="mb-4">
                <Typewriter
                  words={[
                    `Join the movement to make our communities cleaner, safer, and stronger. Report issues, contribute to solutions, and be part of positive change.`,
                    `Together, we can build a city we’re proud of — cleaner streets, safer roads, and stronger communities for everyone.`,
                    `Be the voice of change in your neighborhood — report issues, take action, and help shape a better tomorrow.`,
                    `Empower your community by taking the first step — fix problems, support solutions, and inspire collective progress.`,
                  ]}
                  loop={Infinity}
                  cursor
                  typeSpeed={40}
                  deleteSpeed={20}
                  delaySpeed={100}
                />
              </p>
              <div className="grid grid-cols-3 gap-2 lg:gap-4 mb-8">
                <div className="bg-white/10 rounded-lg p-3 lg:p-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold">400+</div>
                  <div className="text-sm text-white/80">Reported</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 lg:p-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold">250+</div>
                  <div className="text-sm text-white/80">Resolved</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 lg:p-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold">800+</div>
                  <div className="text-sm text-white/80">Contributors</div>
                </div>
              </div>

              <div className="flex flex-col justify-center sm:flex-row gap-3">
                <Link
                  className="btn bg-white text-green-600 hover:bg-gray-100 border-none font-semibold px-6"
                  to="/report-issue"
                >
                  <Plus className="w-5 h-5" />
                  Report an Issue
                </Link>
                <Link
                  className="btn btn-outline border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold px-6"
                  to="/issues"
                >
                  <Search className="w-5 h-5" />
                  Browse Issues
                </Link>
              </div>
            </div>

            <div className="relative h-64 lg:h-auto lg:min-h-[500px] overflow-hidden">
              {slides.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Community initiative ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    currentSlide === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
