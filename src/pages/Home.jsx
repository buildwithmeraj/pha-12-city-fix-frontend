import React from "react";
import Categories from "../components/Categories";
import LatestIssues from "../components/LatestIssues";
import CommunityStats from "../components/CommunityStats";
import VolunteerCTA from "../components/VolunteerCTA";
import HeroCarousel from "../components/HeroCarousel";

const Home = () => {
  return (
    <div>
      <title>Home - CityFix</title>
      <HeroCarousel />
      <Categories />
      <LatestIssues />
      <CommunityStats />
      <VolunteerCTA />
    </div>
  );
};

export default Home;
