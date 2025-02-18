import React, { useEffect, useState } from 'react';
import { 
  Code2, 
  Shield, 
  Terminal, 
  Globe, 
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Blocks,
  Brain,
  Code,
  Layout,
  Star,
  Phone,

  FileArchive,
  Folder
} from 'lucide-react';
import frImage from './assets/fr.jpg';
import frImage1 from './assets/px.jpg';
import frImage2 from './assets/me.png';


function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnzipping, setIsUnzipping] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isUnzipping) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => setIsLoading(false), 500);
            return 100;
          }
          return prev + 1;
        });
      }, 20);
      return () => clearInterval(timer);
    }
  }, [isUnzipping]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'skills', 'projects', 'services', 'education', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Assurez-vous que le tableau de dépendances est vide ou contient les dépendances nécessaires

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          {!isUnzipping ? (
            <div 
              onClick={() => setIsUnzipping(true)}
              className="cursor-pointer transform hover:scale-110 transition-transform duration-300"
            >
              <div className="relative">
                <FileArchive className="w-32 h-32 text-cyan-400 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 blur-xl opacity-20"></div>
              </div>
              <p className="mt-8 text-gray-400 text-lg">Click to unzip the portfolio</p>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="relative">
                <Folder className="w-32 h-32 text-cyan-400 animate-bounce" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 blur-xl opacity-20"></div>
              </div>
              <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="relative">
                <p className="text-cyan-400 text-lg font-semibold">{progress}%</p>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 blur-xl opacity-20"></div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400">Unzipping the portfolio...</p>
                <p className="text-sm text-gray-500">Preparing components</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const projects = [
    {
      title: "Absence Management System",
      description: "Web App with Face Recognition",
      tech: ["Python", "HTML", "CSS", "JavaScript", "MySQL", "Flask", "Bootstrap", "Yolo", "OpenCV", "Keras", "..."],
      image: frImage
    },
    {
      title: "Car Renting Management System",
      description: "Car renting management system app",
      tech: ["Python", "Tkinter", "MySQL", "PhPMyAdmin"],
      image: frImage1
    },
  ];

  const services = [
    {
      icon: <Layout className="w-12 h-12" />,
      title: "UI/UX Design",
      description: "Creating modern and intuitive user interfaces"
    },
    {
      icon: <Code className="w-12 h-12" />,
      title: "Front-end Development",
      description: "Developing responsive and high-performance web applications"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Web Security",
      description: "Auditing and securing web applications"
    },
  ];




  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 mb-20 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Portfolio
            </div>
            <div className="hidden md:flex space-x-8">
              {['about', 'skills', 'projects', 'services', 'education', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`transition-colors hover:text-cyan-400 ${
                    activeSection === item ? 'text-cyan-400' : 'text-white'
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              ))}
            </div>
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-800/50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-0.5 bg-white mb-1"></div>
              <div className="w-6 h-0.5 bg-white mb-1"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </button>
          </div>
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md py-4">
              {['about', 'skills', 'projects', 'services', 'education', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="block px-6 py-2 hover:bg-gray-800/50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black"></div>
        <div className="absolute inset-0">
          <div className="h-full w-full" style={{
            background: 'radial-gradient(circle at center, transparent 0%, black 70%)'
          }}></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mt-20 mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Mohamed Kamil Zahiri
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Front-end developper and secured, creative web experiences creator
            </p>
            <div className="flex justify-center gap-4 mb-12">
              <a
                href="#contact"
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full hover:opacity-90 transition-opacity"
              >
                Contact me
              </a>
              <a
                href="#projects"
                className="px-8 py-3 border border-cyan-500 rounded-full hover:bg-cyan-500/10 transition-colors"
              >
                My Projects
              </a>
            </div>
          </div>
          <div className="relative w-48 h-48 mx-auto mb-8 flex justify-center items-center">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"></div>
            <img
              src={frImage2}
              alt="Profile"
              className="relative z-10 w-full h-full object-cover rounded-full border-4 border-gray-800 p-1 bounce"
            />    
          </div>
          <a href="#about" className="inline-flex items-center animate-bounce">
            <ChevronDown size={32} className="text-cyan-400" />
          </a>
        </div>
      </section>
      

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-8">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            About
          </h2>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              {/* Colonne de gauche - Photo */}
              <div className="md:col-span-5 relative group">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105">
                  <img 
                    src="/votre-photo.jpg" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                {/* Effet de glow */}
                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full opacity-20 blur-3xl"></div>
              </div>

              {/* Colonne de droite - Contenu */}
              <div className="md:col-span-7 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold text-white mb-6">
                    Mohamed Kamil
                  </h3>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Développeur Front-end passionné par la création d'expériences web modernes et intuitives. Spécialisé en React.js et technologies web actuelles.
                  </p>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Je transforme des idées en solutions web élégantes et performantes, en mettant l'accent sur l'expérience utilisateur et les bonnes pratiques de développement.
                  </p>
                </div>

                {/* Stats rapides */}
                <div className="grid grid-cols-2 gap-6 py-8">
                  <div className="text-center p-4 bg-gray-800/30 rounded-xl backdrop-blur-sm">
                    <h4 className="text-3xl font-bold text-cyan-400 mb-2">2+</h4>
                    <p className="text-gray-300">Years of Experience</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800/30 rounded-xl backdrop-blur-sm">
                    <h4 className="text-3xl font-bold text-cyan-400 mb-2">15+</h4>
                    <p className="text-gray-300">Completed Projects</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-6 pt-4">
                  <a
                    href="/assets/cv.pdf" // Path to your CV file
                    download // Attribute to force download
                    className="w-full max-w-md px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                  >
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/30 p-8 rounded-xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:bg-gray-800/50 flex flex-col items-center text-center">
              <Terminal className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Front-end</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-3 justify-center">
                  <Star className="w-4 h-4 text-cyan-400" />
                  React.js
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <Star className="w-4 h-4 text-cyan-400" />
                  HTML
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <Star className="w-4 h-4 text-cyan-400" />
                  CSS
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <Star className="w-4 h-4 text-cyan-400" />
                  JavaScript
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800/30 p-8 rounded-xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:bg-gray-800/50 flex flex-col items-center text-center">
              <Brain className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Soft Skills</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2 justify-center">
                  <Star className="w-4 h-4 text-cyan-400" />
                  Project Management
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <Star className="w-4 h-4 text-cyan-400" />
                  Team Collaboration
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <Star className="w-4 h-4 text-cyan-400" />
                  Problem Solving
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-cyan-400" />
                  Communication
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-gray-800/30 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-cyan-500/20 rounded-full text-cyan-400 text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-800/30 p-8 rounded-xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:bg-gray-800/50"
              >
                <div className="text-cyan-400 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-8">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="max-w-7xl mx-auto">
            <div className="bg-gray-800/30 p-16 rounded-2xl backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start space-x-12">
                <Blocks className="w-24 h-24 text-cyan-400 flex-shrink-0" />
                <div className="space-y-8 flex-grow">
                  <div>
                    <h3 className="text-4xl font-bold text-white mb-4">ENSA El Jadida</h3>
                    <p className="text-2xl text-gray-400 mb-3">4th Year Engineering Program</p>
                    <p className="text-3xl text-cyan-400 mb-8">Cybersecurity and Confidence Trust</p>
                  </div>
                  
                  <p className="text-xl text-gray-300 leading-relaxed mb-12">
                    In-depth training in information security, secure development,
                    and modern web technologies. Specialization in data protection
                    and application security.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-2 gap-10">
                    <div className="bg-gray-800/50 p-8 rounded-xl text-center transform hover:scale-105 transition-all duration-300 min-h-[160px] w-[250px] flex flex-col justify-center">
                      <p className="text-lg text-gray-400 mb-3">Year</p>
                      <p className="text-2xl font-semibold text-cyan-400">2023-2024</p>
                    </div>
                    <div className="bg-gray-800/50 p-8 rounded-xl text-center transform hover:scale-105 transition-all duration-300 min-h-[160px] w-[250px] flex flex-col justify-center">
                      <p className="text-lg text-gray-400 mb-3">Specialization</p>
                      <p className="text-2xl font-semibold text-cyan-400">Cybersecurity</p>
                    </div>
                    <div className="bg-gray-800/50 p-8 rounded-xl text-center transform hover:scale-105 transition-all duration-300 min-h-[160px] w-[250px] flex flex-col justify-center">
                      <p className="text-lg text-gray-400 mb-3">Level</p>
                      <p className="text-2xl font-semibold text-cyan-400">Master's Equivalent</p>
                    </div>
                    <div className="bg-gray-800/50 p-8 rounded-xl text-center transform hover:scale-105 transition-all duration-300 min-h-[160px] w-[250px] flex flex-col justify-center">
                      <p className="text-lg text-gray-400 mb-3">Status</p>
                      <p className="text-2xl font-semibold text-cyan-400">In Progress</p>
                    </div>
                  </div>

                  {/* Core Competencies */}
                  <div className="mt-12 pt-8 border-t border-gray-700">
                    <h4 className="text-xl font-semibold text-white mb-6">Core Competencies</h4>
                    <div className="flex flex-wrap gap-4">
                      <span className="px-6 py-3 bg-cyan-500/20 rounded-full text-cyan-400 text-lg">Web Security</span>
                      <span className="px-6 py-3 bg-cyan-500/20 rounded-full text-cyan-400 text-lg">Cryptography</span>
                      <span className="px-6 py-3 bg-cyan-500/20 rounded-full text-cyan-400 text-lg">Secure Development</span>
                      <span className="px-6 py-3 bg-cyan-500/20 rounded-full text-cyan-400 text-lg">Risk Analysis</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Contact
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-800/30 p-8 rounded-xl backdrop-blur-sm">
                <h3 className="text-2xl font-semibold mb-6">Contact Me</h3>
                <form action="https://formsubmit.co/mk.zahiri03@gmail.com" method="POST" className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full px-4 py-2 bg-gray-900/50 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-4 py-2 bg-gray-900/50 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      className="w-full px-4 py-2 bg-gray-900/50 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none h-32"
                      placeholder="Your message"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Send Message
                  </button>
                </form>
              </div>
              <div className="bg-gray-800/30 p-8 rounded-xl backdrop-blur-sm">
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-cyan-400" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:contact@example.com" className="text-gray-300 hover:text-cyan-400">
                        mk.zahiri03@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Globe className="w-6 h-6 text-cyan-400" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-300">Casablanca, Morocco</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="w-6 h-6 text-cyan-400" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-300">+212 6 45 08 46 26</p>
                    </div>
                  </div>
                  <div className="pt-6">
                    <p className="font-medium mb-4">Social Networks</p>
                    <div className="flex space-x-4">
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-900/50 rounded-full hover:bg-gray-700/50 transition-colors"
                      >
                        <Github className="w-6 h-6" />
                      </a>
                      <a
                        href="https://linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-900/50 rounded-full hover:bg-gray-700/50 transition-colors"
                      >
                        <Linkedin className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;