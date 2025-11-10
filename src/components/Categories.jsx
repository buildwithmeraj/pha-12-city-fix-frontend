import React from "react";

const Categories = () => {
  return (
    <div>
      <h2>Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100 shadow-sm">
          <figure>
            <img
              src="https://i.ibb.co.com/zTsk0zHw/163013-1.jpg"
              alt="Garbage"
            />
          </figure>
          <div className="card-body">
            <h3 className="card-title">Garbage</h3>
            <p>
              Keep your neighborhood free from uncollected waste and overflowing
              bins.
            </p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary">View Issues</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <figure>
            <img
              src="https://i.ibb.co.com/Z60L5VpP/2149437818.jpg"
              alt="Illegal Construction"
            />
          </figure>
          <div className="card-body">
            <h3 className="card-title">Illegal Construction</h3>
            <p>Report unauthorized buildings or encroachments in your area.</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary">View Issues</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <figure>
            <img
              src="https://i.ibb.co.com/4wVsFFjD/2149437831.jpg"
              alt="Broken Public Property"
            />
          </figure>
          <div className="card-body">
            <h3 className="card-title">Broken Public Property</h3>
            <p>
              Help restore damaged benches, lights, or signs around your city.
            </p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary">View Issues</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <figure>
            <img
              src="https://i.ibb.co.com/M5BT4X3j/2149437945.jpg"
              alt="Road Damage"
            />
          </figure>
          <div className="card-body">
            <h3 className="card-title">Road Damage</h3>
            <p>
              Report potholes, cracks, or broken sidewalks to make roads safer.
            </p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary">View Issues</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
