(function($) {
  var navigation_wrap = $("#main-navigation-wrap");
  var navigation_list = $(".navigation__list--main");
  var navigation_toggle_main = $(".navigation__toggle-main");
  var navigation_icon = $(".navigation__icon--menu");
  var navigation_sub = $(".navigation__nav--sub");
  navigation_sub.before(
    '<button class="navigation__toggle--sub" type="button" aria-label ="Toggle Menu" aria-controls="Sub Menu" aria-expanded="false" title="Toggle Menu"><span class = "sr-only sr-target">Open </span>Menu</button>'
  );
  var navigation_toggle_sub = $(".navigation__toggle--sub");
  navigation_toggle_sub.append(
    '<i class="navigation__icon navigation__icon--sub fa fa-bars" aria-hidden="true"></i>'
  );
  var navigation_icon_sub = $(".navigation__icon--sub");
  var navigation_list_sub = $(".navigation__list--sub");
  events();

  function events() {
    toggleMainNav();
    toggleSubNav();
    fixedNav();
    navigationScroll();
  }

  function toggleMainNav() {
    navigation_toggle_main.click(function() {
      navigation_list.appendTo(navigation_wrap);
      toggleNav(navigation_toggle_main, navigation_list, navigation_icon);
    });
  }

  function toggleSubNav() {
    navigation_toggle_sub.click(function() {
      navigation_list.appendTo(navigation_wrap);
      toggleNav(
        navigation_toggle_sub,
        navigation_list_sub,
        navigation_icon_sub
      );
    });
  }

  function toggleNav(toggle, list, icon) {
    toggle.toggleAttrVal("aria-expanded", "true", "false");
    toggle.find(".sr-target").toggleText("Close ", "Open ");
    list.slideToggle(200);
    icon.toggleClass("fa-window-close", "fa-bars");
  }

  function fixedNav() {
    navigation_wrap.waypoint(
      function(direction) {
        if (direction == "down") {
          navigation_wrap.addClass("sticky");
        } else {
          navigation_wrap.removeClass("sticky");
        }
      },
      {
        offset: "-400px"
      }
    );
  }

  function navigationScroll() {
    $(function() {
      $("a[href*=#]:not([href=#])").click(function() {
        if (
          location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
          location.hostname == this.hostname
        ) {
          var target = $(this.hash);
          target = target.length
            ? target
            : $("[name=" + this.hash.slice(1) + "]");
          if (target.length) {
            $("html,body").animate(
              {
                scrollTop: target.offset().top
              },
              1500
            );
            return false;
          }
        }
      });
    });
  }
})(jQuery);
