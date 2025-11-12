import React from "react";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

const VolunteerForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const area = form.area.value.trim();
    const message = form.message.value.trim();
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

    if (!name || !email || !phone || !area || !message) {
      toast.error("Please fill out all fields");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thank you for volunteering!");
    form.reset();
  };

  return (
    <div className="max-w-3xl mx-auto bg-base-100 border border-base-300 rounded-xl shadow-sm p-8 mt-10">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        Volunteer with US
      </h2>
      <p className="text-center text-base-content/70 mb-8">
        Join hands to make our city cleaner, safer, and better. Fill out the
        form below to become a volunteer.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="tel"
            name="phone"
            className="input input-bordered w-full"
            placeholder="+880 1XXXXXXXXX"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Area of Interest</label>
          <select name="area" className="select select-bordered w-full">
            <option value="">Select one</option>
            <option value="Garbage Management">Garbage Management</option>
            <option value="Road Repair">Road Repair</option>
            <option value="Public Awareness">Public Awareness</option>
            <option value="Tree Plantation">Tree Plantation</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            name="message"
            className="textarea textarea-bordered w-full"
            rows="4"
            placeholder="Tell us why you want to volunteer..."
          ></textarea>
        </div>

        <div className="pt-4 text-center">
          <button type="submit" className="btn btn-primary btn-block">
            <Send size={18} />
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default VolunteerForm;
