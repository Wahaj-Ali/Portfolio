const cards = [
  {
    title: 'Homely -  Full-Stack App',
    description: 'This Full-stack app caters to individuals seeking to purchase residential properties & offers a user-friendly interface where users can register and conveniently schedule appointments to visit their selected houses of interest.',
    img: 'assests/projects/homely.png',
    techs: ['React', 'CSS3', 'Ruby on Rails', 'PostgreSQL'],
    btnText: 'See Project',
    id: 0,
    uniqueId: 'fullstack_prcjt',
    live: 'https://homelyheaven.netlify.app/',
    source: 'https://github.com/Wahaj-Ali/homely-frontend',
  },
  {
    title: 'Every Penny',
    description: 'This project is created as part of the rails capstone at Microverse. This app is a mobile web application where a user manage its budget: have a list of transactions associated with a category, so that the user can see how much money it spent and on what.',
    img: 'assests/projects/everypenny.png',
    techs: ['Ruby', 'CSS3', 'Ruby on Rails', 'PostgreSQL'],
    btnText: 'See Project',
    id: 1,
    uniqueId: 'everypenny',
    live: 'https://budget-app-eydq.onrender.com/',
    source: 'https://github.com/Wahaj-Ali/every-penny',
  },
  {
    title: 'Leaderboard',
    description: 'Leaderboard is a website that displays scores submitted by different players. It uses external Leaderboard API service and webpack.',
    img: 'assests/projects/leaderboard.jpg',
    techs: ['HTML5', 'CSS3', 'JavaScript', 'Webpack'],
    btnText: 'See Project',
    id: 2,
    uniqueId: 'prcjt1',
    live: 'https://wahaj-ali.github.io/Leaderboard/dist/',
    source: 'https://github.com/Wahaj-Ali/Leaderboard',
  },
  {
    title: 'Population Index',
    description: "This 'Metrics webapp' is a React SPA that shows the countries of the world along with their population count. It uses API to fetch the data & redux to store the data.",
    img: 'assests/projects/metrics-webapp.jpg',
    techs: ['HTML5', 'React', 'CSS3', 'Redux'],
    btnText: 'See Project',
    id: 3,
    uniqueId: 'prcjt2',
    live: 'https://populaton-index-by-wahaj.netlify.app/',
    source: 'https://github.com/Wahaj-Ali/metrics-webapp',
  },
  {
    title: 'TV Hub',
    description: 'This JavaScript project is a web app based on an external API(TVmaze DB). User can search for a show, like it, and comment on any of your favorite shows.',
    img: 'assests/projects/tv-hub.jpg',
    techs: ['HTML5', 'JavaScript', 'CSS3', 'Webpack'],
    btnText: 'See Project',
    id: 4,
    uniqueId: 'prcjt3',
    live: 'https://wahaj-ali.github.io/tv-hub/dist/',
    source: 'https://github.com/Wahaj-Ali/tv-hub',
  },
  {
    title: 'Bookstore',
    description: "The 'Bookstore' is a React SPA that uses Redux as state-management tool.It shows a list of books and a form to add new books.",
    img: 'assests/projects/bookstore.jpg',
    techs: ['HTML5', 'React', 'Redux'],
    btnText: 'See Project',
    id: 5,
    uniqueId: 'prcjt4',
    live: 'https://wahaj-bookstore.netlify.app/',
    source: 'https://github.com/Wahaj-Ali/bookstore',
  },
  {
    title: 'Awesome Books',
    description: 'Awesome Books ES6 is a a website to add your favourite awesome books. It stores the books and displays them in a list.',
    img: 'assests/projects/awesomebooks.jpg',
    techs: ['HTML5', 'CSS3', 'JavaScript'],
    btnText: 'See Project',
    id: 6,
    uniqueId: 'prcjt5',
    live: 'https://wahaj-ali.github.io/AwesomebooksES6/',
    source: 'https://github.com/Wahaj-Ali/AwesomebooksES6',
  },
  {
    title: 'PAK ORTHOCON',
    description: 'It is a website for an event happening in my locality. It consists of two working pages i.e., Home page and About Page.',
    img: 'assests/projects/capsotne1.jpg',
    techs: ['HTML5', 'CSS3', 'JavaScript'],
    live: 'https://wahaj-ali.github.io/Capstone-1/index.html',
    source: 'https://github.com/Wahaj-Ali/Capstone-1',
    btnText: 'See Project',
    id: 7,
    uniqueId: 'prcjt6',
  },
  {
    title: 'To Do List',
    description: 'To Do List is a tool that helps to organize your day. It simply lists the things that you need to do and allows you to mark them as complete.',
    img: 'assests/projects/todolist.jpg',
    techs: ['HTML5', 'CSS3', 'JavaScript'],
    btnText: 'See Project',
    id: 8,
    uniqueId: 'prcjt7',
    live: 'https://wahaj-ali.github.io/to-do-list/dist/',
    source: 'https://github.com/Wahaj-Ali/to-do-list',
  },
];

function displayCards() {
  let result = '';

  cards.filter((card) => card.id >= 0).forEach((card) => {
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
          <button class="btn see">See Project</button>
          </div>
          </div>
          `;
  });
  document.querySelector('#projects').innerHTML = result;
}
displayCards();

const skillCards = [{
  id: 1,
  title: 'Language',
  shape: 'assests/diamond.png',
  skills: ['JavaScript', 'Ruby', 'HTML5', 'CSS3'],
},
{
  id: 2,
  title: 'Frameworks',
  shape: 'assests/rectangle.png',
  skills: ['React', 'Ruby on Rails', 'RSpec', 'Capybara', 'Selenium'],
},
{
  id: 3,
  title: 'Skills',
  shape: 'assests/circle.png',
  skills: ['Database Management', 'Version Control', 'CLI', 'Design', 'Web Development'],
},
];

function displaySkills() {
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
      <h4><img src=${card.shape} />${card.title}</h4>
      <div class="single-skill">
      ${skillList}
      </div>
    </div>`;
  });
  document.querySelector('.skills').innerHTML = result;
}
displaySkills();

const loadMoreBtn = document.querySelector('#load-more');
let currentItem = 3;

loadMoreBtn.onclick = () => {
  const boxes = [...document.querySelectorAll('.recent-works #projects .project')];
  for (let i = currentItem; i < currentItem + 3; i += 1) {
    boxes[i].style.display = 'inline-block';
  }
  currentItem += 3;

  if (currentItem >= boxes.length) {
    loadMoreBtn.style.display = 'none';
  }
};

const mobileMenu = document.querySelector('#mobile-menu');
const x = document.querySelector('#desktop-menu');
mobileMenu.addEventListener('click', () => {
  x.classList.toggle('active');
});

const btn = document.getElementsByClassName('see');
const popUp = document.querySelector('.popup');

cards.forEach((card) => {
  for (let i = 0; i < btn.length; i += 1) {
    btn[i].addEventListener('click', () => {
      if (i === ((card.id))) {
        popUp.style.display = 'flex';
        let modalTechs = '';
        const modalTags = card.techs;
        //   populate tag list iterating over tags array
        for (let x = 0; x < modalTags.length; x += 1) {
          modalTechs += `<p>${modalTags[x]}</p>`;
        }
        const show = `<div class="popup-container">
        <div class="popup-top">
          <h4>${card.title}</h4>
          <img class="close-btn" src="assests/icons/close.png" alt="X">
        </div>
        <div class="tags">
          ${modalTechs}
        </div>
        <div class="project-img">
          <img src=${card.img} />
        </div>
        <div class="project-desc">
          <p>${card.description}</p>
        </div>
        <div class="project-links">
          <button class="btn"><a href=${card.live} target="_blank" rel="noopener">See Live<img src="assests/icons/live.png" alt="live" class="live"></a></button>
          <button class="btn"><a href=${card.source} target="_blank" rel="noopener">See Source<img src="assests/icons/github.png" alt="source" class="source"></a></button>
        </div>
      </div>
    </div>`;

        popUp.innerHTML = show;

        if (popUp.style.display === 'flex') {
          document.body.style.overflow = 'hidden';
        }

        const closePopup = document.getElementsByClassName('close-btn');
        for (let j = 0; j < closePopup.length; j += 1) {
          closePopup[j].addEventListener('click', () => {
            popUp.style.display = 'none';
            document.body.style.overflow = 'auto';
          });
        }
      }
    });
  }
});

window.onload = () => {
  popUp.style.display = 'none';
};

window.addEventListener('click', (event) => {
  if (event.target === popUp) {
    popUp.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

window.onscroll = () => {
  const header = document.querySelector('nav');
  header.classList.toggle('sticky', window.scrollY > 100);
};