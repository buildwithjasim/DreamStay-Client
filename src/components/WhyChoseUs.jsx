import React from 'react';

export default function WhyChooseUs() {
  const features = [
    {
      title: 'Luxury Comfort',
      description:
        'Experience a premium stay with elegant rooms and top-tier amenities designed to make you feel at home.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-4 h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          style={{ color: 'var(--color-accent)' }}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h18M3 14h18M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z"
          />
        </svg>
      ),
    },
    {
      title: 'Verified Guest Reviews',
      description:
        'All reviews are from genuine guests who experienced our hospitality first-hand, ensuring transparency and trust.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-4 h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          style={{ color: 'var(--color-accent)' }}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 17l-5-5m0 0l5-5m-5 5h12"
          />
        </svg>
      ),
    },
    {
      title: 'Secure & Easy Booking',
      description:
        'Fast, reliable, and secure online booking process using modern technology for your peace of mind.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-4 h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          style={{ color: 'var(--color-accent)' }}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 11c0-3.314-2.686-6-6-6m12 6a6 6 0 00-6-6m6 6v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="py-20 bg-luxury text-luxury text-center"
      aria-labelledby="whychooseus-heading"
    >
      <h2
        id="whychooseus-heading"
        className="text-4xl font-extrabold mb-12 tracking-wide"
        style={{ color: 'var(--color-accent)' }}
      >
        Why Choose DreamStay?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map(({ title, description, icon }) => (
          <article
            key={title}
            className="bg-[var(--color-bg)] rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col items-center cursor-default focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)]"
            tabIndex={0}
            aria-label={title}
          >
            {icon}
            <h3
              className="text-2xl font-semibold mb-3"
              style={{ color: 'var(--color-highlight)' }}
            >
              {title}
            </h3>
            <p
              className="leading-relaxed"
              style={{ color: 'var(--color-secondary)' }}
            >
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
