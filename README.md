# Nikolas Neofytou - Personal Portfolio Website ⚡

A futuristic, dark-themed portfolio website for an ECE student at NTUA specializing in electronics and control systems. Features a cyberpunk-inspired electrical engineering aesthetic with circuit patterns, neon glows, and tech-focused design elements.

🌐 **Live Site**: [https://nikolasneofytou.github.io/proper_personal_website-](https://nikolasneofytou.github.io/proper_personal_website-)

## 🎨 Design Philosophy

The website embodies the spirit of electrical engineering through:
- **Dark-only theme** - Optimized for the engineering workflow
- **Circuit board patterns** - Repeating grid backgrounds mimicking PCB traces
- **Neon cyan/blue accents** - Tech-inspired glowing borders and effects
- **Futuristic typography** - Orbitron (headings), Rajdhani (body), Share Tech Mono (code)
- **Animated elements** - Scanning lines, pulsing glows, and smooth transitions

## ✨ Key Features

### Sections
1. **Hero** - Dynamic gradient background with animated intro
2. **About** - Personal philosophy covering ECE passion, classical studies, athletics, and photography
3. **Timeline** - Academic journey with internship experiences at SignalGeneriX and PHOEBE
4. **Projects** - GitHub repositories with language-specific gradient backgrounds
5. **Writing** - Latest Substack posts with featured images via RSS feed
6. **Skills** - Electronics, Control Systems, Software Tools, and Adobe Creative Cloud
7. **Lab & Equipment** - Personal hardware setup (dev boards, test equipment, components)
8. **Contact** - Email, location, and phone displayed in glowing tech cards

### Hidden Sections (Commented Out)
- **Photography Gallery** - Lightbox-enabled photo showcase
- **Heroes & Mentors** - Ancient Greek heroes and modern inspirations with golden aesthetic

### Interactive Features
- Dynamic GitHub repository loading with gradient cards
- Substack RSS feed integration with featured images
- Smooth scroll navigation
- Mobile-responsive hamburger menu
- Animated section titles with neon underlines
- Hover effects with elevation and glow

## 🛠️ Technologies

- **HTML5** - Semantic structure
- **CSS3** - Custom properties, backdrop filters, gradients, keyframe animations
- **JavaScript (ES6+)** - GitHub API, RSS parsing, DOM manipulation
- **Font Awesome 6.4.0** - Icons
- **Google Fonts** - Orbitron, Rajdhani, Share Tech Mono

## 📂 Project Structure

```
proper_personal_website-/
├── index.html              # Main structure with all sections
├── css/
│   └── styles.css         # Dark theme styles with tech effects (2087 lines)
├── js/
│   └── script.js          # GitHub API, RSS feed, navigation (791 lines)
├── assets/
│   ├── PROFILE.JPEG       # Profile picture
│   ├── cv.pdf             # Greek CV download
```

## 🚀 Quick Start

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NikolasNeofytou/proper_personal_website-.git
   cd proper_personal_website-
   ```

2. **Run development server:**
   ```powershell
   # Using the included PowerShell script (Windows)
   .\scripts\dev-server.ps1
   
   # Or manually with Python
   python -m http.server 8000
   ```

3. **View the site:**
   - Open `http://localhost:8000` in your browser

### Deployment

The site is deployed via **GitHub Pages**:
- Live URL: https://nikolasneofytou.github.io/proper_personal_website-
- Auto-deploys on push to `main` branch
- Takes 1-3 minutes to update

## 🎯 Personal Info Displayed

- **Name**: Nikolas Neofytou
- **Role**: ECE Student at NTUA (Electronics & Control Systems)
- **Location**: Athens, Greece
- **Email**: nikiforialicht@gmail.com
- **Phone**: +357 96 666 897
- **GitHub**: [NikolasNeofytou](https://github.com/NikolasNeofytou)
- **Substack**: [@nikolasneofytou](https://substack.com/@nikolasneofytou)
- **LinkedIn**: [nikolas-neofytou](https://linkedin.com/in/nikolas-neofytou)

## 📝 Content Highlights

### About Me
Focuses on:
- Passion for electronics and control systems ("will to power")
- Interest in Roman politics and Greek philosophy (Plato, Aristotle, Schopenhauer, Nietzsche)
- Athletic pursuits (football → tennis)
- Photography with macro lens for electronics

### Timeline
- **NTUA** - MEng Electrical & Computer Engineering (Oct 2022 - Present)
- **SignalGeneriX** - Electrical Engineering Internship (Jul 2025 - Sep 2025)
- **PHOEBE** - Software Engineering Internship (Jun 2024 - Nov 2024)
- **Cyprus National Guard** - Mandatory Service (Jun 2021 - Dec 2021)
- **Pascal English School** - High School (Sep 2018 - Jun 2021)

### Technical Skills
- **Embedded & Hardware**: STM32, AVR, Arduino, Jetson Orin Nano, I²C, SPI, UART, PCB Design (Altium)
- **Control & Robotics**: PID Control, State-Space, LQR, Kinematics, Dynamics, Cobot Programming
- **Software & Tools**: C, C++, Python, MATLAB/Simulink, Git, Linux, Docker, Django, Flask
- **Adobe Creative Cloud**: Photoshop, Premiere Pro, After Effects, Illustrator, Adobe XD, InDesign, Lightroom

### Lab Equipment
- Development boards (STM32 Nucleo, Arduino, ESP32, Raspberry Pi 4, NVIDIA Jetson Orin Nano)
- Test equipment (oscilloscope, function generator, logic analyzer, multimeter, power supplies)
- Sensors (IMUs, temperature, ultrasonic, cameras)
- Electronic components and soldering equipment

## 🔧 Customization Guide

To adapt this website for your own use:

1. Update personal information in `index.html` (name, bio, timeline, skills, lab equipment)
2. Replace `assets/PROFILE.JPEG` with your profile picture
3. Update `assets/cv.pdf` with your CV
4. Modify GitHub username in `js/script.js` (line ~382)
5. Update Substack RSS feed URL in `js/script.js` (line ~631)
6. Change color scheme in `css/styles.css` (`:root` CSS variables)
7. Update social media links in footer section
8. Uncomment Photography or Heroes sections if desired

## 🎨 Color Customization

Primary tech colors defined in `:root`:
```css
--primary-color: #4f46e5;      /* Indigo */
--secondary-color: #1e3a8a;    /* Deep Blue */
--accent-color: #f43f5e;       /* Rose */
```

Change these to match your personal brand!

## 🌐 Features to Enable

**Photography Section** - Uncomment in `index.html` around line 400 to display your photo gallery with lightbox

**Heroes & Mentors Section** - Uncomment around line 838 to showcase your inspirations with golden Greek aesthetic

## 📊 Performance

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **Load Time**: < 2s on 3G
- **Mobile Optimized**: Fully responsive with touch interactions
- **Dark Theme**: Reduced eye strain, better for technical work

## 🔧 Browser Support

- Chrome/Edge (latest) ✅
- Firefox (latest) ✅
- Safari (latest) ✅
- Mobile browsers ✅

## 📝 License

Open source - feel free to fork and customize for your own portfolio!

## 🙏 Credits

**Built by**: Nikolas Neofytou  
**Design**: Custom futuristic electrical engineering theme  
**Icons**: Font Awesome 6.4.0  
**Fonts**: Google Fonts (Orbitron, Rajdhani, Share Tech Mono)

---

Made with ⚡ by an ECE student passionate about electronics and control systems

---

Made with ⚡ by an ECE student passionate about electronics and control systems
