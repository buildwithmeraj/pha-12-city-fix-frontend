import React from "react";
import { Link } from "react-router";

const VolunteerCTA = () => {
  return (
    <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16 mt-12 rounded-xl">
      <div className="max-w-5xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold mb-4">
          Join Our Community Clean Drive!
        </h2>
        <p className="text-lg mb-8 text-green-100 max-w-3xl mx-auto">
          Be the change you wish to see! Volunteer to help make your city
          cleaner, greener, and better for everyone. Together, we can make a
          real difference.
        </p>

        <Link
          className="btn btn-wide bg-white text-green-700 border-none hover:bg-green-100 shadow-md hover:shadow-lg transition font-semibold"
          to="/volunteer"
        >
          Become a Volunteer
        </Link>
      </div>
    </section>
  );
};

export default VolunteerCTA;
