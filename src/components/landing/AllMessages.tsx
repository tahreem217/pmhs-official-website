"use client";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

/**
 * AdminHeroCarousel.tsx
 * - Accessible, dependency-free hero carousel for admin + principal messages
 * - Big image, full message (no "Read more"), CTA if provided
 * - Arrow controls, indicators, keyboard and swipe support
 * - Usage: <AdminHeroCarousel messages={messages} autoPlay={false} interval={6000} />
 */

type AdminMessage = {
  id: string;
  name: string;
  title: string;
  organization?: string;
  image?: string; // path in /public or external
  date?: string;
  message: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const sampleMessages: AdminMessage[] = [
    {
        id: "president-1",
        name: "Honourable Dr. Ahmad Abdul Hai",
        title: "President, Managing Committee",
        organization: "Patna Muslim High School",
        image: "/Dr_AhmadAbdulHai.jpeg",
        date: "March 2026",
        message:
          "It is with immense pride that I serve this institution. Our vision has always been to elevate academic standards while strictly preserving our rich cultural and moral values. We are continuously investing in modern pedagogy and community partnerships that open up new opportunities for our youth. Our institution stands as a beacon of hope, excellence, and continuous growth for the entire community.",
        ctaLabel: "President's Vision",
       },
      {
        id: "secretary-1",
        name: "Honourable Mohammed Qaseem Raza",
        title: "Secretary, Managing Committee",
        organization: "Patna Muslim High School",
        image: "/MdQaseemRaza.jpeg",
        date: "March 2026",
        message:
          "My priority as Secretary is translating our grand educational vision into everyday reality. We are dedicated to continuously upgrading our infrastructure, empowering our teachers, and maintaining an inclusive learning ecosystem. We invite parents and community members to collaborate with us in our ongoing mission to provide quality education that is both accessible and deeply impactful for every child.",
        ctaLabel: "Read More",
       },
      {
        id: "admin-1",
        name: "Honourable Izhar Yusuf",
        title: "Administrative Officer",
        organization: "Patna Muslim High School",
        image: "/izhar_yusuf.png",
        date: "March 2026",
        message:
          "A successful educational institution relies on a foundation of smooth operations and a secure environment. I am committed to providing our students and educators with the best resources, transparent processes, and a highly safe campus. We work tirelessly behind the scenes to ensure that the primary focus of this institution remains undisturbed: the holistic growth and well-being of our students.",
        ctaLabel: "Contact Office",
       },
    {
      id: "principal-1",
      name: "Honourable Mohammad Azad",
      title: "Principal",
      organization: "Patna Muslim High School",
      image: "/MdAzad.jpeg",
      date: "March 2026",
      message:
        "Welcome to a place where education transcends the boundaries of traditional classrooms. As Principal, my focus is on fostering academic excellence while deeply nurturing discipline and ethical values in every student. We aim to guide each child toward becoming a confident, responsible, and compassionate citizen. Together with our dedicated staff and parents, we are shaping the leaders of tomorrow.",
      ctaLabel: "Principal's Note",
     },
   
   
  ];
export default function AdminHeroCarousel({
  messages = sampleMessages,
  autoPlay = false,
  interval = 6000,
  className = "",
}: {
  messages?: AdminMessage[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const touchStartX = React.useRef<number | null>(null);
  const touchDeltaX = React.useRef<number>(0);
  const count = messages.length;

  // Auto-play
  React.useEffect(() => {
    if (!autoPlay || paused || count <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearInterval(t);
  }, [autoPlay, paused, interval, count]);

  // Keyboard nav
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);
  const goTo = (i: number) => setIndex(i % count);

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    const delta = touchDeltaX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) prev();
      else next();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  const current = messages[index];

  return (
    <section
      className={`w-full max-w-6xl mx-auto ${className}`}
      aria-roledescription="carousel"
      aria-label="Administrative messages carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Slide container */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {messages.map((m, i) => (
            <article
              key={m.id}
              className="min-w-full flex flex-col md:flex-row items-stretch"
              role="group"
              aria-roledescription="slide"
              aria-label={`${m.title} — ${m.name}`}
              aria-hidden={i !== index}
            >
              <div className="md:w-1/2 relative h-64 md:h-auto">
                {m.image ? (
                  <Image
                    src={m.image}
                    alt={`${m.name}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-contain  "
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-3xl font-semibold text-slate-700">
                    {m.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                )}
              </div>

              <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-slate-500">{m.date}</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#003366] mt-2">{m.title}</h3>
                  <p className="text-sm text-slate-600 mt-1 mb-4">
                    {m.name}
                    {m.organization ? ` • ${m.organization}` : ""}
                  </p>

                  {/* FULL message displayed (no truncation / no modal) */}
                  <div className="text-slate-700 text-base md:text-lg whitespace-pre-line">
                    {m.message}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  
                  <div className="ml-auto flex items-center gap-2">
                    <button
                      onClick={prev}
                      aria-label="Previous slide"
                      className="p-2 rounded-full bg-white border shadow-sm hover:bg-slate-50 focus:outline-none"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                      onClick={next}
                      aria-label="Next slide"
                      className="p-2 rounded-full bg-white border shadow-sm hover:bg-slate-50 focus:outline-none"
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Indicators */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 flex items-center gap-2">
          {messages.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`w-3 h-3 rounded-full ${i === index ? "bg-amber-600" : "bg-slate-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}