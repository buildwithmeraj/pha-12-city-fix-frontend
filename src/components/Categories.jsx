import React from "react";
import { Fade } from "react-awesome-reveal";

const Categories = () => {
  const categories = [
    {
      title: "Garbage",
      image: "https://i.ibb.co.com/zTsk0zHw/163013-1.jpg",
      description:
        "Keep your neighborhood free from uncollected waste and overflowing bins.",
    },
    {
      title: "Illegal Construction",
      image: "https://i.ibb.co.com/Z60L5VpP/2149437818.jpg",
      description:
        "Report unauthorized buildings or encroachments in your area.",
    },
    {
      title: "Broken Public Property",
      image: "https://i.ibb.co.com/4wVsFFjD/2149437831.jpg",
      description:
        "Help restore damaged benches, lights, or signs around your city.",
    },
    {
      title: "Road Damage",
      image: "https://i.ibb.co.com/M5BT4X3j/2149437945.jpg",
      description:
        "Report potholes, cracks, or broken sidewalks to make roads safer.",
    },
  ];

  return (
    <div className="py-4 lg:py-6">
      <h2>Categories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <Fade key={idx}>
            <div className="rounded-xl border border-base-300 bg-base-100 hover:bg-base-200 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-semibold text-lg text-base-content">
                  {cat.title}
                </h3>
                <p className="text-sm text-base-content/70">
                  {cat.description}
                </p>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default Categories;
