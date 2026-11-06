import { useEffect, useState } from 'react';
import './App.css';
import profileImage from './assets/profile.png';
import API_BASE_URL from './config';

function App() {
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState('');

  const skillCategories = [
    {
      title: 'Languages',
      skills: ['Python', 'Java', 'JavaScript', 'SQL'],
    },
    {
      title: 'Frontend',
      skills: ['HTML', 'CSS', 'React', 'Vite'],
    },
    {
      title: 'Backend & Database',
      skills: ['Flask', 'SQLite', 'REST APIs'],
    },
    {
      title: 'Tools',
      skills: ['Git', 'GitHub', 'VS Code'],
    },
  ];

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load projects');
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data);
        setProjectsLoading(false);
      })
      .catch(() => {
        setProjectsError(
          'Projects could not be loaded. Please make sure the backend is running.'
        );
        setProjectsLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <nav className="navbar">
        <a href="#home" className="logo">
          Ravichandra<span> D S</span>
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </div>

        <a
          href="/documents/Ravichandra_DS_Resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="resume-btn"
        >
          Resume ↗
        </a>
      </nav>

      <main>
        <section id="home" className="hero">
          <div className="hero-glow glow-one"></div>
          <div className="hero-glow glow-two"></div>

          <div className="hero-content">
            <p className="eyebrow">👋 HELLO, I'M</p>

            <h1>
              Ravichandra
              <span>D S.</span>
            </h1>

            <h2>Python Developer & Aspiring Full Stack Developer</h2>

            <p className="hero-description">
              An Information Science and Engineering student passionate about
              Python, web development, AI, and building technology that solves
              real-world problems.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="primary-btn">
                Explore My Work <span>→</span>
              </a>

              <a
                href="/documents/Ravichandra_DS_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="secondary-btn"
              >
                View Resume ↗
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>

            <div className="photo-card">
              <img
                src={profileImage}
                alt="Ravichandra D S"
                className="profile-photo"
              />
            </div>

            <div className="floating-card card-python">
              <span>🐍</span> Python Developer
            </div>

            <div className="floating-card card-ai">
              <span>✨</span> AI Explorer
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-label">01 / ABOUT ME</div>

          <h2>
            Curious mind. <span>Builder at heart.</span>
          </h2>

          <div className="about-grid">
            <p>
              I am an Information Science and Engineering student who is
              continuously improving my programming and software development
              skills. I enjoy turning ideas into practical projects and
              learning new technologies through hands-on experience.
            </p>

            <div className="stats">
              <div className="stat-card">
                <strong>5+</strong>
                <span>Projects Built</span>
              </div>

              <div className="stat-card">
                <strong>2028</strong>
                <span>Expected Graduation</span>
              </div>

              <div className="stat-card">
                <strong>∞</strong>
                <span>Curiosity to Learn</span>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section skills-section">
          <div className="section-label">02 / SKILLS</div>

          <h2>
            My growing <span>toolbox.</span>
          </h2>

          <div className="skill-categories">
            {skillCategories.map((category) => (
              <div className="skill-category" key={category.title}>
                <h3>{category.title}</h3>

                <div className="skill-tags">
                  {category.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-label">03 / PROJECTS</div>

          <h2>
            Things I've <span>built.</span>
          </h2>

          {projectsLoading && (
            <p className="projects-message">Loading projects...</p>
          )}

          {projectsError && (
            <p className="projects-error">{projectsError}</p>
          )}

          {!projectsLoading && !projectsError && (
            <div className="projects-grid">
              {projects.map((project, index) => (
                <article className="project-card" key={project.id}>
                  <div className="project-top">
                    <span className="project-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="project-icon">{project.icon}</span>
                  </div>

                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <span className="project-tag">{project.tag}</span>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link"
                  >
                    View on GitHub ↗
                  </a>
                </article>
              ))}
            </div>
          )}
        </section>

        <section id="education" className="section education-section">
          <div className="section-label">04 / EDUCATION</div>

          <h2>
            Learning for the <span>future.</span>
          </h2>

          <div className="education-card">
            <div className="education-year">2024 — 2028</div>

            <div>
              <h3>B.E. in Information Science & Engineering</h3>
              <p>Shridevi Institute of Engineering & Technology</p>
              <span>Expected Graduation: 2028</span>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-glow"></div>

          <div className="section-label">05 / CONTACT</div>

          <h2>
            Let's build something <span>great.</span>
          </h2>

          <p>
            I'm always excited to learn, collaborate, and work on interesting
            technology projects.
          </p>

          <div className="contact-links">
            <a
              href="mailto:ravichandradsravi@gmail.com"
              className="primary-btn"
            >
              Say Hello ↗
            </a>

            <a
              href="https://github.com/Ravichandra-D-S"
              target="_blank"
              rel="noreferrer"
              className="secondary-btn"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/ravichandra-d-s-a2923732a/"
              target="_blank"
              rel="noreferrer"
              className="secondary-btn"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </main>

      <footer>
        <p>© 2026 Ravichandra D S. Built with React.</p>
        <p>Build. Learn. Grow. 🚀</p>
      </footer>
    </div>
  );
}

export default App;