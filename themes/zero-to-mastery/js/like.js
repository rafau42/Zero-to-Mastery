"use strict";

(function ($) {
  events();

  function events() {
    if ($("body").hasClass("logged-in")) {
      $(".like-box").on("click", clickDispatcher);
    } else {
      $(".like-box").on("click", error);
    }
  }

  function clickDispatcher(e) {
    var currentLikeBox = $(e.target).closest(".like-box");

    if (currentLikeBox.attr("data-exists") == "yes") {
      deleteLike(currentLikeBox);
    } else {
      createLike(currentLikeBox);
    }
  }

  function error(e) {
    var currentLikeBox = $(e.target).closest(".like-box");
    message = currentLikeBox.find(".like-box__error");
    message.show();
    setTimeout(function () {
      message.hide();
    }, 1000);
  }

  function createLike(currentLikeBox) {
    $.ajax({
      beforeSend: function beforeSend(xhr) {
        xhr.setRequestHeader("X-WP-Nonce", data.nonce);
      },
      url: data.root_url + "/wp-json/rest_route/manageLike",
      type: "POST",
      data: { resourceId: currentLikeBox.data("resource") },
      success: function success(response) {
        currentLikeBox.attr("data-exists", "yes");
        var likeCount = parseInt(currentLikeBox.find(".like-box__like-count").html(), 10);
        likeCount++;
        currentLikeBox.find(".like-box__like-count").html(likeCount);
        currentLikeBox.attr("data-like", response);
        console.log(response);
      },
      error: function error(response) {
        console.log(response);
      }
    });
  }

  function deleteLike(currentLikeBox) {
    $.ajax({
      beforeSend: function beforeSend(xhr) {
        xhr.setRequestHeader("X-WP-Nonce", data.nonce);
      },
      url: data.root_url + "/wp-json/rest_route/manageLike",
      data: { like: currentLikeBox.attr("data-like") },
      type: "DELETE",
      success: function success(response) {
        currentLikeBox.attr("data-exists", "no");
        var likeCount = parseInt(currentLikeBox.find(".like-box__like-count").html(), 10);
        likeCount--;
        currentLikeBox.find(".like-box__like-count").html(likeCount);
        currentLikeBox.attr("data-like", "");
        console.log(response);
      },
      error: function error(response) {
        console.log(response);
      }
    });
  }
})(jQuery);
