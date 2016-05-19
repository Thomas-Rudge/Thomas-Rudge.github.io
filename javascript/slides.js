// For the design.html page.
// Makes the images appear in full with black background


// Toggles a fullscreen translucent black div
var currentId ;

var toggleBlackDiv = function() {
   var ele = document.getElementById("blackdiv");

   if (ele.style.display === "block") {
      ele.style.display = "none";
      ele.style.visibility = "hidden";
      ele.style.opacity = 0;
   } else {
      ele.style.display = "block";
      ele.style.visibility = "visible";
      ele.style.opacity = 0.7;
   }
};

// Used by onresize because otherwise the toggleBlackDiv method would toggle
// after each resize, regardless as to whether an image was present on screen.
var hideBlackDiv = function() {
   var ele = document.getElementById("blackdiv");
   ele.style.display = "none";
   ele.style.visibility = "hidden";
   ele.style.opacity = 0;
};

// Changes the the id of the 
var expandImageView = function(imageId) {
   // Get the width of the page
   var pageBody = document.getElementById('bdesign');
   var pageBodyHeight = window.innerHeight;
   var pageBodyWidth = pageBody.offsetWidth;
   // Only do this if the screen is big enough
   if (pageBodyHeight > 550 && pageBodyWidth > 778) {
      // Get the image object
      var image = document.getElementById(imageId);
      // Change the images class.
      image.className = 'active_design_div';
      // Calculate the margins.
      var imageWidth = image.offsetWidth;
      var imageHeight = image.offsetHeight;
      var leftOffset = (pageBodyWidth - imageWidth) / 2;
      var topOffset = (pageBodyHeight - imageHeight) /2;
      // Adjust styling to make the div visible and centred.
      image.style.left = String(leftOffset) + 'px';
      image.style.top = String(topOffset) + 'px';
      image.style.visibility = 'visible';
      image.style.opacity = 1;
      // Set the objects new onclick method to collapse the image
      image.children[0].onclick = function() {contractImageView(imageId);};
      //
      currentId = imageId;
      toggleBlackDiv();
   }
};

var contractImageView = function(imageId) {
   var divs = [document.getElementById('design_div1'), document.getElementById('design_div2'), document.getElementById('design_div3'), document.getElementById('design_div4')];
   var i;
   var x;
   
   for (i = 0; i < divs.length; i++) {
      for (x = 0; x < divs[i].children.length; x++) {
         if (divs[i].children[x].className === 'active_design_div') {
            divs[i].children[x].className = 'design_div';
            divs[i].children[x].children[0].onclick = function() {expandImageView(imageId);};
         }
      }
   }

   toggleBlackDiv();
};

var toggleBanner = function() {
   var banner = document.getElementById('DESIGN');
   var rect = banner.getBoundingClientRect()   
   // If scroll up past the banner
   if (rect['top'] > 10) {
      banner.style.opacity = 0;
      setTimeout(function(){
         banner.style.width = 'auto';
         banner.style.position = 'absolute';
      }, 100);
   // If scroll down past the header navbar
   } else if (document.body.scrollTop > 110 || document.documentElement.scrollTop > 110) {
      banner.style.position = 'inherit';
      banner.style.width = '100%';
      setTimeout(function(){
         banner.style.opacity = 1;
      }, 100);
   }
};

var hideNoscript = function() {
   var ele = document.getElementById('noscript');
   ele.style.display = 'none';
};

// This will collapse any open image on a resize.
window.onresize = function() {contractImageView(currentId); hideBlackDiv()};
// This hides the banner if the person scrolls up to the main header
window.onscroll = function() {toggleBanner()};
// Remove the noscript div
window.onload = function() {hideNoscript()};