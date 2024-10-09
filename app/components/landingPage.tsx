"use client"
import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})
  const [stickyTitles, setStickyTitles] = useState({
    events: true,
    community: false,
    work: false,
    talks: false,
    contact: false,
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    const handleScroll = () => {
      const communityTop =
        sectionRefs.current["community"]?.getBoundingClientRect().top
      const workTop = sectionRefs.current["work"]?.getBoundingClientRect().top
      const talksTop = sectionRefs.current["talks"]?.getBoundingClientRect().top
      const contactTop =
        sectionRefs.current["contact"]?.getBoundingClientRect().top

      setStickyTitles({
        events: (communityTop ?? 0) > 250,
        community: (communityTop ?? 0) <= 250 && (workTop ?? 0) > 250,
        work: (workTop ?? 0) <= 250 && (talksTop ?? 0) > 250,
        talks: (talksTop ?? 0) <= 250 && (contactTop ?? 0) > 250,
        contact: (contactTop ?? 0) <= 250,
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const yOffset = -80 // Adjust this value to account for the fixed header
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      <header
        className={`fixed top-0 left-0 right-0 bg-stone-50 z-10 ${
          isMenuOpen ? "border-b border-stone-800" : "border-b-0"
        }`}
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
              <li>
                <button
                  onClick={() => scrollToSection("events")}
                  className="hover:text-stone-600 uppercase text-sm tracking-wide"
                >
                  Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("community")}
                  className="hover:text-stone-600 uppercase text-sm tracking-wide"
                >
                  Community
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("work")}
                  className="hover:text-stone-600 uppercase text-sm tracking-wide"
                >
                  Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("talks")}
                  className="hover:text-stone-600 uppercase text-sm tracking-wide"
                >
                  Talks
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="hover:text-stone-600 uppercase text-sm tracking-wide"
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <section className="bg-stone-50 pt-8 md:py-12 mt-20">
        <div className="px-8 md:pl-0 md:ml-8 md:w-1/3">
          <p className="text-sm leading-relaxed">
            Michelle is a software developer, community builder, and conference
            organizer. She works at G2i as Program Director of Developer Health
            where she focuses on creating initiatives to support the mental and
            physical health of software developers. She is the co-organizer of
            React Miami, Chair of the South Florida Tech Hub Foundation, and
            Vice Chair of 1909.
          </p>
        </div>
      </section>
      <main className="py-12 px-4 md:px-8 md:flex ">
        <div className="hidden md:block md:w-1/3">
          <div className="sticky top-24 space-y-6">
            <h2
              className={`text-3xl font-light tracking-wide uppercase transition-opacity duration-300 ${
                activeSection === "events" ? "text-stone-800" : "text-stone-400"
              } ${stickyTitles.events ? "opacity-100" : "opacity-0"}`}
            >
              Events
            </h2>
            <h2
              className={`text-3xl font-light tracking-wide uppercase transition-opacity duration-300 ${
                activeSection === "community"
                  ? "text-stone-800"
                  : "text-stone-400"
              } ${stickyTitles.community ? "opacity-100" : "opacity-0"}`}
            >
              Community
            </h2>
            <h2
              className={`text-3xl font-light tracking-wide uppercase transition-opacity duration-300 ${
                activeSection === "work" ? "text-stone-800" : "text-stone-400"
              } ${stickyTitles.work ? "opacity-100" : "opacity-0"}`}
            >
              Work
            </h2>
            <h2
              className={`text-3xl font-light tracking-wide uppercase transition-opacity duration-300 ${
                activeSection === "talks" ? "text-stone-800" : "text-stone-400"
              } ${stickyTitles.talks ? "opacity-100" : "opacity-0"}`}
            >
              Talks
            </h2>
            <h2
              className={`text-3xl font-light tracking-wide uppercase transition-opacity duration-300 ${
                activeSection === "contact"
                  ? "text-stone-800"
                  : "text-stone-400"
              } ${stickyTitles.contact ? "opacity-100" : "opacity-0"}`}
            >
              Contact
            </h2>
          </div>
        </div>
        <div className="md:w-2/3 px-4">
          <section
            id="events"
            ref={(el) => (sectionRefs.current["events"] = el)}
            className="pb-12"
          >
            <h2 className="text-3xl font-light tracking-wide uppercase mb-6 md:hidden">
              Events
            </h2>
            <div className="space-y-12">
              <div>
                <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                  Upcoming: React Miami
                </h3>
                <p className="mb-2 text-sm leading-relaxed">
                  Learn and connect with 500 React developers from around the
                  world while soaking up the famous Miami sunshine! Discover the
                  latest in our ecosystem and gain skills for building fully
                  comprehensive React applications — from the frontend and
                  beyond.
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide">
                  Date: April 17-18, 2025
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                  Location: Miami, Fl
                </p>
                <a href="https://www.reactmiami.com/" target="_blank">
                  <button className="text-sm uppercase tracking-wide border border-stone-800 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors">
                    Get Tickets
                  </button>
                </a>
              </div>
              <div>
                <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                  Past: Dev Writers Retreat & Unconference
                </h3>
                <p className="mb-2 text-sm leading-relaxed">
                  ​DEV | WRITERS | RETREAT is a first-of-its-kind experiment in
                  pushing forward the state of coders-who-write and
                  writers-who-code. ​Helping developers, and people in tech
                  connect and share knowledge easily. Hassle-free blogging and
                  community experience for the creators of tomorrow.
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide">
                  Date: November 7, 2022
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                  Location: Miami, Fl
                </p>
                <a href="https://lu.ma/dwr" target="_blank">
                  <button className="text-sm uppercase tracking-wide border border-stone-800 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors">
                    View Event
                  </button>
                </a>
              </div>
            </div>
            <div className="border-t border-stone-200 mt-12" />
          </section>

          <section
            id="community"
            ref={(el) => (sectionRefs.current["community"] = el)}
            className="pb-12"
          >
            <h2 className="text-3xl font-light tracking-wide uppercase mb-6 md:hidden">
              Community
            </h2>
            <div className="space-y-12">
              <div>
                <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                  Women in Tech Mentorship Program
                </h3>
                <p className="mb-2 text-sm leading-relaxed">
                  Michelle is actively involved in mentoring aspiring women
                  developers through this program.
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide">
                  Role: Lead Mentor
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                  Duration: Ongoing
                </p>
                <button className="text-sm uppercase tracking-wide border border-stone-800 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors">
                  Join the Program
                </button>
              </div>
              <div>
                <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                  Open Source Contributions
                </h3>
                <p className="mb-2 text-sm leading-relaxed">
                  Check out Michelle's contributions to various open source
                  projects and get involved.
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide">
                  Projects: React, Next.js, Tailwind CSS
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                  Contributions: 50+ pull requests
                </p>
                <button className="text-sm uppercase tracking-wide border border-stone-800 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors">
                  View on GitHub
                </button>
              </div>
            </div>
            <div className="border-t border-stone-200 mt-12" />
          </section>

          <section
            id="work"
            ref={(el) => (sectionRefs.current["work"] = el)}
            className="pb-12"
          >
            <h2 className="text-3xl font-light tracking-wide uppercase mb-6 md:hidden">
              Work
            </h2>
            <div className="space-y-12">
              <div>
                <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                  DHOS
                </h3>
                <p className="mb-2 text-sm leading-relaxed">
                  Michelle is actively involved in mentoring aspiring women
                  developers through this program.
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide">
                  Role: Lead Mentor
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                  Duration: Ongoing
                </p>
                <button className="text-sm uppercase tracking-wide border border-stone-800 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors">
                  Join the Program
                </button>
              </div>
              <div>
                <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                  Blog/GitHub
                </h3>
                <p className="mb-2 text-sm leading-relaxed">
                  Check out Michelle's contributions to various open source
                  projects and get involved.
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide">
                  Projects: React, Next.js, Tailwind CSS
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                  Contributions: 50+ pull requests
                </p>
                <button className="text-sm uppercase tracking-wide border border-stone-800 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors">
                  View on GitHub
                </button>
              </div>
            </div>
            <div className="border-t border-stone-200 mt-12" />
          </section>

          <section
            id="talks"
            ref={(el) => (sectionRefs.current["talks"] = el)}
            className="pb-12"
          >
            <h2 className="text-3xl font-light tracking-wide uppercase mb-6 md:hidden">
              Talks
            </h2>
            <div className="space-y-12">
              <div>
                <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                  Tech Broke My Heart
                </h3>
                <p className="mb-2 text-sm leading-relaxed">
                  Drawing from my own experiences with stress and burnout in the
                  tech industry, I emphasize the importance of addressing health
                  issues among developers, advocating for rest, self-care, and
                  effective time management, and introduced G2I's Developer
                  Health Program to raise awareness and provide resources for
                  preventing burnout.
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide">
                  Presented at: Epic Web Conf
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                  Date: April 11, 2024
                </p>
                <a
                  href="https://www.epicweb.dev/talks/tech-broke-my-heart"
                  target="_blank"
                >
                  <button className="text-sm uppercase tracking-wide border border-stone-800 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors">
                    Watch Recording
                  </button>
                </a>
              </div>
              <div>
                <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                  Executing on Inspiration with The Vercel Stack
                </h3>
                <p className="mb-2 text-sm leading-relaxed">
                  Inspiration can strike at any moment and even surprise you
                  with the direction it will take you. Seizing this opportunity
                  requires the confidence, speed, and determination to execute
                  and deliver on your vision. Learn how leveraging Next.js and
                  Vercel turned the dream of hosting a global React developers
                  conference in Miami into a reality by optimizing for the most
                  important metric of all — AFK.
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide">
                  Presented at: Next.js Conf 2023
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                  Date: October 27, 2023
                </p>
                <a
                  href="https://www.youtube.com/watch?v=ADxSUtFVr64"
                  target="_blank"
                >
                  <button className="text-sm uppercase tracking-wide border border-stone-800 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors">
                    Watch Recording
                  </button>
                </a>
              </div>
            </div>
            <div className="border-t border-stone-200 mt-12" />
          </section>

          <section
            id="contact"
            ref={(el) => (sectionRefs.current["contact"] = el)}
            className="pb-12"
          >
            <h2 className="text-3xl font-light tracking-wide uppercase mb-6 md:hidden">
              Contact
            </h2>
            <div className="space-y-12">
              <div>
                <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                  Get in Touch
                </h3>
                <p className="mb-2 text-sm leading-relaxed">
                  If you'd like to discuss a project, collaboration, or speaking
                  opportunity, feel free to reach out.
                </p>
                <a href="mailto:michelle.bakels@gmail.com">
                  <p className="text-xs text-stone-600 uppercase tracking-wide">
                    Email: michelle.bakels@gmail.com
                  </p>
                </a>
                <a
                  href="https://www.linkedin.com/in/michelle-bakels-2052687a/"
                  target="_blank"
                >
                  <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                    LinkedIn: linkedin.com/in/michellebakels
                  </p>
                </a>
                <a href="mailto:michelle.bakels@gmail.com" target="_blank">
                  <button className="text-sm uppercase tracking-wide border border-stone-800 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors">
                    Send a Message
                  </button>
                </a>
              </div>
              <div>
                <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                  Follow Me
                </h3>
                <p className="mb-2 text-sm leading-relaxed">
                  Stay updated with my latest projects, thoughts, and insights.
                </p>
                <a href="https://x.com/MichelleBakels" target="_blank">
                  <p className="text-xs text-stone-600 uppercase tracking-wide">
                    Twitter: @michellebakels
                  </p>
                </a>
                <a href="https://github.com/michellebakels" target="_blank">
                  <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                    GitHub: github.com/michellebakels
                  </p>
                </a>
                <a href="https://x.com/MichelleBakels" target="_blank">
                  <button className="text-sm uppercase tracking-wide border border-stone-800 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors">
                    Follow on Twitter
                  </button>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="bg-stone-800 text-stone-200 py-6">
        <div className="px-4 text-center">
          <p className="text-xs uppercase tracking-wide">
            &copy; 2024 Michelle Bakels.
          </p>
        </div>
      </footer>
    </div>
  )
}
