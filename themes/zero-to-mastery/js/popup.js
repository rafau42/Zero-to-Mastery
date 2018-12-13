(function($) {
  var btn_open = $(".btn--discord");
  var popup = $(".popup");
  var btn_close = $(".popup__close");
  events();

  function events() {
    btn_open.on("click", openPopup);
    btn_close.on("click", closePopup);
  }

  function openPopup() {
    popup.addClass("popup--active");
  }

  function closePopup() {
    popup.removeClass("popup--active");
  }
})(jQuery);
