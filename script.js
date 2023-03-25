const cards = [
  {
    title: 'Leaderboard',
    description: 'Leaderboard is a website that displays scores submitted by different players. It uses external Leaderboard API service and webpack.',
    img: './attributes/leaderboard.jpg',
    techs: ['HTML', 'CSS', 'JavaScript', 'Webpack'],
    btnText: 'See Project',
    id: 1,
    uniqueId: 'prcjt1',
  },
  {
    title: 'Population Index',
    description: "This 'Metrics webapp' is a React SPA that shows the countries of the world along with their population count. It uses API to fetch the data & redux to store the data.",
    img: './attributes/prjct2.png',
    techs: ['HTML', 'React.js', 'CSS', 'Redux'],
    btnText: 'See Project',
    id: 2,
    uniqueId: 'prcjt2',
  },
  {
    title: 'TV Hub',
    description: 'This JavaScript project is a web app based on an external API(TVmaze DB). User can search for a show, like it, and comment on any of your favorite shows.',
    img: './attributes/prjct3.png',
    techs: ['HTML', 'JavaScript', 'CSS', 'Webpack'],
    btnText: 'See Project',
    id: 3,
    uniqueId: 'prcjt3',
  },
  {
    title: 'Bookstore',
    description: "The 'Bookstore' is a React SPA that uses Redux as state-management tool.It shows a list of books and a form to add new books.",
    img: './attributes/prjct3.png',
    techs: ['HTML', 'React.js', 'Redux'],
    btnText: 'See Project',
    id: 7,
    uniqueId: 'prcjt7',
  },
  {
    title: 'Awesome Books',
    description: 'Awesome Books ES6 is a a website to add your favourite awesome books. It stores the books and displays them in a list.',
    img: './attributes/awesoembooks.png',
    techs: ['HTML', 'CSS', 'JavaScript'],
    btnText: 'See Project',
    id: 5,
    uniqueId: 'prcjt5',
    live: 'https://wahaj-ali.github.io/AwesomebooksES6/',
    source: 'https://github.com/Wahaj-Ali/AwesomebooksES6',
  },
  {
    title: 'PAK ORTHOCON',
    description: 'It is a website for an event happening in my locality. It consists of two working pages i.e., Home page and About Page.',
    img: './attributes/capsotne1.jpg',
    techs: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://wahaj-ali.github.io/Capstone-1/index.html',
    source: 'https://github.com/Wahaj-Ali/Capstone-1',
    btnText: 'See Project',
    id: 6,
    uniqueId: 'prcjt6',
  },
  {
    title: 'To Do List',
    description: 'To Do List is a tool that helps to organize your day. It simply lists the things that you need to do and allows you to mark them as complete.',
    img: './attributes/todolist.png',
    techs: ['HTML', 'CSS', 'JavaScript'],
    btnText: 'See Project',
    id: 4,
    uniqueId: 'prcjt4',
    live: 'https://wahaj-ali.github.io/to-do-list/dist/',
    source: 'https://github.com/Wahaj-Ali/to-do-list',
  },
];

function displayCards() {
  let result = '';

  cards.filter((card) => card.id > 0).forEach((card) => {
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
  skills: ['JavaScript', 'Ruby', 'HTML', 'CSS'],
},
{
  id: 2,
  title: 'Frameworks',
  shape: 'assests/rectangle.png',
  skills: ['React.js', 'Ruby on Rails', 'RSpec', 'Capybara', 'Selenium'],
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
