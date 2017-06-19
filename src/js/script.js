$(document).ready(function() {
	
    var menuBarIconClose = $('i.ion-close-round');
	var $mainNav = $('.main-nav');
	var $mainNavContainer = $('.main-nav .main-nav__container');
	var flexContainer = $('header .flex-container');
    var $this = $(this);
    var $nav = $('nav');
    var columnItems = $('.features .col').siblings();
    var appScreen = $('.steps__image');
    var $window = $(window);
	var $body = $('body');
	var menuBarIcon = $('i.ion-navicon-round');
    var mainNavContainerFixed = '.main-nav__container--fixed'; 

    var navOffset = $nav.offset().top;
    var $features = $('#main-features');
    var $featuresOffset = $features.offset().top;
    
    // console.log($featuresOffset);
    
    var headerHeight = $('header').height();
    
    $(window).scroll(function () {
        if ($this.scrollTop() > headerHeight) {
            $('.main-nav__container').addClass(mainNavContainerFixed);
        } else {
            $('.main-nav__container').removeClass(mainNavContainerFixed);
        }
    });

    // $window.scroll(function () {
    //     if ($this.offset().top > 766) {
    //         $mainNavContainer.addClass('.main-nav__container--fixed');
    //     } else {
    //         $mainNavContainer.removeClass('.main-nav__container--fixed');
    //     }
    // });

    // $window.addEventListener('scroll', function () {
    //     var features = $('#main-features').offsetTop;

    //     console.log(features);
    // });

    // $window.scroll(function () {
    //     console.log($this.scrollTop());
    // });

    // $(menuBarIcon).on('click', function(e) {
    //     e.stopPropagation();

    //     if (e.target.className == 'menu-nav') {
    //         $(mainNav).addClass('open');
    //     } else {
    //         $(mainNav).removeClass('open');
    //     }

    //     $(mainNav).addClass('open');
    //     // $(flexContainer).addClass('auto');
    //     $(menuBarIconClose).addClass('close-menu');
    // });

    // $($body).on('click', function(e) { 
    // 	e.stopPropagation();
    //     $(mainNav).removeClass('open');
    //     // $(flexContainer).removeClass('auto');
    //     $(menuBarIconClose).removeClass('close-menu');
    // });

    // $(window).scroll(function() {
    //     if ($this.scrollTop() > 767) {
    //         // $nav.addClass('scrolling');
    //         $mainNavContainer.addClass('.main-nav__container--fixed');
    //         console.log('scrolling')
    //     } else {
    //         // $nav.removeClass('scrolling');
    //         $mainNavContainer.removeClass('.main-nav__container--fixed');
    //         console.log('not scrolling')
    //     }
    // });

    // $(window).scroll(function() {
    //     if ($this.scrollTop() > 667) {
    //         columnItems.addClass('animated');
    //         columnItems.addClass('fadeInUp');
    //         columnItems.addClass('fading');
    //     } else {
    //         columnItems.removeClass('animated fadeIn');
    //     }
    // });

    // $(window).scroll(function() {
    //     if ($this.scrollTop() > 1297) {
    //         appScreen.addClass('animated fadeInUp');
    //     } else {
    //         appScreen.removeClass('animated fadeInUp');
    //     }
    // });

    // $('a[href*="#"]:not([href="#"])').click(function() {
    //     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    //         var target = $(this.hash);
    //         target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    //         if (target.length) {
    //             $('html, body').animate({
    //                 scrollTop: target.offset().top
    //             }, 500);
    //             return false;
    //         }
    //     }
    // });

    // new GMaps({
    //     div: '.map',
    //     lat: -12.043333,
    //     lng: -77.028333
    // });
});
