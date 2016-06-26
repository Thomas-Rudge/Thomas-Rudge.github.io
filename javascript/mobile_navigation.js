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
      navButton.style.background = bgImg + ' 0px 0px';
   } else {
      navPane.style.display = 'block';
      navButton.style.background = bgImg + ' 70px 0px';
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


window.onresize = function() {hideOnResize()};