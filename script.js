/* eslint-disable */
gsap.registerPlugin(ScrollTrigger);
// REVEAL //
gsap.utils.toArray('.revealUp').forEach((elem) => {
  ScrollTrigger.create({
    trigger: elem,
    start: 'top 80%',
    end: 'bottom 20%',
    onEnter() {
      gsap.fromTo(
        elem,
        { y: 100, autoAlpha: 0 },
        {
          duration: 1.25,
          y: 0,
          autoAlpha: 1,
          ease: 'back',
          overwrite: 'auto',
        },
      );
    },
    onLeave() {
      gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: 'auto' });
    },
    onEnterBack() {
      gsap.fromTo(
        elem,
        { y: -100, autoAlpha: 0 },
        {
          duration: 1.25,
          y: 0,
          autoAlpha: 1,
          ease: 'back',
          overwrite: 'auto',
        },
      );
    },
    onLeaveBack() {
      gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: 'auto' });
    },
  });
});

/* eslint-enable */

const sideProjects = [
  {
    title: 'Homely -  Full-Stack App',
    description: 'This Full-stack app caters to individuals seeking to purchase residential properties & offers a user-friendly interface where users can register and conveniently schedule appointments to visit their selected houses of interest.',
    img: 'assests/projects/homely-mockup.jpg',
    techs: ['React', 'SASS', 'Ruby on Rails', 'PostgreSQL'],
    btnText: 'See Project',
    id: 0,
    uniqueId: 'fullstack_prcjt',
    live: 'https://homelyheaven.netlify.app/',
    source: 'https://github.com/Wahaj-Ali/homely-frontend',
  },
  {
    title: 'PAK ORTHOCON',
    description: 'It is a website for an event happening in my locality. It consists of two working pages i.e., Home page and About Page.',
    img: 'assests/projects/capstone1-mockup.jpg',
    techs: ['HTML5', 'CSS3', 'JavaScript'],
    live: 'https://wahaj-ali.github.io/Capstone-1/index.html',
    source: 'https://github.com/Wahaj-Ali/Capstone-1',
    btnText: 'See Project',
    id: 1,
    uniqueId: 'prcjt6',
  },
  {
    title: 'TV Hub',
    description: 'This JavaScript project is a web app based on an external API(TVmaze DB). User can search for a show, like it, and comment on any of your favorite shows.',
    img: 'assests/projects/tvhub-mockup.jpg',
    techs: ['HTML5', 'JavaScript', 'CSS3', 'Webpack'],
    btnText: 'See Project',
    id: 2,
    uniqueId: 'prcjt3',
    live: 'https://wahaj-ali.github.io/tv-hub/dist/',
    source: 'https://github.com/Wahaj-Ali/tv-hub',
  },
  {
    title: 'Population Index',
    description: "This 'Metrics webapp' is a React SPA that shows the countries of the world along with their population count. It uses API to fetch the data & redux to store the data.",
    img: 'assests/projects/metrics-mockup.jpg',
    techs: ['JSX', 'React', 'CSS3', 'Redux'],
    btnText: 'See Project',
    id: 3,
    uniqueId: 'prcjt2',
    live: 'https://populaton-index-by-wahaj.netlify.app/',
    source: 'https://github.com/Wahaj-Ali/metrics-webapp',
  },
  {
    title: 'Bookstore',
    description: "The 'Bookstore' is a React SPA that uses Redux as state-management tool.It shows a list of books and a form to add new books.",
    img: 'assests/projects/bookstore-mockup.jpg',
    techs: ['React', 'Redux', 'CSS3', 'JSX'],
    btnText: 'See Project',
    id: 4,
    uniqueId: 'prcjt4',
    live: 'https://wahaj-bookstore.netlify.app/',
    source: 'https://github.com/Wahaj-Ali/bookstore',
  },
  {
    title: 'Every Penny',
    description: 'This project is created as part of the rails capstone at Microverse. This app is a mobile web application where a user manage its budget: have a list of transactions associated with a category, so that the user can see how much money it spent and on what.',
    img: 'assests/projects/everypenny.png',
    techs: ['Ruby', 'CSS3', 'Ruby on Rails', 'PostgreSQL'],
    btnText: 'See Project',
    id: 5,
    uniqueId: 'everypenny',
    live: 'https://budget-app-eydq.onrender.com/',
    source: 'https://github.com/Wahaj-Ali/every-penny',
  },
];

const freelanceProjects = [
  {
    title: 'Fully Constructed',
    description: 'Designed and developed a responsive website for a leading construction company using React. Showcasing my creative prowess and proficiency in web development. Leveraging my skills, I implemented a user-centric design, ensuring a seamless and engaging experience for visitors.',
    img: 'assests/projects/homely-mockup.jpg',
    techs: ['React', 'CSS', 'JSX'],
    btnText: 'See Project',
    id: 0,
    uniqueId: 'fullyConstructed',
    live: 'https://www.fullyconstructed.com/',
  },
  {
    title: 'Instantly Insured',
    description: "A professional and responsive insurance company website using React, featuring seamless form integration and robust validation functionalities. Ensure an optimal user experience through a sleek and intuitive design, reflecting the company's commitment to efficiency and reliability.",
    img: 'assests/projects/capstone1-mockup.jpg',
    techs: ['React', 'CSS', 'Framer Motion', 'Swiper JS'],
    btnText: 'See Project',
    id: 1,
    uniqueId: 'instantlyInsured',
    live: 'https://www.instantlyinsured.com',
  },
  {
    title: 'Instantly Scaled',
    description: "A responsive website using React for a forward-thinking company specializing in digital solutions. Having an aesthetically pleasing and user-centric design to showcase the company's innovative approach, with a focus on seamless responsiveness across various devices.",
    img: 'assests/projects/tvhub-mockup.jpg',
    techs: ['React', 'CSS', 'Framer Motion', 'Swiper JS'],
    btnText: 'See Project',
    id: 2,
    uniqueId: 'instantlyScaled',
    live: 'https://www.instantlyscaled.com',
  },
];

let currentCategory = 'sideProjects';

const displayCards = () => {
  let result = '';
  const selectedProjects = currentCategory === 'sideProjects' ? sideProjects : freelanceProjects;

  selectedProjects.filter((card) => card.id >= 0).forEach((card) => {
    let techList = '';
    const techTags = card.techs;
    for (let x = 0; x < techTags.length; x += 1) {
      techList += `<p>${techTags[x]}</p>`;
    }
    result += `
      <div class="project" id="${card.uniqueId}">
          <h3>${card.title}</h3>
          <p id="project-descp">${card.description}</p>
          <div class="tags">
          ${techList}
          </div>
          <div class="btn-container">
            <button class="see"><a href=${card.live} target="_blank" rel="noopener">See Live<i class="fa-solid fa-square-up-right live"></i></a></button>
            ${currentCategory === 'sideProjects' ? `<button class="see"><a href=${card.source} target="_blank" rel="noopener">See Source<i class="fa-brands fa-github source"></i></a></button>` : ''}
          </div>
      </div>`;
  });
  document.querySelector('#projects').innerHTML = result;
};

// Function to toggle between sideProjects and freelanceProjects
export default toggleCategory = (category) => {
  currentCategory = category;
  displayCards();

  // Update button styles
  const sideProjectsButton = document.getElementById('sideProjectsLink');
  const freelanceProjectsButton = document.getElementById('freelanceProjectsLink');

  if (currentCategory === 'sideProjects') {
    sideProjectsButton.classList.add('selected');
    freelanceProjectsButton.classList.remove('selected');
  } else {
    sideProjectsButton.classList.remove('selected');
    freelanceProjectsButton.classList.add('selected');
  }
};

// Initial display
displayCards();

const skillCards = [{
  id: 1,
  title: 'Language',
  icon: 'fa-solid fa-globe',
  skills: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
},
{
  id: 2,
  title: 'Frameworks',
  icon: 'fa-solid fa-square',
  skills: ['ReactJS', 'ExpressJS', 'NextJS', 'Tailwind CSS', 'Bootstrap', 'Selenium'],
},
{
  id: 3,
  title: 'Skills',
  icon: 'fa-solid fa-circle',
  skills: ['Database Management', 'Version Control', 'CLI', 'Design', 'Web Development'],
},
];

const displaySkills = () => {
  let result = '';

  skillCards.filter((card) => card.id > 0).forEach((card) => {
    let skillList = ''; // list of tags as li element
    const skillTags = card.skills;
    //   populate tag list iterating over tags array
    for (let x = 0; x < skillTags.length; x += 1) {
      skillList += `<p>${skillTags[x]}</p>`;
    }
    result += `
      <div class="container skill">
      <h4><i class="${card.icon}" style="color:#2bbbd5"></i>${card.title}</h4>
      <div class="single-skill">
      ${skillList}
      </div>
    </div>`;
  });
  document.querySelector('.skills').innerHTML = result;
};
displaySkills();

const mobileMenu = document.querySelector('#mobile-menu');
const x = document.querySelector('#desktop-menu');
const menuLinks = document.querySelectorAll('.header-btn');

mobileMenu.addEventListener('click', () => {
  x.classList.toggle('active');
});

menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    x.classList.remove('active');
  });
});

window.onscroll = () => {
  const header = document.querySelector('nav');
  header.classList.toggle('sticky', window.scrollY > 100);
};