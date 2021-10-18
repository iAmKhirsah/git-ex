'use strict';

function createProjects() {
  var projs = [
    {
      id: 'pacman',
      name: 'Pacman',
      title: 'The Pacman',
      desc: "It's pacman my guy",
      url: 'https://iamkhirsah.github.io/pacman/',
      publishedAt: new Date('02/10/2021'),
      labels: ['pacman', 'css', 'js'],
    },
    {
      id: 'minesweeper',
      name: 'Minesweeper',
      title: 'The Minesweeper',
      desc: 'Become an expert at sea-mine disposal',
      url: 'https://iamkhirsah.github.io/Minesweeper/',
      publishedAt: new Date('6,10,2021'),
      labels: ['sprint', 'css', 'js', 'bombs'],
    },
    {
      id: 'bookshop',
      name: 'Bookshop',
      title: 'My bookshop',
      desc: 'A bookshop',
      url: 'https://iamkhirsah.github.io/bookshop/',
      publishedAt: new Date('17/10/2021'),
      labels: ['books', 'css', 'js', 'pretty'],
    },
  ];
  return projs;
}
