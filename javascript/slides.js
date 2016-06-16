
var currentId;   // Toggles a fullscreen translucent black div
var currentPage; // Allows adjustment in slideshow behaviour (Design/Photo)
var currentBody;

// Respond to keyboard input
document.onkeydown = function(event) {
   if (event.defaultPrevented){
      return;
   }
   
   var key = event.which || event.key || event.keyCode;
   var blackDiv = document.getElementById("blackdiv");
   console.log(key);
   switch(key) {
      case 27: // Escape
      case 'Escape':
         contractImageView(currentId)
         hideBlackDiv()
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
      ele.style.opacity = 0.9;
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
      return padText + Array(padLength - padText.length + 1).join(padChar)
      //return padText + padChar.repeat(padLength - padText.length); Not supported by IE
   } else {
      return Array(padLength - padText.length + 1).join(padChar) + padText
      //return padChar.repeat(padLength - padText.length) + padText; Not supported by IE
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
      var validIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
      var divName = 'dimg';
   } else {
      var divName = 'pimg';
      var validIds = [];
      
      for (var i = 1; i < 55; i++) {
        validIds.push(i);
      }
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


var calcPosition = function(imgHeight, imgWidth) {
  // Takes an images height and width and returns the top/left values 
  // that will centre it on screen, while maintaining aspect ratio
  var screenHeight = screen.height;
  var screenWidth = screen.width;
};


var expandImageView = function(imageId) {
   // Get the width of the page
   var pageBody = document.getElementById(currentBody);
   // If you couldn't get the page body, abort.
   if (!pageBody) {
      return;
   }
   
   var pageBodyHeight = window.innerHeight;
   var pageBodyWidth = pageBody.offsetWidth;
   var imageDiv = document.getElementById(imageId);
   var imageObj = imageDiv.children[0];
   var paraObj = imageDiv.children[1];
   // If you can't get the div or its image, then abort.
   if (!imageDiv || !imageObj) {
      return;
   }   
   // Change the images class.
   imageDiv.className = 'active_design_div';
   imageDiv.style.visibility = 'visible';
   imageDiv.style.opacity = 1;
   // Set the objects new onclick method to collapse the image
   imageObj.onclick = function() {contractImageView(imageId);};
   // Calculate the right size
   imageDiv.style.maxHeight = pageBodyHeight + 'px';
   imageDiv.style.maxWidth = pageBodyWidth  + 'px';
   imageObj.style.maxHeight = pageBodyHeight + 'px';
   imageObj.style.maxWidth = pageBodyWidth  + 'px';
   // Calculate the margins.
   var imageDivWidth = imageDiv.offsetWidth || imageDiv.clientWidth;
   var imageDivHeight = imageDiv.offsetHeight || imageDiv.clientHeight;
   var leftOffset = (pageBodyWidth - imageDivWidth) / 2;
   var topOffset = (pageBodyHeight - imageDivHeight) /2;
   // Adjust styling to make the div visible and centred.
   imageDiv.style.left = String(leftOffset) + 'px';
   imageDiv.style.top = String(topOffset) + 'px';
   
   currentId = imageId;
   toggleBlackDiv();
};


var contractImageView = function(imageId) {
   var activeId = document.getElementById(imageId);
   // Abort if you can't get the element
   if (!activeId) {
      return;
   }
   
   var activeImg = activeId.children[0];
   var activePara = activeId.children[1];
   
  if (currentPage === 'DESIGN') {
      var standardClass = 'design_div';
   } else {
      var standardClass = 'photo_div';
   }
   
   activeImg.style.maxHeight = 'none';
   activeImg.style.maxWidth = 'none';
   // Set the divs class to normal mode
   activeId.className = standardClass;
   // Reset images onclick function
   activeImg.onclick = function() {expandImageView(imageId)};
   
   toggleBlackDiv();
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
      
      var containDiv = document.getElementById('container');
      containDiv.style.backgroundColor = '#131313';
      containDiv.style.boxShadow = '1px 0px 40px black';
   }
};

// This will collapse any open image on a resize.
window.onresize = function() {contractImageView(currentId); hideBlackDiv()};
// Remove the noscript div
window.onload = function() {onLoadActivities()};
