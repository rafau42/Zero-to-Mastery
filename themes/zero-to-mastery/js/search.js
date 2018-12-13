"use strict";

(function ($) {
  addSearchHTML();
  resultsDiv = $("#search-overlay__results");
  openButton = $(".js-search-trigger");
  closeButton = $(".search-overlay__close");
  searchOverlay = $(".search-overlay");
  searchField = $("#search-term");
  isOverlayOpen = false;
  isSpinnerVisible = false;
  previousValue = undefined;
  typingTimer = undefined;
  events();

  function events() {
    openButton.on("click", openOverlay);
    closeButton.on("click", closeOverlay);
    $(document).on("keydown", keyPressDispatcher);
    searchField.on("keyup", typingLogic);
  }

  function typingLogic() {
    if (searchField.val() != previousValue) {
      clearTimeout(typingTimer);

      if (searchField.val()) {
        if (!isSpinnerVisible) {
          resultsDiv.html('<div class="spinner-loader"></div>');
          isSpinnerVisible = true;
        }
        typingTimer = setTimeout(getResults, 750);
      } else {
        resultsDiv.html("");
        isSpinnerVisible = false;
      }
    }

    previousValue = searchField.val();
  }

  function getResults() {
    $.getJSON(data.root_url + "/wp-json/rest_route/search?term=" + searchField.val(), function (results) {
      resultsDiv.html("\n        <div class=\"search-overlay__row row\">\n          <div class=\"search-overlay__column\">\n            <h2 class=\"search-overlay__section-title\">General Information</h2>\n            " + (results.generalInfo.length ? '<ul class="search-overlay__list">' : "<p>No general information matches that search.</p>") + "\n              " + results.generalInfo.map(function (item) {
        return "<li class=\"search-overlay__item\"><a class=\"search-overlay__link\" href=\"" + item.permalink + "\">" + item.title + "</a> " + (item.postType == "post" ? "by " + item.authorName : "") + "</li>";
      }).join("") + "\n            " + (results.generalInfo.length ? "</ul>" : "") + "\n          </div>\n        <div class=\"search-overlay__column\">\n          <h2 class=\"search-overlay__section-title\">Resources</h2>\n          " + (results.resource.length ? '<ul class="search-overlay__list">' : "<p>No general information matches that search.</p>") + "\n            " + results.resource.map(function (item) {
        return "<li class=\"search-overlay__item\"><a class=\"search-overlay__link\" href=\"" + item.permalink + "\">" + item.title + "</a></li>";
      }).join("") + "\n          " + (results.resource.length ? "</ul>" : "") + "\n        </div>\n        <div class=\"search-overlay__column\">\n          <h2 class=\"search-overlay__section-title\">Projects</h2>\n          " + (results.project.length ? '<ul class="search-overlay__list">' : "<p>No general information matches that search.</p>") + "\n            " + results.project.map(function (item) {
        return "<li class=\"search-overlay__item\"><a class=\"search-overlay__link\" href=\"" + item.permalink + "\">" + item.title + "</a></li>";
      }).join("") + "\n          " + (results.project.length ? "</ul>" : "") + "\n        </div>\n        </div>\n      ");
      isSpinnerVisible = false;
    });
  }

  function keyPressDispatcher(e) {
    if (e.keyCode == 83 && !isOverlayOpen && !$("input, textarea").is(":focus")) {
      openOverlay();
    }

    if (e.keyCode == 27 && isOverlayOpen) {
      closeOverlay();
    }
  }

  function openOverlay() {
    searchOverlay.addClass("search-overlay--active");
    $("body").addClass("body-no-scroll");
    searchField.val("");
    setTimeout(function () {
      return searchField.focus();
    }, 301);
    isOverlayOpen = true;
    return false;
  }

  function closeOverlay() {
    searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
    isOverlayOpen = false;
  }

  function addSearchHTML() {
    $("body").append("\n      <div class=\"search-overlay\">\n      <div class = \"row\">\n        <div class=\"search-overlay__top\">\n        <div class=\"search-overlay__search\">\n            <i class=\"fa fa-search search-overlay__icon\" aria-hidden=\"true\"></i>\n            <input type=\"text\" class=\"search-overlay__search-term\" placeholder=\"What are you looking for?\" id=\"search-term\">\n            </div>\n            <button class=\"search-overlay__close\" aria-label=\"close search overlay\" aria-controls=\"search overlay\" tiitle=\"close search overlay\"><i class=\"search-overlay__icon fa fa-window-close\" aria-hidden=\"true\"></i></button>\n\n        </div>\n        \n          <div class = \"search-overlay__results\" id=\"search-overlay__results\"></div>\n\n        </div>\n      </div>\n    ");
  }
})(jQuery);
