// This script controls the navigation for mobile uses

var toggleNavPane = function(level) {
   var navPane = document.getElementById('mobilelist');
   var navButton = document.getElementById('navmobile');
   var bgImg = 'url("../images/sprites/mobile_button.png")'
   
   if (level === 0) {
      bgImg = 'url("images/sprites/mobile_button.png")';
   }
   
   if (!navPane) {
      return;
   } else if (navPane.style.display === 'block') {
      navPane.style.display = 'none';
      navButton.style.background = bgImg + ' -1px -1px';
   } else {
      navPane.style.display = 'block';
      navButton.style.background = bgImg + ' 59px -1px';
   }
};

// This function hides the nav menu
var hideOnResize = function() {
   var navPane = document.getElementById('mobilelist');
   var bodyEle = document.body;
   console.log(bodyEle.id);
   if (!navPane) {
      return;
   } else if (navPane.style.display === 'block') {
      if (bodyEle.id = 'bhome') {
        toggleNavPane(0);
      } else {
        toggleNavPane(1);
      }
   }
};

// This scrolls the screen back to the top
var scrollToTop = function() {
   if (window.scrollY>0) {
      window.scrollTo(0,window.scrollY-60);
      setTimeout("scrollToTop()",5);
   }
};

// This function fades out the header when scrolling down, and makes it reappear when at the top
var fadeHeader = function() {
   var headerBlock = document.getElementsByTagName('header');
   var bodyBlock = document.getElementsByTagName('body');
   
   if (!headerBlock || !bodyBlock) {
      return;
   }
   
   headerBlock = headerBlock[0];
   bodyBlock = bodyBlock[0];
   var bodyBlockPosition = bodyBlock.getBoundingClientRect();
   
   if (bodyBlockPosition.right >= 710) {
      return;
   } else if (bodyBlockPosition.top < -60) {
      headerBlock.style.opacity = 0;
   } else {
      headerBlock.style.opacity = 1;
   }
};


window.onresize = function() {hideOnResize()};
window.onscroll = function() {fadeHeader()};