//React
import React from "react";

//Redux
import { connect } from "react-redux";

//NextJS
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

//Functions
import f from "../functions";
//Constants
import c from "../constants"; //Constants used in redux

//Nextjs-Seo-Manager
import { fetchSEO } from "nextjs-seo-manager";
import SEO from "../components/SEO.jsx";
import { projects, getContributions } from "./../lib/github";

//components
const Project = dynamic(() => import("./../components/Projects/Project"));
//const Welcome = dynamic(() => import("./../components/Animations/Welcome"));

const Header = dynamic(() => import("./../components/Header/index"));
const Contact = dynamic(() => import("./../components/Contact/index"));
const Resume = dynamic(() => import("./../components/Downloads/Resume"));
const Social = dynamic(() => import("./../components/SocialIcons/index"));

const Index = (props) => {
  const router = useRouter();
  const [trackingProcessed, setTrackingProcessed] = React.useState(false);
  const [state] = React.useState({
      experience: [
        {
          title: "Simpluris – California",
          img: "/projects/simpluris.png",
          tech: "typescript redux nextjs dynamodb aws dotnet node",
          link: "https://www.simpluris.com/",
          technologyText: "Software Developer I | January 2022 - August 2025",
          description:
            "Developed user-friendly websites for class action lawsuits, creating web forms that allow class action members to fill out information stored securely and used later in the case. Used TypeScript, Redux, Next.JS, DynamoDB, AWS, .NET, and Node.js. All websites require full-stack knowledge. Achieved 99% uptime for forms handling millions of submissions within a few hours to days, designed not to clog internal systems.",
          linkText: "Visit Website"
        },
        {
          title: "Advantage Media Partners – Beaverton, OR",
          img: "/projects/advantage-media-partners.png",
          tech: "javascript css wordpress divi",
          link: "https://advantagemediapartners.com/",
          technologyText: "WordPress Developer | January 2021 - October 2021",
          description:
            "Designed websites to delight customers and collaborated cross-functionally to solve user issues or implement innovative designs that guaranteed user-friendly experiences. Used JavaScript, CSS, WordPress and Divi.",
          linkText: "Visit Website"
        },
        {
          title: "Hovrtek – Portland, OR",
          img: "/projects/hovrtek.png",
          tech: "javascript css html react react-native",
          link: "https://hovrtek.com",
          technologyText: "Web Development & React-Native Intern | June 2019 - July 2019",
          description:
            "Co-developed Android/iOS app for crowdsourcing data mining. Created program mapping software and managed authentication. Used Git, JavaScript, CSS, HTML, React, and React Native for software analysis, modification, and support.",
          linkText: "Visit Website"
        }
      ],
      volunteering: [
        {
          title: "Visitation, St. Edwards, & St. Francis Churches – OR",
          img: "/projects/verboort.org.jpeg",
          tech: "javascript css html wordpress",
          link: "",
          technologyText: "Web Master | Volunteer | 2019 - Present",
          description:
            "Utilizing eCatholic website software I manage the design/content for 3-parish websites in the Verboort, Banks, North Plains area. Along with managing the website I occasionally build custom components, example a photo directory for those 3 parishes that allowed parishioners to upload photos/contact information.",
          linkText: ""
        },
        {
          title: "Verboort Sausage & Kraut Festival Website/App – Verboort, OR",
          img: "/projects/verboort_dinner.png",
          tech: "react react-native expo firebase mongodb livechat",
          link: "https://www.verboort.org",
          technologyText: "Web Master | Volunteer | 2020 - Present",
          description:
            "Created full-stack application that transformed the 86th-90th annual Verboort Sausage Dinner for Visitation Church. Developed scalable, high-performance code on frontend; leveraged understanding of complex technical areas to increase traffic. Delighted customers and users by developing online sales page and QR scanning function that enabled volunteers to rapidly scan orders and maintain an accurate order management system. Project generated over $600K in sales within the last 5 years; recent web traffic assessment displayed 12K hits.",
          linkText: "Visit Website"
        }
      ],
      projects: [
        {
          title: "Resting Gardens Cemetery Software - Verboort, OR",
          img: "/projects/restinggardens.jpg",
          tech: "nextjs react firebase stripe aws",
          link: "https://www.restinggardens.com/cemetery/visitation_cemetery_forest-grove_or_usa/map",
          technologyText: "Creator/Developer | 2020 - Present | Next.JS, React, Firebase, Stripe, Vercel, AWS",
          description: "Created a full-stack application that has transformed the online presence for Visitation, St. Paul, and Old Scotch Church Cemeteries. The keystone of this project is the editable map that allows website visitors to easily find deceased family/friends. The map is completely interactive, and user-friendly. This software has been released and now available for other cemeteries to sign up/register."
        },
        {
          title: "CBLCO - Forest Grove, OR",
          img: "/projects/cblco.png",
          tech: "react nextjs",
          link: "https://cblco.com",
          linkText: "Visit Website",
          technologyText: "Freelancer | November 2021 - Present | React, Next.JS",
          description: "Following the same design from the previous website the owner asked me to take control and update. The previous website had been using WordPress I updated the website to use React, and use Next.JS. I updated the contact forms to include a way to specify a quantity or a specific product type so business associates can use that information to come up with total costs. I took advantage of Next.JS image optimization to drastically speed up initial load time for large images."
        },
        {
          title: "Roy Country Steak Dinner - Banks, OR",
          img: "/projects/roycountrysteakdinner.png",
          tech: "react nextjs react-native expo firebase mongodb",
          link: "https://www.roycountrysteakdinner.com/",
          technologyText: "Freelancer | November 2021 - Present | React, Next.JS, React Native, Expo, Firebase, MongoDB",
          description: "Similar to that of the Verboort Sausage & Kraut Festival this event needed a website for online ordering and an internal payment system to accept card transactions in multiple locations. Website displays event information, photo gallery, online sales page, and an administrator dashboard for admins to track sales in real-time. An Expo/React-Native application that is being run on iPads allows event staff to run credit/debit transactions using the Stripe react-native SDK. Since the first year of this event total sales have increased ~60% in the 4 years that I have been doing the website/app."
        },
        {
          title: "SEO Manager",
          img: "/projects/seomanager.jpg",
          tech: "react nextjs node mongodb firebase",
          link: "https://www.seomanager.dev",
          technologyText: "Creator/Developer | Next.JS, React, MongoDB, Firebase",
          description: "A full-stack website. Software built for SEO Management specifically for Next.JS. Allows you to setup a dynamically generated sitemap and robots.txt. Automatically update meta tags within each page and report to search engines automatically."
        }
      ],
      technologies: {
        frontend: [
          { name: "JavaScript", level: "6 years", proficiency: "Expert" },
          { name: "ES6", level: "6 years", proficiency: "Expert" },
          { name: "ReactJS", level: "6 years", proficiency: "Expert" },
          { name: "HTML", level: "6 years", proficiency: "Expert" },
          { name: "CSS", level: "6 years", proficiency: "Expert" },
          { name: "React Native", level: "5 years", proficiency: "Expert" },
          { name: "jQuery", level: "6 years", proficiency: "Expert" },
          { name: "SCSS", level: "6 years", proficiency: "Expert" },
          { name: "Bootstrap", level: "6 years", proficiency: "Expert" },
          { name: "Material UI", level: "6 years", proficiency: "Expert" },
          { name: "NextJS", level: "5 years", proficiency: "Advanced" },
          { name: "AngularJS", level: "3 years", proficiency: "Intermediate" }
        ],
        backend: [
          { name: "Python", level: "6 years", proficiency: "Expert" },
          { name: "NodeJS", level: "6 years", proficiency: "Expert" },
          { name: "Express", level: "6 years", proficiency: "Expert" },
          { name: "C#", level: "4 years", proficiency: "Advanced" },
          { name: ".NET", level: "4 years", proficiency: "Advanced" },
          { name: "C++", level: "4 years", proficiency: "Intermediate" }
        ],
        methodologies: [
          { name: "Pair Programming", level: "5 years", proficiency: "Expert" },
          { name: "Agile", level: "4 years", proficiency: "Advanced" },
          { name: "Scrum", level: "4 years", proficiency: "Advanced" },
          { name: "Kanban", level: "4 years", proficiency: "Advanced" },
          { name: "DevOps", level: "4 years", proficiency: "Advanced" },
          { name: "CI/CD", level: "4 years", proficiency: "Advanced" }
        ],
        database: [
          { name: "MongoDB", level: "5 years", proficiency: "Advanced" },
          { name: "DynamoDB", level: "4 years", proficiency: "Advanced" },
          { name: "Firebase Real-time", level: "6 years", proficiency: "Expert" },
          { name: "Firebase Firestore", level: "5 years", proficiency: "Expert" },
          { name: "NoSQL", level: "4 years", proficiency: "Advanced" }
        ],
        tools: [
          { name: "Firebase", level: "6 years", proficiency: "Expert" },
          { name: "Linux", level: "6 years", proficiency: "Advanced" },
          { name: "Stripe", level: "5 years", proficiency: "Advanced" },
          { name: "Expo", level: "5 years", proficiency: "Advanced" },
          { name: "AI Coding", level: "3 years", proficiency: "Advanced" },
          { name: "AWS", level: "4 years", proficiency: "Advanced" },
          { name: "Vercel", level: "4 years", proficiency: "Advanced" }
        ]
      }
    });

  React.useEffect(() => {
    f.reduxDispatch(props, props.gitHubDispatch);
    initializeContributionCalendar();

    // Handle job application tracking
    if (router.query.id && !trackingProcessed) {
      handleJobApplicationTracking(router.query.id);
    }
  }, [router.query.id, trackingProcessed]);

  const handleJobApplicationTracking = async (shortId) => {
    try {
      const response = await fetch('/api/job-applications/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shortId }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log('Portfolio view tracked successfully for:', data.trackingData.companyName);
        setTrackingProcessed(true);

        // Optional: You could show a subtle notification to the user
        // But we'll keep it silent to not disrupt the portfolio viewing experience
      } else {
        console.log('Tracking failed or invalid ID, continuing with normal portfolio view');
      }
    } catch (error) {
      console.error('Error tracking portfolio view:', error);
      // Continue with normal portfolio loading even if tracking fails
    }
  };

  const initializeContributionCalendar = () => {
    // Create a simple contribution calendar with hover effects
    const calendarContainer = document.getElementById('github-calendar');
    if (!calendarContainer) return;

    // Use contributions data from props (pre-fetched at build time)
    const contributionsData = props.contributions || {};
    const contributions = contributionsData.contributions || [];

    if (contributions.length > 0) {
      // Create calendar grid with real data
      createCalendarGrid(calendarContainer, contributions);
    } else {
      // Fallback to mock data if no contributions data is available
      console.log('No contributions data available, using mock data');
      const mockContributions = generateMockContributions();
      createCalendarGrid(calendarContainer, mockContributions);
    }
  }



  const generateMockContributions = () => {
    const contributions = [];
    const today = new Date();

    // Generate contribution data for the past year
    for (let i = 365; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      // Generate random contribution count (0-10)
      const count = Math.floor(Math.random() * 11);

      contributions.push({
        date: date.toISOString().split('T')[0],
        count: count,
        level: getContributionLevel(count)
      });
    }

    return contributions;
  }

  const getContributionLevel = (count) => {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 8) return 3;
    return 4;
  }

  const createCalendarGrid = (container, contributions) => {
    container.innerHTML = ''; // Clear loading text

    // Create months container
    const monthsContainer = document.createElement('div');
    monthsContainer.className = 'calendar-months';

    // Group contributions by month
    const contributionsByMonth = groupByMonth(contributions);

    // Determine the last 12 months in chronological order
    const orderedMonthKeys = Object.keys(contributionsByMonth).sort();
    const lastTwelveKeys = orderedMonthKeys.slice(-12);

    // Create each month's grid (oldest to newest)
    lastTwelveKeys.forEach(monthKey => {
      const monthData = contributionsByMonth[monthKey];
      const monthElement = createMonthElement(monthData);
      monthsContainer.appendChild(monthElement);
    });

    container.appendChild(monthsContainer);

    // Add tooltip functionality
    addTooltipFunctionality();
  }

  const groupByMonth = (contributions) => {
    const grouped = {};

    contributions.forEach(contribution => {
      const date = new Date(contribution.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!grouped[monthKey]) {
        grouped[monthKey] = {
          month: date.toLocaleString('default', { month: 'short' }),
          year: date.getFullYear(),
          days: []
        };
      }

      grouped[monthKey].days.push(contribution);
    });

    return grouped;
  }

  const createMonthElement = (monthData) => {
    const monthContainer = document.createElement('div');
    monthContainer.className = 'calendar-month';

    // Month label
    const monthLabel = document.createElement('div');
    monthLabel.className = 'calendar-month-label';
    monthLabel.textContent = monthData.month;
    monthContainer.appendChild(monthLabel);

    // Days grid
    const daysGrid = document.createElement('div');
    daysGrid.className = 'calendar-days-grid';

    monthData.days.forEach(day => {
      const dayElement = document.createElement('div');
      dayElement.className = `calendar-day level-${day.level}`;
      dayElement.setAttribute('data-date', day.date);
      dayElement.setAttribute('data-count', day.count);
      dayElement.title = `${day.date}: ${day.count} contributions`;
      daysGrid.appendChild(dayElement);
    });

    monthContainer.appendChild(daysGrid);
    return monthContainer;
  }

  const addTooltipFunctionality = () => {
    const tooltip = document.getElementById('calendar-tooltip');
    const days = document.querySelectorAll('.calendar-day');

    days.forEach(day => {
      day.addEventListener('mouseenter', (e) => {
        const date = e.target.getAttribute('data-date');
        const count = e.target.getAttribute('data-count');
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });

        // Position tooltip near mouse cursor
        const rect = e.target.getBoundingClientRect();
        const containerRect = e.target.closest('.contribution-wrapper').getBoundingClientRect();

        tooltip.textContent = `${count} contribution${count !== '1' ? 's' : ''} on ${formattedDate}`;
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';

        // Position tooltip above the cursor, centered horizontally on the box
        const tooltipX = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2);
        const tooltipY = rect.top - tooltip.offsetHeight - 8;

        // Ensure tooltip stays within container bounds
        const clampedX = Math.max(containerRect.left + 10, Math.min(tooltipX, containerRect.right - tooltip.offsetWidth - 10));
        const clampedY = Math.max(containerRect.top + 10, tooltipY);

        tooltip.style.left = `${clampedX - containerRect.left}px`;
        tooltip.style.top = `${clampedY - containerRect.top}px`;
        tooltip.style.transform = 'none'; // Remove the translateX(-50%) from CSS
      });

      day.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
      });

      day.addEventListener('mousemove', (e) => {
        if (tooltip.style.visibility === 'visible') {
          // Update position as mouse moves
          const rect = e.target.getBoundingClientRect();
          const containerRect = e.target.closest('.contribution-wrapper').getBoundingClientRect();

          const tooltipX = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2);
          const tooltipY = rect.top - tooltip.offsetHeight - 8;

          const clampedX = Math.max(containerRect.left + 10, Math.min(tooltipX, containerRect.right - tooltip.offsetWidth - 10));
          const clampedY = Math.max(containerRect.top + 10, tooltipY);

          tooltip.style.left = `${clampedX - containerRect.left}px`;
          tooltip.style.top = `${clampedY - containerRect.top}px`;
        }
      });
    });
  }

  return (
    <>

      <SEO data={props.seo} />
      <Header />

        {/* Professional Summary Section */}
        <section className="summary-section">
          <div className="summary-container">
            <div className="summary-header">
              <h1>MERN Stack Developer | Full-Stack Developer</h1>
            </div>
            <div className="summary-content">
              <p className="summary-text">
                Experienced in running full software development lifecycle (SDLC) to create mobile and web applications while supporting user-friendly production. Effective technical communicator who seamlessly translates complex terms to non-technical audiences. Improvement-focused professional who combines strong business acumen with strategic vision to reduce spend, bolster security and governance, and enhance application functionality or responsiveness.
              </p>
            </div>
            <div className="cta-button-container">
              <a href="#contact" className="cta-button">
                Let's Connect
                <span className="cta-arrow">→</span>
              </a>
              <div className="resume-download-container">
                <a href="/Resume.pdf" className="cta-button resume-download" download={"Resume"}>
                  Download Resume
                  <span className="cta-arrow">↓</span>
                </a>
                <div className="resume-preview">
                  <div className="preview-header">
                    <h4>Nate Wessels</h4>
                    <p>MERN Stack Developer | Full-Stack Developer</p>
                  </div>
                  <div className="preview-content">
                    <div className="preview-section">
                      <h5>Experience</h5>
                      <div className="preview-item">
                        <strong>Software Developer I</strong>
                        <p>Simpluris – California</p>
                        <small>January 2022 - August 2025</small>
                      </div>
                    </div>
                    <div className="preview-section">
                      <h5>Skills</h5>
                      <p>React, Node.js, MongoDB, AWS, TypeScript, JavaScript</p>
                    </div>
                    <div className="preview-section">
                      <h5>Education</h5>
                      <p>Certificate of Completion - Web & Mobile Development</p>
                      <small>Epicodus - December 2018 - June 2019</small>
                    </div>
                  </div>
                  <div className="preview-footer">
                    <small>Click to download full resume</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links within Summary Section */}
            <div className="summary-social-container">
              <Social />
            </div>
          </div>
        </section>



        {/* Technologies & Skills Section */}
        <section className="technologies-section">
          <div className="section-header">
            <h2 className="section-title">Technologies & Skills</h2>
            <p className="section-subtitle">Technologies and methodologies I work with</p>
            <div className="section-divider"></div>
          </div>

          <div className="technologies-container">
            <div className="technologies-grid">
              {/* Row 1: Frontend takes full width */}
              <div className="technology-category frontend-category">
                <h3 className="category-title">Frontend</h3>
                                  <div className="technologies">
                  {state.technologies.frontend.map((skill, index) => (
                    <span key={`frontend-${skill.name}`} className="technology">
                      <div className="tech-name">{skill.name}</div>
                      <div className="tech-details">
                        <span className="tech-level">{skill.level}</span>
                        <span className={`tech-proficiency proficiency-${skill.proficiency.toLowerCase()}`}>
                          {skill.proficiency}
                        </span>
                      </div>
                    </span>
                  ))}
                </div>
              </div>

              {/* Row 2: Backend and Methodologies side by side */}
              <div className="backend-methodologies-row">
                <div className="technology-category backend-category">
                  <h3 className="category-title">Backend</h3>
                  <div className="technologies">
                    {state.technologies.backend.map((skill, index) => (
                      <span key={`backend-${skill.name}`} className="technology">
                        <div className="tech-name">{skill.name}</div>
                        <div className="tech-details">
                          <span className="tech-level">{skill.level}</span>
                          <span className={`tech-proficiency proficiency-${skill.proficiency.toLowerCase()}`}>
                            {skill.proficiency}
                          </span>
                        </div>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="technology-category methodologies-category">
                  <h3 className="category-title">Methodologies</h3>
                  <div className="technologies">
                    {state.technologies.methodologies.map((skill, index) => (
                      <span key={`methodologies-${skill.name}`} className="technology">
                        <div className="tech-name">{skill.name}</div>
                        <div className="tech-details">
                          <span className="tech-level">{skill.level}</span>
                          <span className={`tech-proficiency proficiency-${skill.proficiency.toLowerCase()}`}>
                            {skill.proficiency}
                          </span>
                        </div>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 3: Database and Tools side by side */}
              <div className="database-tools-row">
                <div className="technology-category database-category">
                  <h3 className="category-title">Database</h3>
                  <div className="technologies">
                    {state.technologies.database.map((skill, index) => (
                      <span key={`database-${skill.name}`} className="technology">
                        <div className="tech-name">{skill.name}</div>
                        <div className="tech-details">
                          <span className="tech-level">{skill.level}</span>
                          <span className={`tech-proficiency proficiency-${skill.proficiency.toLowerCase()}`}>
                            {skill.proficiency}
                          </span>
                        </div>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="technology-category tools-category">
                  <h3 className="category-title">Tools</h3>
                  <div className="technologies">
                    {state.technologies.tools.map((skill, index) => (
                      <span key={`tools-${skill.name}`} className="technology">
                        <div className="tech-name">{skill.name}</div>
                        <div className="tech-details">
                          <span className="tech-level">{skill.level}</span>
                          <span className={`tech-proficiency proficiency-${skill.proficiency.toLowerCase()}`}>
                            {skill.proficiency}
                          </span>
                        </div>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GitHub Stats Section */}
        <section className="github-section">
          <div className="section-header">
            <h2 className="section-title">GitHub Activity</h2>
            <p className="section-subtitle">My coding activity and contributions</p>
            <div className="section-divider"></div>
          </div>

          <div className="github-container">
            <div className="github-stats-grid">
              {/* GitHub Contribution Graph */}
              <div className="github-contribution-card">
                <h3 className="github-card-title">Contribution Graph</h3>
                <div className="contribution-graph">
                  <div className="contribution-wrapper">
                    <div className="interactive-calendar" id="github-calendar">
                      <div className="calendar-loading">
                        Loading contribution calendar...
                      </div>
                    </div>
                    <div className="contribution-tooltip" id="calendar-tooltip">
                      Hover over squares to see commit details
                    </div>
                  </div>
                </div>
              </div>

              {/* GitHub Stats */}
              <div className="github-stats-card">
                <h3 className="github-card-title">GitHub Stats</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <img
                      src="https://github-readme-stats.vercel.app/api?username=ngwessels&show_icons=true&theme=dark&hide_border=true&bg_color=00000000&text_color=afafaf&title_color=64b2b1&icon_color=64b2b1"
                      alt="GitHub Stats"
                      className="stats-image"
                      style={{ width: '100%', height: 'auto', minHeight: '240px', transform: 'scale(1.1)', transformOrigin: 'center' }}
                    />
                  </div>
                  <div className="stat-item">
                    <img
                      src="https://github-readme-streak-stats.herokuapp.com/?user=ngwessels&theme=dark&hide_border=true&background=00000000&stroke=64b2b1&ring=27999d&fire=27999d&currStreakLabel=64b2b1&sideLabels=64b2b1&currStreakNum=afafaf&sideNums=afafaf&dates=afafaf"
                      alt="GitHub Streak Stats"
                      className="stats-image"
                      style={{ width: '100%', height: 'auto', minHeight: '240px', transform: 'scale(1.1)', transformOrigin: 'center' }}
                    />
                  </div>
                </div>
              </div>


            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="education-section">
          <div className="section-header">
            <h2 className="section-title">Education</h2>
            <div className="section-divider"></div>
          </div>

          <div className="education-container">
            <div className="education-card">
              <div className="education-header">
                <h3>Certificate of Completion</h3>
                <span className="education-institution">Epicodus</span>
              </div>
              <div className="education-details">
                <p className="education-program">Web & Mobile Development</p>
                <p className="education-duration">
                  <span className="education-hours">800 Hours</span>
                  <span className="education-dates">December 2018 - June 2019</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-container">
          <div className="section-header">
            <h3 className="section-title">Professional Experience</h3>
            <div className="section-divider"></div>
          </div>

          <div className="index">
            {Object.keys(state.experience).map((idx) => {
              const item = state.experience[idx];
              return (
                <Project
                  title={item.title}
                  img={item.img}
                  tech={item?.tech || ""}
                  link={item?.link || ""}
                  linkText={item?.linkText || null}
                  repo={item?.repo || ""}
                  key={idx}
                  idx={idx}
                >
                  <small>{item?.technologyText || ""}</small>
                  <p>{item?.description || ""}</p>
                </Project>
              );
            })}
          </div>
        </section>

        <section className="section-container">
          <div className="section-header">
            <h3 className="section-title">Volunteer Work</h3>
            <p className="section-subtitle">Community projects and volunteer contributions</p>
            <div className="section-divider"></div>
          </div>

          <div className="index">
            {Object.keys(state.volunteering).map((idx) => {
              const item = state.volunteering[idx];
              return (
                <Project
                  title={item.title}
                  img={item.img}
                  tech={item?.tech || ""}
                  link={item?.link || ""}
                  linkText={item?.linkText || null}
                  repo={item?.repo || ""}
                  key={idx}
                  idx={idx}
                >
                  <small>{item?.technologyText || ""}</small>
                  <p>{item?.description || ""}</p>
                </Project>
              );
            })}
          </div>
        </section>

        <section className="section-container">
          <div className="section-header">
            <h3 className="section-title">Featured Projects</h3>
            <p className="section-subtitle">Take a look at some of my recent work</p>
            <div className="section-divider"></div>
          </div>

          <div className="index">
            {Object.keys(state.projects).map((idx) => {
              const item = state.projects[idx];
              return (
                <Project
                  title={item.title}
                  img={item.img}
                  tech={item?.tech || ""}
                  link={item?.link || ""}
                  repo={item?.repo || ""}
                  key={idx}
                  idx={idx}
                >
                  <small>{item?.technologyText || ""}</small>
                  <p>{item?.description || ""}</p>
                </Project>
              );
            })}
          </div>
        </section>

        <Contact />
        <style jsx global>{`
          label {
            color: #22211f;
            opacity: 1;
          }
        `}</style>
        <style jsx>{`
          .index {
            z-index: 1;
            width: 100%;
            min-height: 10vh;
          }
          @media only screen and (max-width: 600px) {
            .top {
              display: flex;
              width: 100%;
              margin-top: 60px;
              padding-bottom: 20px;
              .mySummary {
                width: 100%;
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                h1 {
                  font-size: 72px;
                  font-family: Arial Black, Gadget, sans-serif;
                }
                .bodyText {
                  margin-top: 20px;
                  p {
                    font-family: Arial Black, Gadget, sans-serif;
                    font-weight: bolder;
                    font-size: 21px;
                  }
                }
              }
            }
            .scrollButton {
              display: flex;
              width: 100%;
              justify-content: center;
              margin-top: 100px;
            }
            .projects {
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-top: 200px;
              margin-bottom: 200px;
              min-height: 100px;
            }
          }
          @media only screen and (min-width: 600px) {
            .top {
              display: flex;
              width: 100%;
              margin-top: 120px;
              flex-direction: column;
              padding-bottom: 20px;
              .mySummary {
                width: 45%;
                margin-left: 100px;
                display: flex;
                flex-direction: column;
                h1 {
                  font-size: 72px;
                  font-family: Arial Black, Gadget, sans-serif;
                }
                .bodyText {
                  margin-top: 20px;
                  p {
                    font-family: Arial Black, Gadget, sans-serif;
                    font-size: 18px;
                  }
                }
              }
            }
            .scrollButton {
              display: flex;
              width: 100%;
              justify-content: center;
              margin-top: 200px;
            }
            .projects {
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-top: 200px;
              margin-bottom: 200px;
            }
          }

          /* Enhanced Section Styles */
          .section-container {
            padding: 80px 20px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            margin: 40px 0;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }

          .section-header {
            text-align: center;
            margin-bottom: 60px;
          }

          .section-title {
            font-size: 3.2rem;
            font-weight: 700;
            color: #2c3e50;
            margin: 0 0 15px 0;
            letter-spacing: -0.5px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .section-subtitle {
            font-size: 1.2rem;
            color: #6c757d;
            margin: 10px 0 0 0;
            font-weight: 400;
            letter-spacing: 0.5px;
          }

          .section-divider {
            width: 80px;
            height: 4px;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
            margin: 25px auto 0;
            border-radius: 2px;
          }

          .index {
            z-index: 1;
            width: 100%;
            min-height: 10vh;
            max-width: 1200px;
            margin: 0 auto;
          }

          /* Responsive adjustments for sections */
          @media only screen and (max-width: 768px) {
            .section-container {
              padding: 60px 15px;
              margin: 20px 0;
              border-radius: 10px;
            }

            .section-title {
              font-size: 2.8rem;
            }

            .section-subtitle {
              font-size: 1.1rem;
            }
          }

          @media only screen and (max-width: 480px) {
            .section-container {
              padding: 40px 10px;
            }

            .section-title {
              font-size: 2.4rem;
            }
          }

          /* Professional Summary Section Styles */
          .summary-section {
            padding: 80px 20px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            margin: 40px 0;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }

          .summary-container {
            max-width: 1200px;
            margin: 0 auto;
            text-align: center;
          }

          .summary-header {
            margin-bottom: 30px;

            h1 {
              font-size: 2.5rem;
              font-weight: 700;
              color: #2c3e50;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
          }

          .summary-content {
            margin-bottom: 40px;

            .summary-text {
              font-size: 1.2rem;
              line-height: 1.6;
              color: #555;
              max-width: 800px;
              margin: 0 auto;
              font-weight: 400;
            }
          }

          .cta-button-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            flex-wrap: wrap;
            flex-direction: row;
          }

          .summary-social-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 15px;
            padding-top: 10px;
            border-top: 1px solid rgba(100, 178, 177, 0.2);
          }

          .resume-download-container {
            position: relative;
            display: inline-block;
          }

          .resume-preview {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%) translateY(10px);
            width: 300px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            opacity: 0;
            visibility: hidden;
            transform: translateX(-50%) translateY(20px) scale(0.95);
            transition: all 0.3s ease;
            z-index: 1000;
            border: 1px solid rgba(100, 178, 177, 0.2);
            overflow: hidden;
          }

          .resume-download-container:hover .resume-preview {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(10px) scale(1);
          }

          .preview-header {
            background: linear-gradient(135deg, #64b2b1 0%, #27999d 100%);
            color: white;
            padding: 15px;
            text-align: center;

            h4 {
              margin: 0 0 5px 0;
              font-size: 1.2rem;
              font-weight: 600;
            }

            p {
              margin: 0;
              font-size: 0.9rem;
              opacity: 0.9;
            }
          }

          .preview-content {
            padding: 15px;
            max-height: 200px;
            overflow-y: auto;
          }

          .preview-section {
            margin-bottom: 12px;

            &:last-child {
              margin-bottom: 0;
            }

            h5 {
              margin: 0 0 8px 0;
              font-size: 0.9rem;
              color: #64b2b1;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }

            .preview-item {
              margin-bottom: 8px;

              strong {
                display: block;
                color: #2c3e50;
                font-size: 0.85rem;
                margin-bottom: 2px;
              }

              p {
                margin: 0;
                color: #555;
                font-size: 0.8rem;
              }

              small {
                color: #777;
                font-size: 0.75rem;
              }
            }

            p {
              margin: 0;
              color: #555;
              font-size: 0.8rem;
              line-height: 1.4;
            }

            small {
              color: #777;
              font-size: 0.75rem;
            }
          }

          .preview-footer {
            background: #f8f9fa;
            padding: 10px 15px;
            text-align: center;
            border-top: 1px solid #e9ecef;

            small {
              color: #64b2b1;
              font-size: 0.75rem;
              font-weight: 500;
            }
          }

          /* Mobile adjustments */
          @media only screen and (max-width: 768px) {
            .resume-preview {
              width: 280px;
              left: 50%;
              transform: translateX(-50%) translateY(20px) scale(0.95);
            }

            .resume-download-container:hover .resume-preview {
              transform: translateX(-50%) translateY(10px) scale(1);
            }
          }

          @media only screen and (max-width: 480px) {
            .resume-preview {
              width: 260px;
              left: 50%;
              transform: translateX(-50%) translateY(20px) scale(0.9);
            }

            .preview-content {
              max-height: 150px;
            }
          }

          .cta-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            background: linear-gradient(135deg, #64b2b1 0%, #27999d 100%);
            color: white;
            padding: 15px 30px;
            border-radius: 30px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            box-shadow: 0 4px 15px rgba(100, 178, 177, 0.3);
            text-transform: uppercase;
            letter-spacing: 1px;
            min-width: 180px;
            height: 48px;

            &:hover {
              transform: translateY(-3px);
              box-shadow: 0 8px 25px rgba(100, 178, 177, 0.4);
              background: linear-gradient(135deg, #27999d 0%, #64b2b1 100%);
            }

            &:active {
              transform: translateY(0);
            }

            .cta-arrow {
              transition: transform 0.3s ease;
              font-size: 1.2rem;
            }

            &:hover .cta-arrow {
              transform: translateX(5px);
            }

            &.resume-download {
              background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
              &:hover {
                background: linear-gradient(135deg, #45a049 0%, #4CAF50 100%);
                box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
              }
            }
          }

          /* Technologies Section Styles */
          .technologies-section {
            padding: 80px 20px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            margin: 40px 0;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }

          .technologies-container {
            max-width: 1200px;
            margin: 0 auto;
            overflow-x: hidden;
            padding: 20px; /* Add padding to allow shadows to show */

            .technologies-grid {
              display: flex;
              flex-direction: column;
              gap: 20px;
              margin-top: 30px;
              overflow-x: hidden;
            }

            .frontend-category {
              width: 100%;
            }

            .backend-methodologies-row,
            .database-tools-row {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              width: 100%;
            }

            .technology-category {
              background: rgba(255, 255, 255, 0.8);
              border-radius: 15px;
              padding: 20px;
              border: 1px solid rgba(0, 0, 0, 0.1);
              transition: all 0.3s ease;

              &:hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
                border-color: #64b2b1;
              }

              .category-title {
                color: #64b2b1;
                font-size: 1.2rem;
                font-weight: 600;
                margin-bottom: 15px;
                text-align: center;
                border-bottom: 2px solid #64b2b1;
                padding-bottom: 8px;
              }

              .technologies {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 8px;
                justify-content: center;
                overflow-x: hidden;
                padding: 10px; /* Add padding to allow individual technology shadows */

                .technology {
                  background-color: #2c3e50;
                  border-radius: 20px;
                  padding: 12px 16px;
                  transition: all 0.3s ease;
                  border: 1px solid rgba(255, 255, 255, 0.1);
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  min-width: 120px;
                  width: 120px;
                  height: 110px;
                  position: relative;

                  .tech-name {
                    color: white;
                    font-weight: 600;
                    font-size: 1rem;
                    margin-bottom: 6px;
                    text-align: center;
                  }

                  .tech-details {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 3px;

                    .tech-level {
                      color: #64b2b1;
                      font-size: 0.75rem;
                      font-weight: 500;
                    }

                    .tech-proficiency {
                      font-size: 0.65rem;
                      font-weight: 600;
                      padding: 3px 8px;
                      border-radius: 10px;
                      text-transform: uppercase;
                      letter-spacing: 0.5px;

                      &.proficiency-expert {
                        background: linear-gradient(135deg, #4CAF50, #45a049);
                        color: white;
                      }

                      &.proficiency-advanced {
                        background: linear-gradient(135deg, #2196F3, #1976D2);
                        color: white;
                      }

                      &.proficiency-intermediate {
                        background: linear-gradient(135deg, #FF9800, #F57C00);
                        color: white;
                      }
                    }
                  }

                  &:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                    border-color: #64b2b1;
                  }
                }
              }
            }
          }

          /* Education Section Styles */
          .education-section {
            padding: 40px 20px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            margin: 20px 0;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }

          .education-container {
            max-width: 600px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
          }

          .education-card {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 12px;
            padding: 20px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            width: 100%;
            text-align: center;
            transition: all 0.3s ease;

            &:hover {
              transform: translateY(-5px);
              box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
              border-color: #64b2b1;
            }

            .education-header {
              margin-bottom: 12px;

              h3 {
                color: #64b2b1;
                font-size: 1.3rem;
                font-weight: 600;
                margin-bottom: 6px;
              }

              .education-institution {
                color: #2c3e50;
                font-size: 1.1rem;
                font-weight: 500;
                display: block;
              }
            }

            .education-details {
              .education-program {
                color: #2c3e50;
                font-size: 1.2rem;
                font-weight: 500;
                margin-bottom: 10px;
              }

              .education-duration {
                display: flex;
                justify-content: center;
                gap: 20px;
                flex-wrap: wrap;

                .education-hours,
                .education-dates {
                  color: #64b2b1;
                  font-size: 0.95rem;
                  font-weight: 600;
                  background: rgba(100, 178, 177, 0.1);
                  padding: 6px 15px;
                  border-radius: 20px;
                  border: 1px solid rgba(100, 178, 177, 0.3);
                }
              }
            }
          }

          /* Responsive Design */
          @media only screen and (max-width: 1024px) {
            .backend-methodologies-row,
            .database-tools-row {
              grid-template-columns: 1fr;
              gap: 15px;
            }

            .technology-category {
              padding: 12px;
            }

            .technology {
              min-width: 110px;
              width: 110px;
              height: 105px;
              padding: 10px 12px;
            }

            .technologies {
              padding: 8px; /* Reduce padding for tablet */
            }
          }

          @media only screen and (max-width: 768px) {
            .summary-section,
            .technologies-section,
            .education-section {
              padding: 30px 15px;
              margin: 15px 0;
              border-radius: 10px;
            }

            .summary-header h1 {
              font-size: 2rem;
            }

            .summary-text {
              font-size: 1rem;
            }

            .cta-button {
              padding: 12px 24px;
              font-size: 1rem;
              min-width: 160px;
              height: 48px;
            }

            .cta-button-container {
              gap: 15px;
              flex-direction: column;
              align-items: center;
              flex-wrap: wrap;
            }

            .cta-button {
              flex: 1;
              min-width: 160px;
              max-width: 320px;
              width: 300px;
              height: 48px;
            }

            /* Force all categories to stack vertically on mobile */
            .technologies-grid {
              display: flex !important;
              flex-direction: column !important;
              gap: 15px !important;
            }

            .backend-methodologies-row,
            .database-tools-row {
              display: flex !important;
              flex-direction: column !important;
              gap: 15px !important;
              width: 100% !important;
            }

            /* Ensure all categories take full width */
            .technology-category {
              width: 100% !important;
              flex: none !important;
            }

            .technology-category {
              padding: 12px;
            }

            .technology {
              min-width: 90px;
              width: 90px;
              height: 90px;
              padding: 6px 8px;
            }

            .technologies {
              padding: 8px; /* Reduce padding for mobile */
            }

            .tech-name {
              font-size: 0.8rem !important;
            }

            .education-duration {
              flex-direction: column;
              gap: 10px;
            }
          }

          @media only screen and (max-width: 480px) {
            .summary-section,
            .technologies-section,
            .education-section {
              padding: 25px 10px;
            }

            .summary-header h1 {
              font-size: 1.8rem;
            }

            .technologies-grid {
              gap: 12px;
            }

            .technology-category {
              padding: 12px;
            }

            .category-title {
              font-size: 1rem;
              margin-bottom: 12px;
              padding-bottom: 6px;
            }

            .technology {
              min-width: 80px;
              width: 80px;
              height: 85px;
              padding: 4px 6px;
            }

            .tech-name {
              font-size: 0.7rem;
            }

            .tech-level {
              font-size: 0.6rem;
            }
          }

          /* GitHub Stats Section */
          .github-section {
            padding: 60px 0;
            margin: 40px 0;
            border-radius: 15px;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
            border: 1px solid rgba(100, 178, 177, 0.1);
          }

          .github-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .github-stats-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 40px;
            margin-top: 50px;
          }

          .github-contribution-card,
          .github-stats-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(100, 178, 177, 0.1);
            border-radius: 12px;
            padding: 25px;
            transition: all 0.3s ease;
            min-height: 300px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            overflow: visible;
          }

          .github-contribution-card:hover,
          .github-stats-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(100, 178, 177, 0.1);
            border-color: rgba(100, 178, 177, 0.3);
          }

          .github-card-title {
            color: #64b2b1;
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 20px;
            text-align: center;
            border-bottom: 2px solid rgba(100, 178, 177, 0.2);
            padding-bottom: 10px;
          }

          .contribution-graph {
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: visible;
            border-radius: 8px;
            margin: 10px 0;
          }

          .contribution-wrapper {
            position: relative;
            display: block;
            width: 100%;
            max-width: 100%;
            border-radius: 8px;
            overflow-x: hidden;
            overflow-y: visible;
            background: rgba(0, 0, 0, 0.1);
            padding: 15px;
            min-height: 180px;
          }

          .contribution-image {
            width: 100%;
            height: auto;
            min-height: 280px;
            max-width: 100%;
            border-radius: 8px;
            filter: brightness(0.9) contrast(1.1);
            object-fit: contain;
            display: block;
          }

          .contribution-tooltip {
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            color: #64b2b1;
            padding: 6px 10px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 500;
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            white-space: nowrap;
            z-index: 1000;
            border: 1px solid rgba(100, 178, 177, 0.3);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            transition: opacity 0.2s ease, visibility 0.2s ease;
          }



          /* Interactive GitHub Calendar Styles */
          .interactive-calendar {
            width: 100%;
            max-width: 100%;
            min-height: 320px;
            position: relative;
          }
          :global(.interactive-calendar) {
            width: 100%;
            max-width: 100%;
            min-height: 320px;
            position: relative;
            overflow-x: hidden;
            overflow-y: visible;
            padding-bottom: 0;
          }

          .calendar-loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #64b2b1;
            font-size: 1rem;
            text-align: center;
          }
          :global(.calendar-loading) {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #64b2b1;
            font-size: 1rem;
            text-align: center;
          }

          .calendar-months {
            /* Lay months in a responsive grid (12 cols desktop) */
            display: grid;
            grid-template-columns: repeat(12, minmax(100px, 1fr));
            gap: 10px;
            width: 100%;
          }
          :global(.calendar-months) {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: repeat(2, 1fr);
            gap: 15px;
            width: 100%;
            height: 300px;
            align-items: start;
            overflow: visible;
            padding: 0;
            box-sizing: border-box;
          }

          :global(.calendar-month) {
            display: grid;
            grid-template-rows: auto 1fr;
            align-items: start;
            width: 100%;
            height: 100%;
            /* Fit days grid to month cell width assuming max 6 weeks (columns) */
            --cell-gap: 3px;
            --cell-size: calc((100% - (6 - 1) * var(--cell-gap)) / 6);
          }

          .calendar-month-label {
            color: #64b2b1;
            font-size: 0.7rem;
            font-weight: 600;
            margin-bottom: 4px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          :global(.calendar-month-label) {
            color: #64b2b1;
            font-size: 0.6rem;
            font-weight: 600;
            margin-bottom: 2px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .calendar-days-grid {
            /* 7 rows (Sun-Sat), then grow columns across the month */
            display: grid;
            grid-auto-flow: column;
            grid-template-rows: repeat(7, var(--cell-size));
            grid-auto-columns: var(--cell-size);
            gap: var(--cell-gap);
            justify-content: start;
            width: 100%;
          }
          :global(.calendar-days-grid) {
            display: grid;
            grid-auto-flow: column;
            grid-template-rows: repeat(7, 16px);
            grid-auto-columns: 16px;
            gap: 3px;
            justify-content: start;
            width: 100%;
          }

          .calendar-day {
            width: 16px;
            height: 16px;
            border-radius: 2px;
            cursor: pointer;
            transition: all 0.2s ease;
            border: 1px solid rgba(0, 0, 0, 0.1);
            display: inline-block;
            margin: 1px;
          }
          :global(.calendar-day) {
            width: 16px;
            height: 16px;
            border-radius: 2px;
            cursor: pointer;
            transition: all 0.2s ease;
            border: 1px solid rgba(0, 0, 0, 0.1);
            display: inline-block;
            margin: 0;
            box-sizing: border-box;
          }

          .calendar-day:hover {
            transform: scale(1.3);
            border: 1px solid #64b2b1;
            box-shadow: 0 0 8px rgba(100, 178, 177, 0.4);
            z-index: 10;
          }
          :global(.calendar-day:hover) {
            transform: scale(1.3);
            border: 1px solid #64b2b1;
            box-shadow: 0 0 8px rgba(100, 178, 177, 0.4);
            z-index: 10;
          }

          /* Contribution Level Colors */
          .level-0 {
            background-color: #161b22;
            border: 1px solid #30363d;
          }
          :global(.level-0) {
            background-color: #161b22;
            border: 1px solid #30363d;
          }

          .level-1 {
            background-color: #0e4429;
            border: 1px solid #0e4429;
          }
          :global(.level-1) {
            background-color: #0e4429;
            border: 1px solid #0e4429;
          }

          .level-2 {
            background-color: #006d32;
            border: 1px solid #006d32;
          }
          :global(.level-2) {
            background-color: #006d32;
            border: 1px solid #006d32;
          }

          .level-3 {
            background-color: #26a641;
            border: 1px solid #26a641;
          }
          :global(.level-3) {
            background-color: #26a641;
            border: 1px solid #26a641;
          }

          .level-4 {
            background-color: #39d353;
            border: 1px solid #39d353;
          }
          :global(.level-4) {
            background-color: #39d353;
            border: 1px solid #39d353;
          }

          /* Tablet */
          @media (max-width: 1024px) {
            :global(.calendar-months) {
              grid-template-columns: repeat(6, 1fr);
              grid-template-rows: repeat(2, 1fr);
              gap: 10px;
              height: 240px;
            }
            :global(.calendar-days-grid) {
              grid-template-rows: repeat(7, 12px);
              grid-auto-columns: 12px;
              gap: 2px;
            }
            :global(.calendar-day) {
              width: 12px;
              height: 12px;
            }
            :global(.calendar-month-label) {
              font-size: 0.6rem;
              margin-bottom: 3px;
            }
          }

          /* Mobile */
          @media (max-width: 768px) {
            :global(.calendar-months) {
              grid-template-columns: repeat(2, 1fr);
              grid-template-rows: repeat(6, auto);
              gap: 12px;
              height: auto;
            }
            :global(.calendar-days-grid) {
              grid-template-rows: repeat(7, 20px);
              grid-auto-columns: 20px;
              gap: 2px;
            }
            :global(.calendar-day) {
              width: 20px !important;
              height: 20px !important;
              min-width: 20px !important;
              min-height: 20px !important;
            }
            :global(.calendar-month-label) {
              font-size: 0.9rem;
              margin-bottom: 4px;
              font-weight: 600;
            }
          }

          /* Small Mobile */
          @media (max-width: 480px) {
            :global(.calendar-months) {
              grid-template-columns: repeat(2, 1fr);
              grid-template-rows: repeat(6, auto);
              gap: 10px;
              height: auto;
            }
            :global(.calendar-days-grid) {
              grid-template-rows: repeat(7, 18px);
              grid-auto-columns: 18px;
              gap: 1.5px;
            }
            :global(.calendar-day) {
              width: 18px !important;
              height: 18px !important;
              min-width: 18px !important;
              min-height: 18px !important;
            }
            :global(.calendar-month-label) {
              font-size: 0.8rem;
              margin-bottom: 3px;
              font-weight: 600;
            }
          }

          .stats-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .stat-item {
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: visible;
            margin: 10px 0;
          }

          .stats-image {
            width: 100%;
            height: auto;
            min-height: 180px;
            max-width: 100%;
            border-radius: 8px;
            object-fit: contain;
          }



          /* Tablet and Desktop */
          @media only screen and (min-width: 768px) {
            .github-stats-grid {
              grid-template-columns: 1fr;
              gap: 50px;
            }

            .github-contribution-card {
              grid-column: 1 / -1; /* Full width for contribution graph */
            }

            .stats-grid {
              grid-template-columns: 1fr 1fr;
              gap: 30px;
            }
          }

          @media only screen and (min-width: 1024px) {
            .github-stats-grid {
              grid-template-columns: 1fr;
              gap: 60px;
            }

            .github-contribution-card {
              grid-column: 1 / -1;
            }
          }

          /* Mobile Responsiveness */
          @media only screen and (max-width: 768px) {
            .github-section {
              padding: 50px 0;
              margin: 40px 0;
            }

            .github-container {
              padding: 0 10px;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .github-contribution-card,
            .github-stats-card {
              padding: 40px;
              min-height: 450px;
            }

            .github-card-title {
              font-size: 1.1rem;
              margin-bottom: 20px;
            }

            .contribution-image,
            .stats-image {
              width: 100%;
              max-width: 100%;
            }



            .contribution-image {
              transform: scale(0.9) !important;
              min-height: 200px !important;
            }

            .contribution-wrapper {
              padding: 10px !important;
              max-width: 100% !important;
              overflow-x: hidden !important;
              overflow-y: visible !important;
            }

            .interactive-calendar {
              max-width: 100% !important;
              overflow-x: hidden !important;
              overflow-y: visible !important;
            }

            :global(.calendar-months) {
              gap: 4px !important;
            }

            .contribution-tooltip {
              font-size: 0.7rem !important;
              padding: 6px 10px !important;
            }

            :global(.calendar-day) {
              width: 8px !important;
              height: 8px !important;
            }

            :global(.calendar-month) {
              min-width: 35px !important;
            }

            :global(.calendar-month-label) {
              font-size: 0.6rem !important;
            }

            .stats-image {
              transform: scale(1.0) !important;
              min-height: 180px !important;
            }


          }

          @media only screen and (max-width: 480px) {
            .github-section {
              padding: 40px 0;
              margin: 30px 0;
            }

            .github-container {
              padding: 0 8px;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .github-contribution-card,
            .github-stats-card {
              padding: 35px;
              min-height: 400px;
            }

            .github-card-title {
              font-size: 1rem;
              margin-bottom: 15px;
            }

            .contribution-image {
              transform: scale(0.8) !important;
              min-height: 160px !important;
            }

            .contribution-wrapper {
              padding: 8px !important;
              max-width: 100% !important;
              overflow-x: hidden !important;
              overflow-y: visible !important;
            }

            .interactive-calendar {
              max-width: 100% !important;
              overflow-x: hidden !important;
              overflow-y: visible !important;
            }

            :global(.calendar-months) {
              gap: 2px !important;
            }

            .contribution-tooltip {
              display: none !important; /* Hide tooltip on very small screens */
            }

            :global(.calendar-day) {
              width: 6px !important;
              height: 6px !important;
            }

            :global(.calendar-month) {
              min-width: 30px !important;
            }

            :global(.calendar-month-label) {
              font-size: 0.5rem !important;
            }

            .stats-image {
              transform: scale(0.95) !important;
              min-height: 140px !important;
            }

          }
        `}</style>
      </>
    );
};

const mapStateToProps = (state) => ({
  mq: state.mq,
  url: state.url
});

const IndexWithRedux = connect(mapStateToProps)(Index);

export default IndexWithRedux;

export async function getStaticProps() {
  const [gitHubDispatch, seo, contributionsData] = await Promise.all([
    projects(),
    fetchSEO("/"),
    getContributions()
  ]);
  return {
    props: {
      seo: seo || {},
      gitHubDispatch: gitHubDispatch || [],
      contributions: contributionsData || { contributions: [], totalContributions: 0 }
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 minutes
    revalidate: 60 * 5 // In seconds
  };
}