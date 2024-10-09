"use client"
import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})
  const [stickyTitles, setStickyTitles] = useState({
    events: true,
    community: false,
    work: false,
    talks: false,
    contact: false,
  })

  useEffect(() => {
    const handleScroll = () => {
      const communityTop =
        sectionRefs.current["community"]?.getBoundingClientRect().top
      const workTop = sectionRefs.current["work"]?.getBoundingClientRect().top
      const talksTop = sectionRefs.current["talks"]?.getBoundingClientRect().top
      const contactTop =
        sectionRefs.current["contact"]?.getBoundingClientRect().top

      setStickyTitles({
        events: (communityTop ?? 0) > 100,
        community: (communityTop ?? 0) <= 100 && (workTop ?? 0) > 100,
        work: (workTop ?? 0) <= 100 && (talksTop ?? 0) > 100,
        talks: (talksTop ?? 0) <= 100 && (contactTop ?? 0) > 300,
        contact: (contactTop ?? 0) <= 300,
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const yOffset = -80
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

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
      <section className="bg-stone-50 pt-8 md:py-12 mt-20 border-b border-stone-800">
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
      <main className="py-12 px-4 md:px-8 md:flex">
        <div className="hidden md:block md:w-1/3">
          <div className="sticky top-24 space-y-6">
            <h2
              className={`text-3xl font-light tracking-wide uppercase transition-opacity duration-300 text-stone-800 ${
                stickyTitles.events ? "opacity-100" : "opacity-0"
              }`}
            >
              Events
            </h2>
            <h2
              className={`text-3xl font-light tracking-wide uppercase transition-opacity duration-300 text-stone-800 ${
                stickyTitles.community ? "opacity-100" : "opacity-0"
              }`}
            >
              Community
            </h2>
            <h2
              className={`text-3xl font-light tracking-wide uppercase transition-opacity duration-300 text-stone-800 ${
                stickyTitles.work ? "opacity-100" : "opacity-0"
              }`}
            >
              Work
            </h2>
            <h2
              className={`text-3xl font-light tracking-wide uppercase transition-opacity duration-300 text-stone-800 ${
                stickyTitles.talks ? "opacity-100" : "opacity-0"
              }`}
            >
              Talks
            </h2>
            <h2
              className={`text-3xl font-light tracking-wide uppercase transition-opacity duration-300 text-stone-800 ${
                stickyTitles.contact ? "opacity-100" : "opacity-0"
              }`}
            >
              Contact
            </h2>
          </div>
        </div>
        <div className="md:w-2/3 px-4">
          <section
            id="events"
            ref={(el) => {
              if (el) sectionRefs.current["events"] = el
            }}
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
            ref={(el) => {
              if (el) sectionRefs.current["community"] = el
            }}
            className="pb-12"
          >
            <h2 className="text-3xl font-light tracking-wide uppercase mb-6 md:hidden">
              Community
            </h2>
            <div className="space-y-12">
              <div>
                <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                  1909 Board of Directors
                </h3>
                <p className="mb-2 text-sm leading-relaxed">
                  1909 is a non-profit 501(c)3 organization dedicated to the
                  holistic growth of entrepreneurs, small business owners,
                  creative freelancers, and innovators.
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide">
                  Role: Vice Chair
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                  Duration: 2022 - Present
                </p>
                <a href="https://www.weare1909.org/" target="_blank">
                  <button className="text-sm uppercase tracking-wide border border-stone-800 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors">
                    Learn More
                  </button>
                </a>
              </div>
              <div>
                <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                  Tech Hub Foundation Board of Directors
                </h3>
                <p className="mb-2 text-sm leading-relaxed">
                  The Tech Hub Foundation is a 501(c)3 charitable organization
                  committed to nurturing our tech community and promoting STEM
                  education throughout South Florida.
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide">
                  Role: Chair
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                  Duration: 2018 - Present
                </p>
                {/* <a href="https://techhubsouthflorida.org/" target="_blank">
                  <button className="text-sm uppercase tracking-wide border border-stone-800 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors">
                    Learn More
                  </button>
                </a> */}
              </div>
            </div>
            <div className="border-t border-stone-200 mt-12" />
          </section>

          <section
            id="work"
            ref={(el) => {
              if (el) sectionRefs.current["work"] = el
            }}
            className="pb-12"
          >
            <h2 className="text-3xl font-light tracking-wide uppercase mb-6 md:hidden">
              Work
            </h2>
            <div className="space-y-12">
              <div>
                <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                  Developer Health OS
                </h3>
                <p className="mb-2 text-sm leading-relaxed">
                  The Developer Health OS is a guide to supporting health in
                  tech and finding restful work through burnout recovery,
                  burnout prevention, and optimium performance.
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide">
                  Role: Co-Author, Developer
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                  Tools: Astro, Vercel
                </p>
                <a href="https://www.devhealthos.com/" target="_blank">
                  <button className="text-sm uppercase tracking-wide border border-stone-800 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors">
                    Explore the OS
                  </button>
                </a>
              </div>
              <div>
                <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                  Blog
                </h3>
                <p className="mb-2 text-sm leading-relaxed">
                  A space to share long-form thoughts, ideas, experimentations,
                  and explorations.
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                  Topics: Community, Software Development, Public Speaking
                </p>
                {/* <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                  Contributions: 50+ pull requests
                </p> */}
                <a href="https://michellebakels.hashnode.dev/" target="_blank">
                  <button className="text-sm uppercase tracking-wide border border-stone-800 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors">
                    Read on Hashnode
                  </button>
                </a>
              </div>
              <div>
                <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                  GitHub
                </h3>
                <p className="mb-2 text-sm leading-relaxed">
                  Check out the latest projects I&apos;ve been working on.
                </p>
                <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                  Tools: React, Next.js, Tailwind CSS, Astro
                </p>
                {/* <p className="text-xs text-stone-600 uppercase tracking-wide mb-4">
                  Contributions: 50+ pull requests
                </p> */}
                <a href="https://github.com/michellebakels" target="_blank">
                  <button className="text-sm uppercase tracking-wide border border-stone-800 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors">
                    View on GitHub
                  </button>
                </a>
              </div>
            </div>
            <div className="border-t border-stone-200 mt-12" />
          </section>

          <section
            id="talks"
            ref={(el) => {
              if (el) sectionRefs.current["talks"] = el
            }}
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
                  effective time management, and introduced G2I&apos;s Developer
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
                  Presented at: Next.js Conf
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
            ref={(el) => {
              if (el) sectionRefs.current["contact"] = el
            }}
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
                  If you&apos;d like to discuss a project, collaboration, or
                  speaking opportunity, feel free to reach out.
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
