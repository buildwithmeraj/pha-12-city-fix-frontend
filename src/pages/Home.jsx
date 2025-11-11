import React from "react";
import SliderCarousel from "../components/SliderCarousal";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import LatestIssues from "../components/LatestIssues";
import CommunityStats from "../components/CommunityStats";
import VolunteerCTA from "../components/VolunteerCTA";

const Home = () => {
  return (
    <div>
      <div className="backdrop-blur-sm rounded-xl">
        <div className="container mx-auto px-4 py-8 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <Banner />
            <SliderCarousel />
          </div>
        </div>
      </div>
      <Categories />
      <LatestIssues />
      <CommunityStats />
      <VolunteerCTA />
    </div>
  );
};

export default Home;
