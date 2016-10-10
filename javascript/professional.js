// This page uses jQuery
$(document).ready(function(){
   $('#noscript').hide();
   
   // Toggles nav display for mobile phone users
   $('#navmobile').click(function(){toggleNav(0)});
   
   // This function displays a pop-up window for a particular job
   $('.exp').click(function(){
      hidePopup();
      $(this).find('.moreinfo').fadeIn('fast');
      return false;
   });
   
   // This function hides the job pop-up window when clicked
   $('.moreinfo').click(function(){
      $(this).fadeOut('fast');
      return false;
   });
   
   // Hide any visible popups and menus on scroll or resize
   $(window).scroll(function(){
      hidePopup();
      fadeHeader();
      return false;
   });
   $(window).resize(function(){
      hidePopup();
      toggleNav(1);
      return false;
   });
   
   // Scrolls to the top for mobile users
   $('#topbar').click(function(){
      $('body, html').animate({ scrollTop: 0 }, 300);
   });
   
   // FUNCTIONS
   // Toggles the mobile phone navigation
   // source: 0 = Button; 1 = Resize
   var toggleNav = function(source){
      var bgImg = 'url("../images/sprites/mobile_button.png")';
      var mobileList = $('#mobilelist');
      var navButton = $('#navmobile')
      if (mobileList.css('display') == 'block') {
         mobileList.slideUp('fast');
         navButton.css('background', bgImg + ' -1px -1px');
      } else if (!source) {
         mobileList.slideDown('fast');
         navButton.css('background', bgImg + ' 59px -1px');
      }
      return false;
   }

   // Hides visible popup
   var hidePopup = function(){
      $('.moreinfo').fadeOut('fast');
      return false;
   }
   
   // This function fades out the header when scrolling down, and makes it reappear when at the top
   var fadeHeader = function() {
      var bodyRect = $('body').get(0).getBoundingClientRect();
      var headerBlock = $('header');
      console.log(headerBlock.width());
      console.log(bodyRect);
      if (bodyRect.right >= 695) {
         return;
      // fadeIn & Out sets display to None
      } else if (bodyRect.top < -60) {
         headerBlock.css('opacity', 0)
      } else {
         headerBlock.css('opacity', 1)
      }
   };
});
