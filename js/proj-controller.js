'use strict';

renderProjects();

function renderProjects() {
  var projects = createProjects();
  console.log(projects);
  var strHTML = '';
  for (var i = 1; i <= projects.length; i++) {
    strHTML += `<div class="col-md-4 col-sm-6 portfolio-item">
    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${i}">
    <div class="portfolio-hover">
    <div class="portfolio-hover-content">
    <i class="fa fa-plus fa-3x"></i>
    </div>
    </div>
    <img class="img-fluid" src="img/portfolio/${i}-portfolio.png" >
    </a>
    <div class="portfolio-caption">
    <h4>${projects[i - 1].title}</h4>
    <p class="text-muted">${projects[i - 1].name}</p>
    </div>
   </div>
   `;
  }
  $('#portfolio').children('.container').children('.row').html(strHTML);
}
