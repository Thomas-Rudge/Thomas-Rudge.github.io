
var currentId;   // Toggles a fullscreen translucent black div
var currentPage; // Allows adjustment in slideshow behaviour (Design/Photo)
var currentBody;

// Respond to keyboard input
document.onkeydown = function() {
   if (event.defaultPrevented){
      return;
   }
   
   var key = event.which || event.key || event.keyCode;
   var blackDiv = document.getElementById("blackdiv");
   
   switch(key) {
      case 27: // Escape
      case 'Escape':
         contractImageView(currentId)
         hideBlackDiv()
         break;
      case 36: // Home key
      case 'Home':
         scroll(0,0);
         var banner = document.getElementById('DESIGN');
         banner.style.opacity = 0;
         banner.style.width = 'auto';
         banner.style.position = 'absolute';
         break;
         
      case 37: // Left arrow key
      case 100:// Left arrow on numpad
      case 'Left':
      case '4':
         if (blackDiv.style.display === 'none') {
            return;
         }
         
         imageToggle(-1);
         break;
         
      case 39: // Right arrow key
      case 102:// Right arrow on numpad
      case 'Right':
      case '6':
         if (blackDiv.style.display === 'none') {
            return;
         }
         
         imageToggle(1);
         break;
         
      default:
         return;
   }
   
   event.preventDefault();
};


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

// Because why not
var rotatePhotoBanner = function() {
   var ele = document.getElementById('PHOTO');
   
   if (!ele) {
      return;
   }
   
   var x = Math.random();
   var imgSrc = ele.src;
   
   if (x >= 0.5) {
      imgSrc = imgSrc.slice(0,-9) + 'main2.png';
   } else {
      imgSrc = imgSrc.slice(0,-9) + 'main1.png';
   }
   
   ele.src = imgSrc;   
};


// A function to pad out a string with a given character in either right or left direction
// padText = A string, padChar = A single character as a string, padLength = integer, padDirection = 'r' || 'l'
var paddify = function(padText, padChar, padLength, padDirection) {
   if (padText.length >= padLength) {
      return padText.slice(0, padLength)
   }
   
   if (padDirection === 'l') {
      return padText + padChar.repeat(padLength - padText.length);
   } else {
      return padChar.repeat(padLength - padText.length) + padText;
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

// Move the slideshow in a direction
var imageToggle = function(direction) {
   if (currentPage === 'DESIGN') {
      var validIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
      var divName = 'dimg';
   } else {
      var validIds = []
      var divName = 'pimg';
   }
   
   var currentImageInt = parseInt(currentId.replace('dimg','').replace('pimg',''));
   var nextImageInt = currentImageInt + direction
   
   if (nextImageInt === 0) {
      nextImageInt = validIds.slice(-1)[0];
   } else if (nextImageInt > validIds.length) {
      nextImageInt = 1;
   }
   
   nextImageInt = divName + paddify(nextImageInt.toString(), '0', 2, 'r');
   
   contractImageView(currentId);
   expandImageView(nextImageInt);
};


var expandImageView = function(imageId) {
   // Get the width of the page
   var pageBody = document.getElementById(currentBody);
   var pageBodyHeight = window.innerHeight;
   var pageBodyWidth = pageBody.offsetWidth;
   // Only do this if the screen is big enough
   if (pageBodyHeight > 550 && pageBodyWidth > 778) {
      // Get the image object
      var imageDiv = document.getElementById(imageId);
      // Change the images class.
      imageDiv.className = 'active_design_div';
      // Calculate the margins.
      var imageWidth = imageDiv.offsetWidth;
      var imageHeight = imageDiv.offsetHeight;
      var leftOffset = (pageBodyWidth - imageWidth) / 2;
      var topOffset = (pageBodyHeight - imageHeight) /2;
      // Adjust styling to make the div visible and centred.
      imageDiv.style.left = String(leftOffset) + 'px';
      imageDiv.style.top = String(topOffset) + 'px';
      imageDiv.style.visibility = 'visible';
      imageDiv.style.opacity = 1;
      // Set the objects new onclick method to collapse the image
      imageDiv.children[0].onclick = function() {contractImageView(imageId);};
      //
      currentId = imageId;
      toggleBlackDiv();
   }
};


var contractImageView = function(imageId) {
   active_id = document.getElementById(imageId);
   
   if (!active_id) {
      return;
   }else if (currentPage === 'DESIGN') {
      var standardClass = 'design_div';
   } else {
      var standardClass = 'photo_div';
   }
   
   active_id.className = standardClass;
   active_id.children[0].onclick = function() {expandImageView(imageId)};
   
   toggleBlackDiv();
};


var toggleBanner = function() {
   var banner = document.getElementById(currentPage);
   var rect = banner.getBoundingClientRect();
   // If the screen is too small
   if (banner.style.textAlign === 'left') {
      return;
   // If scroll up past the banner
   } else if (document.body.scrollTop <= 130) {
      banner.style.opacity = 0;
      setTimeout(function(){
         banner.style.width = 'auto';
         banner.style.position = 'absolute';
      }, 100);
   // If scroll down past the header navbar
   } else if (document.body.scrollTop > 140) {
      banner.style.position = 'inherit';
      banner.style.width = '100%';
      setTimeout(function(){
         banner.style.opacity = 1;
      }, 100);
   }
};


var onLoadActivities = function() {
   var ele = document.getElementById('noscript');
   ele.style.display = 'none';
   
   if (document.getElementById('DESIGN')) {
      currentPage = 'DESIGN';
      currentBody = 'bdesign';
   } else {
      currentPage = 'PHOTO';
      currentBody = 'bphoto';
      rotatePhotoBanner();
   }
};

// This will collapse any open image on a resize.
window.onresize = function() {contractImageView(currentId); hideBlackDiv()};
// This hides the banner if the person scrolls up to the main header
window.onscroll = function() {toggleBanner()};
// Remove the noscript div
window.onload = function() {onLoadActivities()};
