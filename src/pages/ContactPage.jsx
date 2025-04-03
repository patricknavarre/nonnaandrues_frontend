import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const ContactPage = () => {
  const { config } = useSelector((state) => state.site);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setLoading(false);
    }, 1500);

    // Actual implementation would look like:
    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //
    //   if (response.ok) {
    //     toast.success("Message sent successfully! We'll get back to you soon.");
    //     setFormData({
    //       name: "",
    //       email: "",
    //       subject: "",
    //       message: "",
    //     });
    //   } else {
    //     toast.error("Failed to send message. Please try again.");
    //   }
    // } catch (error) {
    //   toast.error("An error occurred. Please try again later.");
    //   console.error("Contact form error:", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-southern-green">
          Home
        </Link>
        <ChevronRight className="mx-1" size={16} />
        <span className="font-medium text-southern-brown">Contact Us</span>
      </div>

      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-southern-brown mb-8">
        Get in Touch
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
        {/* Contact Form - 3 Columns */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-southern p-8 shadow-md">
            <h2 className="text-2xl font-heading font-semibold text-southern-brown mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-southern focus:ring-2 focus:ring-southern-green focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-southern focus:ring-2 focus:ring-southern-green focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-southern focus:ring-2 focus:ring-southern-green focus:border-transparent"
                  placeholder="What's your message about?"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-southern focus:ring-2 focus:ring-southern-green focus:border-transparent resize-none"
                  placeholder="Tell us about your inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full md:w-auto"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info - 2 Columns */}
        <div className="lg:col-span-2">
          <div className="bg-southern-beige/30 rounded-southern p-8 h-full">
            <h2 className="text-2xl font-heading font-semibold text-southern-brown mb-6">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="text-southern-green mt-1 mr-3" size={22} />
                <div>
                  <h3 className="font-medium text-southern-brown mb-1">
                    Store Address
                  </h3>
                  <p className="text-gray-700">
                    123 Vintage Lane
                    <br />
                    Anytown, USA 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="text-southern-green mt-1 mr-3" size={22} />
                <div>
                  <h3 className="font-medium text-southern-brown mb-1">
                    Phone Number
                  </h3>
                  <p className="text-gray-700">(555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="text-southern-green mt-1 mr-3" size={22} />
                <div>
                  <h3 className="font-medium text-southern-brown mb-1">
                    Email Address
                  </h3>
                  <p className="text-gray-700">hello@nonnaandrues.com</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-medium text-southern-brown mb-3">
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
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mb-16 rounded-southern overflow-hidden h-[400px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.259032416952!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1653422534025!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Store Location"
        ></iframe>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-3xl font-heading font-semibold text-southern-brown mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-southern shadow-md">
            <h3 className="text-xl font-heading font-semibold text-southern-brown mb-3">
              Do you offer delivery services?
            </h3>
            <p className="text-gray-700">
              Yes, we offer local delivery for larger items within a 30-mile
              radius of our store. For smaller items, we can ship nationwide.
              Fees vary based on size, weight, and distance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-southern shadow-md">
            <h3 className="text-xl font-heading font-semibold text-southern-brown mb-3">
              Can I return or exchange items?
            </h3>
            <p className="text-gray-700">
              We accept returns within 14 days of purchase for store credit
              only. Since our items are unique and one-of-a-kind, all sales are
              final for clearance items. Please check items carefully before
              completing your purchase.
            </p>
          </div>

          <div className="bg-white p-6 rounded-southern shadow-md">
            <h3 className="text-xl font-heading font-semibold text-southern-brown mb-3">
              Do you buy vintage items from individuals?
            </h3>
            <p className="text-gray-700">
              Yes! We're always looking to expand our collection. If you have
              unique vintage items you'd like to sell, please email us photos
              and details at buying@nonnaandrues.com for consideration.
            </p>
          </div>

          <div className="bg-white p-6 rounded-southern shadow-md">
            <h3 className="text-xl font-heading font-semibold text-southern-brown mb-3">
              Do you offer repair or restoration services?
            </h3>
            <p className="text-gray-700">
              Yes, our skilled artisans can repair and restore vintage furniture
              and select home goods. Contact us with photos of your item for a
              consultation and quote.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
