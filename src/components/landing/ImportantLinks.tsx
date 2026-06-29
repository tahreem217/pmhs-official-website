"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faArrowRight } from "@fortawesome/free-solid-svg-icons";

type NoticeLink = {
  title: string;
  desc?: string;
  url: string;
};

const defaultLinks: NoticeLink[] = [
  { title: "BSEB Official Website", desc: "Portal for news, notifications, and updates.", url: "https://biharboardonline.bihar.gov.in/" },
  { title: "Circulars & Notices", desc: "Official board circulars for students and schools.", url: "https://biharboardonline.com/" },
  { title: "Date Sheet / Time-Table", desc: "Download exam schedule for 10th & 12th.", url: "https://biharboardonline.bihar.gov.in/" },
  { title: "Admit Card", desc: "Download Matric & Intermediate admit cards.", url: "https://biharboardonline.bihar.gov.in/" },
  { title: "Results", desc: "Check 10th & 12th results online.", url: "https://result.biharboardonline.org/" },
  { title: "Class 10 Syllabus", desc: "Download official syllabus for Class 10.", url: "https://biharboardonline.com/files/CLASS_10_SYLLABUS%20.pdf" },
  { title: "Class 12 Syllabus", desc: "View syllabus for Class 12 exams.", url: "https://biharboardonline.bihar.gov.in/" },
];

type Props = {
  links?: NoticeLink[];
  className?: string;
  title?: string;
};

export default function Notices({ links = defaultLinks, className = "", title = "Important Links" }: Props) {
  return (
    <section className={`w-full max-w-7xl mx-auto px-4 ${className}`} aria-labelledby="notices-heading">
      <div className="bg-[#FCFCF9] rounded-2xl shadow-xl p-6 flex flex-col h-[500px] md:h-[600px]">
        <header className="mb-4 flex items-center gap-3">
          <h2 id="notices-heading" className="font-bold text-lg flex items-center gap-2">
            <FontAwesomeIcon icon={faLink} className="text-amber-600" />
            <span>{title}</span>
          </h2>
        </header>

        <div className="flex-1 overflow-auto pr-4">
          <ul role="list" className="space-y-4">
            {links.map((link) => (
              <li key={link.url} className="group">
                <article
                  className="p-5 rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all duration-300"
                  aria-labelledby={`notice-${encodeURIComponent(link.title)}`}
                >
                  <h3 id={`notice-${encodeURIComponent(link.title)}`} className="font-semibold text-[#003366] text-lg mb-1">
                    {link.title}
                  </h3>

                  {link.desc && <p className="text-gray-600 text-sm mb-3">{link.desc}</p>}

                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${link.title} in a new tab`}
                    className="inline-flex items-center text-sm font-semibold text-amber-600 hover:text-[#003366] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded transition-colors"
                  >
                    <span className="mr-2">Visit Link</span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
                      aria-hidden
                    />
                  </a>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}