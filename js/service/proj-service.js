'use strict';

function createProjects() {
  var projs = [
    {
      id: 'pacman',
      name: 'Pacman',
      title: 'The Pacman',
      desc: "It's pacman my guy",
      url: 'https://iamkhirsah.github.io/pacman/',
      publishedAt: '02/10/2021',
      labels: ['Pacman', 'CSS', 'JS'],
    },
    {
      id: 'minesweeper',
      name: 'Minesweeper',
      title: 'The Minesweeper',
      desc: 'Become an expert at sea-mine disposal',
      url: 'https://iamkhirsah.github.io/Minesweeper/',
      publishedAt: '6,10,2021',
      labels: ['Sprint', 'CSS', 'JS', 'Bombs'],
    },
    {
      id: 'bookshop',
      name: 'Bookshop',
      title: 'My bookshop',
      desc: 'A bookshop',
      url: 'https://iamkhirsah.github.io/bookshop/',
      publishedAt: '17/10/2021',
      labels: ['Books', 'Css', 'JS', 'Pretty'],
    },
  ];
  return projs;
}

function getProjectById(id) {
  var projects = createProjects();
  var findProjectId = projects.filter((project) => {
    if (project.id === id) return project;
  });
  return findProjectId;
}
