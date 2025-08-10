import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState(null);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ success: false, message: 'Please fill out all fields.' });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setStatus({
        success: false,
        message: 'Please enter a valid email address.',
      });
      return;
    }

    // Simulate successful submission
    setStatus({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
    });

    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="mt-14 py-16 px-6 max-w-3xl mx-auto rounded-lg shadow-md bg-luxury text-luxury transition-colors duration-300">
      <h2 className="text-4xl font-extrabold text-center text-heading mb-8">
        Contact Us
      </h2>
      <p className="text-center text-subtitle mb-8">
        Have questions or need assistance? Fill out the form below, and we’ll
        get back to you promptly.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-heading font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[var(--color-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-[var(--color-bg)] text-[var(--color-text)]"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-heading font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[var(--color-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-[var(--color-bg)] text-[var(--color-text)]"
            required
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-heading font-medium mb-2"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full px-4 py-3 border border-[var(--color-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] resize-none bg-[var(--color-bg)] text-[var(--color-text)]"
            required
          />
        </div>

        {status && (
          <p
            className={`text-center font-medium ${
              status.success ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {status.message}
          </p>
        )}

        <button
          type="submit"
          className="w-full btn-luxury font-semibold py-3 rounded-md transition-colors"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactUs;
