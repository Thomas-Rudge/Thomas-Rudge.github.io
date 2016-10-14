// MOBILE NAVIGATION
document.addEventListener('DOMContentLoaded', function() {
   var topBar = document.getElementById('topbar');
   var navPane = document.getElementById('mobilelist');

   // This scrolls the screen back to the top
   topBar.addEventListener('click', function() {
      var keepScrolling = function() {
         setTimeout(function() {
            var yAxis = window.scrollY ? window.scrollY : window.pageYOffset;
            if (window.scrollY>0 || window.pageYOffset>0) {
               window.scrollTo(0, yAxis-60);
               keepScrolling();
            }
         }, 6);
      }

      if (window.scrollY>0 || window.pageYOffset>0) {
         keepScrolling();
      }
   }, false);

   // Show/Hide nav menu for mobile users.
   document.getElementById('navmobile').addEventListener('click', function() {
      var bgImg;
      // index page has different relative path to images
      if (document.body.id === 'bhome') {
         bgImg = 'url("images/sprites/mobile_button.png")';
      } else if (document.body.id === 'bphoto') {
         bgImg = 'url("../images/sprites/mobile_button_dark.png")';
      } else {
         bgImg = 'url("../images/sprites/mobile_button.png")';
      }
      console.log(bgImg);
      // If navigation menu is visible, hide it, else show it
      if (navPane.style.display === 'block') {
         navPane.style.display = 'none';
         this.style.background = bgImg + ' -1px -1px';
      } else {
         navPane.style.display = 'block';
         this.style.background = bgImg + ' 59px -1px';
      }
   }, false);

   // This function hides the nav menu
   var hideNavOnResize = function() {
      if (navPane.style.display === 'block') {
         navButton.click();
      }
   };

   // This function fades out the header when scrolling down, and makes it reappear when at the top
   var fadeHeader = function() {
      var headerBlock = document.getElementsByTagName('header');
      var bodyBlock = document.body;
      var bodyBlockPosition = bodyBlock.getBoundingClientRect();
      
      headerBlock = headerBlock[0];      

      if (bodyBlockPosition.right >= 710) {
         return;
      } else if (bodyBlockPosition.top < -60) {
         headerBlock.style.opacity = 0;
      } else {
         headerBlock.style.opacity = 1;
      }
   };

   window.addEventListener('resize', hideNavOnResize);
   window.addEventListener('scroll', fadeHeader);
}, false);
