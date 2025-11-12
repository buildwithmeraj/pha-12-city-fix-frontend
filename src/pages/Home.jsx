import React from "react";
import Categories from "../components/Categories";
import RecentIssues from "../components/RecentIssues";
import CommunityStats from "../components/CommunityStats";
import VolunteerCTA from "../components/VolunteerCTA";
import HeroCarousel from "../components/HeroCarousel";

const Home = () => {
  return (
    <div>
      <title>Home - CityFix</title>
      <HeroCarousel />
      <Categories />
      <RecentIssues />
      <CommunityStats />
      <VolunteerCTA />
    </div>
  );
};

export default Home;
