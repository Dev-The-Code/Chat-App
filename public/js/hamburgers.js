(function() {

  // On icon click...
  $('.menu-link-wrapper').on('click.mobileNav', function(){

    // Toggle the open/closed state of the menu icon
    $('.menu-link-wrapper .menu-link').toggleClass('menu-trigger-open');

  });
  
})();