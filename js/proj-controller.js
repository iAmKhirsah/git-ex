'use strict';

$(initPage);

function initPage() {
  renderProjects();
  renderModal();
  $('.contact-btn').click(handleContactMe);
}

function renderProjects() {
  var projects = createProjects();
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

function renderModal() {
  var projects = createProjects();
  var strHTML = '';

  /// TO DO ONE MODAL THAT OPENS WHEN CLICKING SPECIFIC PROJECT
  for (var i = 1; i <= projects.length; i++) {
    strHTML += `    <div
      class="portfolio-modal modal fade"
      id="portfolioModal${i}"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="close-modal" data-dismiss="modal">
            <div class="lr">
              <div class="rl"></div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-lg-8 mx-auto">
                <div class="modal-body">
                  <h2>${projects[i - 1].title}</h2>
                  <p class="item-intro text-muted">
                    ${projects[i - 1].name}.
                  </p>
                  <img
                    class="img-fluid d-block mx-auto"
                    src="img/portfolio/${i}-portfolio.png"
                    alt=""
                  />
                  <p>
                   ${projects[i - 1].desc}
                  </p>
                  <ul class="list-inline">
                    <li>Date: ${projects[i - 1].publishedAt}</li>
                    <li>Creator: Ilya Shershniov</li>
                    <li>Category: ${projects[i - 1].labels}</li>
                  </ul>
                  <a href="${
                    projects[i - 1].url
                  }" target="_blank" rel="noopener noreferrer" >
                  
                  <button
                    class="btn btn-primary"
                    type="button"
                  >
                    <i class="fa fa-times"></i>
                    Check it out
                  </button></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }
  $('.portfolio-modals').html(strHTML);
}

function handleContactMe() {
  var email = $('.email-input').val();
  var subject = $('.subject-input').val();
  var msg = $('.body-message').val();
  console.log(email, subject, msg);
  window.open(
    `https://mail.google.com/mail/?view=cm&fs=1&to=khirsah2211@gmail.com&su=${subject}&body=${msg}`
  );
  $('.email-input').val('');
  $('.subject-input').val('');
  $('.body-message').val('');
}
