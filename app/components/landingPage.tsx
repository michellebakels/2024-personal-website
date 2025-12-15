"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import {
  introText,
  navItems,
  events,
  moreEvents,
  communityItems,
  workItems,
  talks,
  contactItems,
  footerText,
} from "./data";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [stickyTitles, setStickyTitles] = useState({
    events: true,
    community: false,
    work: false,
    talks: false,
    contact: false,
  });
  const [isMoreEventsOpen, setIsMoreEventsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const communityTop =
        sectionRefs.current["community"]?.getBoundingClientRect().top;
      const workTop = sectionRefs.current["work"]?.getBoundingClientRect().top;
      const talksTop =
        sectionRefs.current["talks"]?.getBoundingClientRect().top;
      const contactTop =
        sectionRefs.current["contact"]?.getBoundingClientRect().top;

      setStickyTitles({
        events: (communityTop ?? 0) > 100,
        community: (communityTop ?? 0) <= 100 && (workTop ?? 0) > 100,
        work: (workTop ?? 0) <= 100 && (talksTop ?? 0) > 100,
        talks: (talksTop ?? 0) <= 100 && (contactTop ?? 0) > 300,
        contact: (contactTop ?? 0) <= 300,
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80;
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      <header
        className={`fixed top-0 left-0 right-0 bg-stone-50 z-10 border-b border-stone-800`}
      >
        <div className="px-8 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-light tracking-wide">MICHELLE BAKELS</h1>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
          <nav className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="hover:text-stone-600 uppercase text-sm tracking-wide"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <section className="bg-stone-50 py-8 md:py-12 mt-20 border-b border-stone-800">
        <div className="px-8 md:pl-0 md:ml-8 md:w-1/3">
          <p className="text-sm leading-relaxed">{introText}</p>
        </div>
      </section>
      <main className="py-12 px-4 md:px-8 md:flex">
        <div className="hidden md:block md:w-1/3">
          <div className="sticky top-24 space-y-6">
            {navItems.map((item) => (
              <h2
                key={item.id}
                className={`text-3xl font-light tracking-wide uppercase transition-opacity duration-300 text-stone-800 ${
                  stickyTitles[item.id as keyof typeof stickyTitles]
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              >
                {item.label}
              </h2>
            ))}
          </div>
        </div>
        <div className="md:w-2/3 px-4">
          <section
            id="events"
            ref={(el) => {
              if (el) sectionRefs.current["events"] = el;
            }}
            className="pb-12"
          >
            <h2 className="text-3xl font-light tracking-wide uppercase mb-6 md:hidden">
              Events
            </h2>
            <div className="space-y-12">
              {events.map((event, index) => (
                <div key={index}>
                  <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                    {event.title}
                  </h3>
                  <p className="mb-2 text-sm leading-relaxed">
                    {event.description}
                  </p>
                  <p className="text-xs text-stone-600 uppercase tracking-wide">
                    Date: {event.date}
                  </p>
                  <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                    Location: {event.location}
                  </p>
                  <a href={event.link} target="_blank">
                    <button className="text-sm uppercase tracking-wide border border-stone-800 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors">
                      {event.buttonText}
                    </button>
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <button
                onClick={() => {
                  setIsMoreEventsOpen(!isMoreEventsOpen);
                }}
                className="text-sm uppercase tracking-wide pr-4 py-2 block flex items-center"
              >
                Past Events{" "}
                {!isMoreEventsOpen ? (
                  <ChevronDown className="ml-2" size={16} />
                ) : (
                  <ChevronUp className="ml-2" size={16} />
                )}
              </button>

              <div
                id="more-events"
                className={isMoreEventsOpen ? "mt-6" : "hidden"}
              >
                <div className="grid md:grid-cols-3 gap-8">
                  {moreEvents.map((event, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                        {event.title}
                      </h3>
                      <p className="mb-2 text-sm leading-relaxed">
                        {event.description}
                      </p>
                      <p className="text-xs text-stone-600 uppercase tracking-wide">
                        Date: {event.date}
                      </p>
                      <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                        Location: {event.location}
                      </p>
                      <a href={event.link} target="_blank">
                        <button className="text-sm uppercase tracking-wide border border-stone-800 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors">
                          {event.buttonText}
                        </button>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-stone-800 mt-12" />
          </section>

          <section
            id="community"
            ref={(el) => {
              if (el) sectionRefs.current["community"] = el;
            }}
            className="pb-12"
          >
            <h2 className="text-3xl font-light tracking-wide uppercase mb-6 md:hidden">
              Community
            </h2>
            <div className="space-y-12">
              {communityItems.map((item, index) => (
                <div key={index}>
                  <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                    {item.title}
                  </h3>
                  <p className="mb-2 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                    Duration: {item.duration}
                  </p>
                  <a href={item.link} target="_blank">
                    <button className="text-sm uppercase tracking-wide border border-stone-800 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors">
                      {item.buttonText}
                    </button>
                  </a>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-800 mt-12" />
          </section>

          <section
            id="work"
            ref={(el) => {
              if (el) sectionRefs.current["work"] = el;
            }}
            className="pb-12"
          >
            <h2 className="text-3xl font-light tracking-wide uppercase mb-6 md:hidden">
              Work
            </h2>
            <div className="space-y-12">
              {workItems.map((item, index) => (
                <div key={index}>
                  <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                    {item.title}
                  </h3>
                  <p className="mb-2 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  {item.role && (
                    <p className="text-xs text-stone-600 uppercase tracking-wide">
                      Role: {item.role}
                    </p>
                  )}
                  {item.tools && (
                    <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                      Tools: {item.tools}
                    </p>
                  )}
                  {item.topics && (
                    <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                      Topics: {item.topics}
                    </p>
                  )}
                  <a href={item.link} target="_blank">
                    <button className="text-sm uppercase tracking-wide border border-stone-800 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors">
                      {item.buttonText}
                    </button>
                  </a>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-800 mt-12" />
          </section>

          <section
            id="talks"
            ref={(el) => {
              if (el) sectionRefs.current["talks"] = el;
            }}
            className="pb-12"
          >
            <h2 className="text-3xl font-light tracking-wide uppercase mb-6 md:hidden">
              Talks
            </h2>
            <div className="space-y-12">
              {talks.map((talk, index) => (
                <div key={index}>
                  <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                    {talk.title}
                  </h3>
                  <p className="mb-2 text-sm leading-relaxed">
                    {talk.description}
                  </p>
                  <p className="text-xs text-stone-600 uppercase tracking-wide">
                    Presented at: {talk.presentedAt}
                  </p>
                  <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                    Date: {talk.date}
                  </p>
                  <a href={talk.link} target="_blank">
                    <button className="text-sm uppercase tracking-wide border border-stone-800 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors">
                      {talk.buttonText}
                    </button>
                  </a>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-800 mt-12" />
          </section>

          <section
            id="contact"
            ref={(el) => {
              if (el) sectionRefs.current["contact"] = el;
            }}
            className="pb-12"
          >
            <h2 className="text-3xl font-light tracking-wide uppercase mb-6 md:hidden">
              Contact
            </h2>
            <div className="space-y-12">
              {contactItems.map((item, index) => (
                <div key={index}>
                  <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                    {item.title}
                  </h3>
                  <p className="mb-2 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  {item.email && (
                    <a href={item.emailUrl}>
                      <p className="text-xs text-stone-600 uppercase tracking-wide">
                        Email: {item.email}
                      </p>
                    </a>
                  )}
                  {item.linkedin && (
                    <a href={item.linkedinUrl} target="_blank">
                      <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                        LinkedIn: {item.linkedin}
                      </p>
                    </a>
                  )}
                  {item.twitter && (
                    <a href={item.twitterUrl} target="_blank">
                      <p className="text-xs text-stone-600 uppercase tracking-wide">
                        Twitter: {item.twitter}
                      </p>
                    </a>
                  )}
                  {item.github && (
                    <a href={item.githubUrl} target="_blank">
                      <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                        GitHub: {item.github}
                      </p>
                    </a>
                  )}
                  <a href={item.buttonLink} target="_blank">
                    <button className="text-sm uppercase tracking-wide border border-stone-800 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors">
                      {item.buttonText}
                    </button>
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <footer className="bg-stone-800 text-stone-200 py-6">
        <div className="px-4 text-center">
          <p className="text-xs uppercase tracking-wide">{footerText}</p>
        </div>
      </footer>
    </div>
  );
}
