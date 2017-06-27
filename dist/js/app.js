$(document).ready(function() {
  var $this = $(this);

  $(window).scroll(function() {
    if ($(this).scrollTop() >= $("#main-header").height()) {
      // $('.main-nav').children().removeClass('main-nav__container');
      $(".main-nav").children().addClass("main-nav__container--fixed");
      $(".main-nav .main-nav__logo").addClass("main-nav__logo--fixed");
      $(".main-nav .main-nav__logo--transparent").addClass('main-nav__logo--hidden');
      $(".main-nav .main-nav__logo--full").addClass('main-nav__logo--visible');
      $(".main-nav__link").addClass('main-nav__link--fixed');
      $(".main-nav__icon").addClass('main-nav__icon--black');
    } else {
      $(".main-nav").children().removeClass("main-nav__container--fixed");
      $(".main-nav .main-nav__logo").removeClass("main-nav__logo--fixed");
      $(".main-nav .main-nav__logo--transparent").removeClass('main-nav__logo--hidden');
      $(".main-nav .main-nav__logo--full").removeClass('main-nav__logo--visible');
      $(".main-nav__link").removeClass('main-nav__link--fixed');
      $(".main-nav__icon").removeClass('main-nav__icon--black');
    }
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() >= 766) {
      $(".features .features__feature-container").addClass("animated").addClass("fadeInUp").addClass("fading");
    } else {
      $(".features .features__feature-container").removeClass("animated fadeIn fading");
    }
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() >= 1297) {
      $('.steps .steps__image').addClass("animated fadeInUp");
    } else {
      $('.steps .steps__image').removeClass("animated fadeInUp");
    }
  });

  $('.main-nav__container').click(function () {
    $('.ion-navicon-round').toggleClass('main-nav__icon--hidden');
    $('.main-nav .main-nav__link-container').toggleClass('main-nav__link-container--visible');
  });

  $('.main-nav__container').click(function () {
    $('.ion-close-round').toggleClass('main-nav__icon--visible');
  });

  $('a[href*="#"]:not([href="#"])').click(function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top
          },
          500
        );
        return false;
      }
    }
  });

  function initMap() {
    var cordinates = {
      lat: -12.043333,
      lng: -77.028333
    };

    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: cordinates
    });

    var marker = new google.maps.Marker({
      position: cordinates,
      map: map
    });
  }

  initMap();
});

