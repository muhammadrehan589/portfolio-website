
# Personal Portfolio Website

A modern, interactive, and fully responsive personal portfolio website built with **HTML**, **CSS**, and **Vanilla JavaScript**. This project serves as a professional showcase for **Muhammad Rehan**, a Software Engineer specializing in web and mobile applications, game programming, and UI/UX design.

## 🚀 Interactive Features

* **Typewriter Animation**: Dynamically types and deletes the name "Muhammad Rehan" on the home screen for a high-tech feel.
* **3D Rotating Cube**: A custom CSS and JS-driven 3D cube that displays core values like "Code", "Build", "Create", and "Design".
* **Particles.js Background**: An interactive, fast-moving cyan particle network that reacts to mouse hovers and clicks.
* **Dynamic GitHub Project Hydration**: Automatically fetches and renders repository data (stars, forks, description, and languages) directly from the GitHub API to keep the projects section updated.
* **Smooth Navigation**: Features a sticky navigation bar with active-link highlighting and smooth-scroll transitions between sections.

## 🛠️ Tech Stack

* **Frontend**: HTML5, CSS3, JavaScript (ES6+)
* **Libraries**: Particles.js for background effects
* **Icons**: TextMesh Pro documentation and custom unicode icons for contact links
* **Theming**: Dark mode aesthetic featuring high-contrast cyan accents (`#00bcd4`) and neon glows.

## 📂 Project Structure

* **`index.html`**: The main entry point containing the site structure and content sections.
* **`styles.css`**: Detailed styling including 3D animations, responsive media queries for mobile and tablet, and custom scrollbars.
* **`script.js`**: Logic for the typewriter effect, 3D cube injection, particles initialization, and GitHub API integration.
* **`assets/`**: Contains essential professional assets including the profile image and downloadable resume.

## ⚙️ Setup & Customization

### Local Setup

1. **Clone the Repository**:
```bash
git clone https://github.com/muhammadrehan589/portfolio-website.git

```


2. **Open the Site**: Simply open `index.html` in any modern web browser.

### Adding Your Own Projects

The projects section is powered by the `hydrateGitHubProjects()` function. To add a new project:

1. Open `index.html`.
2. Add a new anchor tag inside the `projects-grid` div with your GitHub repository link:
```html
<a class="project-link" href="https://github.com/your-username/your-repo">https://github.com/your-username/your-repo</a>

```


3. The script will automatically convert this link into a detailed card featuring your repo's description and stats.

## 📧 Contact Information

* **Location**: Islamabad, Pakistan
* **Email**: muhammadrehann589@gmail.com
* **Phone**: +92-333-1277700
* **Professional Profiles**: [LinkedIn](https://www.linkedin.com/in/muhammad-rehan-544769278/) | [GitHub](https://github.com/muhammadrehan589)

## 📄 License

This project is open-source and intended for personal use and professional display. Modification for personal portfolio use is encouraged.
