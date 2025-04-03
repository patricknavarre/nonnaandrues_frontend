import React from "react";
import { useSelector } from "react-redux";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const { config } = useSelector((state) => state.site);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-southern-green">
          Home
        </Link>
        <ChevronRight className="mx-1" size={16} />
        <span className="font-medium text-southern-brown">About Us</span>
      </div>

      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-southern-brown mb-8">
        Our Story
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image Section */}
        <div className="rounded-southern overflow-hidden">
          <img
            src="/images/about-store.jpg"
            alt="Nonna & Rue's Shop Interior"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/800x600/png?text=Nonna+%26+Rue%27s";
            }}
          />
        </div>

        {/* Content Section */}
        <div>
          <h2 className="text-2xl font-heading font-semibold text-southern-brown mb-4">
            The Heart Behind Nonna & Rue's
          </h2>
          <p className="text-gray-700 mb-4">
            Founded in 2023, Nonna & Rue's Unique Finds started with a simple
            passion: the joy of discovering treasures with stories to tell. Our
            founders, a grandmother ("Nonna") and her granddaughter ("Rue"),
            turned their weekend antiquing adventures into a curated collection
            of vintage pieces and handcrafted items that speak to the soul.
          </p>
          <p className="text-gray-700 mb-4">
            What began as a small booth at the local flea market has grown into
            a beloved boutique specializing in one-of-a-kind collectibles,
            restored furniture, and artisanal home goods that add character and
            warmth to any space.
          </p>
          <p className="text-gray-700">
            Every item in our collection is personally selected with an eye for
            quality, uniqueness, and the stories they carry from generation to
            generation. We believe that objects with history bring special
            energy to your home, connecting the past with your present in
            meaningful ways.
          </p>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-heading font-semibold text-southern-brown mb-8 text-center">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-southern-beige/30 p-6 rounded-southern">
            <h3 className="text-xl font-heading font-semibold text-southern-brown mb-3">
              Sustainability
            </h3>
            <p className="text-gray-700">
              By giving vintage items new life, we contribute to a more
              sustainable future. Each piece we rescue and restore is one less
              item in a landfill and one more treasure in your home.
            </p>
          </div>
          <div className="bg-southern-beige/30 p-6 rounded-southern">
            <h3 className="text-xl font-heading font-semibold text-southern-brown mb-3">
              Community
            </h3>
            <p className="text-gray-700">
              We work closely with local artisans and sourcing partners to build
              a community around thoughtful consumption and appreciation for
              craftsmanship that stands the test of time.
            </p>
          </div>
          <div className="bg-southern-beige/30 p-6 rounded-southern">
            <h3 className="text-xl font-heading font-semibold text-southern-brown mb-3">
              Authenticity
            </h3>
            <p className="text-gray-700">
              In a world of mass production, we celebrate the authentic, the
              handmade, and the wonderfully imperfect. Every scratch and patina
              tells a story that makes each piece truly unique.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-heading font-semibold text-southern-brown mb-8 text-center">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
              <img
                src="/images/team-nonna.jpg"
                alt="Nonna - Founder"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://placehold.co/300x300/png?text=Nonna";
                }}
              />
            </div>
            <h3 className="text-xl font-heading font-semibold text-southern-brown mb-1">
              Eleanora "Nonna" Rossi
            </h3>
            <p className="text-southern-green mb-2">Founder & Curator</p>
            <p className="text-gray-700 text-sm">
              With an eye for timeless treasures and 40 years of antiquing
              experience.
            </p>
          </div>
          <div className="text-center">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
              <img
                src="/images/team-rue.jpg"
                alt="Rue - Co-Founder"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://placehold.co/300x300/png?text=Rue";
                }}
              />
            </div>
            <h3 className="text-xl font-heading font-semibold text-southern-brown mb-1">
              Ruby "Rue" Hayes
            </h3>
            <p className="text-southern-green mb-2">Co-Founder & Designer</p>
            <p className="text-gray-700 text-sm">
              Brings modern sensibility to vintage finds and leads our
              restoration projects.
            </p>
          </div>
          <div className="text-center">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
              <img
                src="/images/team-artisan.jpg"
                alt="Leo - Lead Artisan"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://placehold.co/300x300/png?text=Leo";
                }}
              />
            </div>
            <h3 className="text-xl font-heading font-semibold text-southern-brown mb-1">
              Leo Martinez
            </h3>
            <p className="text-southern-green mb-2">Lead Artisan</p>
            <p className="text-gray-700 text-sm">
              Master woodworker who breathes new life into forgotten furniture
              pieces.
            </p>
          </div>
          <div className="text-center">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
              <img
                src="/images/team-manager.jpg"
                alt="Maya - Store Manager"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://placehold.co/300x300/png?text=Maya";
                }}
              />
            </div>
            <h3 className="text-xl font-heading font-semibold text-southern-brown mb-1">
              Maya Chen
            </h3>
            <p className="text-southern-green mb-2">Store Manager</p>
            <p className="text-gray-700 text-sm">
              The organizational genius who keeps everything running smoothly
              behind the scenes.
            </p>
          </div>
        </div>
      </div>

      {/* Visit Us Section */}
      <div className="bg-southern-beige/30 p-8 rounded-southern">
        <h2 className="text-3xl font-heading font-semibold text-southern-brown mb-6 text-center">
          Visit Our Shop
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-heading font-semibold text-southern-brown mb-3">
              Store Hours
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>10:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 AM - 7:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>11:00 AM - 5:00 PM</span>
              </li>
            </ul>
            <h3 className="text-xl font-heading font-semibold text-southern-brown mt-6 mb-3">
              Contact Information
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>123 Vintage Lane, Anytown, USA 12345</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: hello@nonnaandrues.com</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-heading font-semibold text-southern-brown mb-3">
              Special Events
            </h3>
            <p className="text-gray-700 mb-4">
              Join us for regular workshops, vintage markets, and community
              gatherings. Check our events calendar for upcoming opportunities
              to connect with fellow vintage enthusiasts.
            </p>
            <div className="flex justify-start">
              <Link to="/events" className="btn btn-primary">
                View Events Calendar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
