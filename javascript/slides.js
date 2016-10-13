document.addEventListener('DOMContentLoaded', function() {
   var currentId;     // Toggles a fullscreen translucent black div
   var currentPage;   // Allows adjustment in slideshow behaviour (Design/Photo)
   var currentBody;   // Used to determine whether the active page is Photgraphy or Design
   var photoLazyData; // Used to store and load image source information when needed.
   var designLazyData;// Used to store and load image source information when needed.

   // Respond to keyboard input
   document.onkeydown = function(event) {
      if (event.defaultPrevented) {
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

   // Sets the mood.
   var toggleBlackDiv = function(resized) {
      var ele = document.getElementById("blackdiv");

      if (ele.style.display === "block") {
         ele.style.display = "none";
         ele.style.visibility = "hidden";
         ele.style.opacity = 0;
      } else if (!resized) {
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
      } else {
         return Array(padLength - padText.length + 1).join(padChar) + padText
      }
   };

   // Move the slideshow in a direction (-1 = previous, 1 = next)
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
      validateImageSource(nextImageInt);
      expandImageView(nextImageInt);
   };

   var validateImageSource = function(imgId) {
      var imgDiv = document.getElementById(imgId);
      var imgObj = imgDiv.children[0];
      // This will ensure the right data is used for the page
      if (currentPage === 'PHOTO') {
         var lazyData = photoLazyData;
      } else {
         var lazyData = designLazyData;
      }

      // Check whether the image has been loaded yet, and load if needed
      if (imgObj.src.indexOf('lazy_placeholder.gif') !== -1) {
         for (item in lazyData) {
            if (item === imgDiv.parentElement.id) {
               imgObj.src = lazyData[item][imgDiv.id];
            }
         }
      }
   };

   var expandImageView = function(imageId) {
      // Get the page dimensions
      var pageBody = document.getElementById(currentBody);
      // If you couldn't get the page body, abort.
      if (!pageBody) {
         return;
      }

      var pageBodyHeight = window.innerHeight;
      var pageBodyWidth = pageBody.offsetWidth;
      var imageDiv = document.getElementById(imageId);
      var imageObj = imageDiv.children[0];
      // If you can't get the div or its image, then abort.
      if (!imageDiv || !imageObj) {
         return;
      }

      // Change the image div's class which will bring it into full view.
      imageDiv.className = 'active_design_div';
      imageDiv.style.visibility = 'visible';
      imageDiv.style.opacity = 1;
      // Set the objects new onclick method to collapse the image
      imageObj.onclick = function() {contractImageView(imageId)};
      // Set image limitations so that it doesn't exceed screen-size
      imageDiv.style.maxHeight = pageBodyHeight + 'px';
      imageDiv.style.maxWidth = pageBodyWidth  + 'px';
      imageObj.style.maxHeight = pageBodyHeight + 'px';
      imageObj.style.maxWidth = pageBodyWidth  + 'px';
      // Adjust styling to make the div centred.
      imageDiv.style.left = '50%'; //String(leftOffset) + 'px';
      imageDiv.style.top = '50%'; //String(topOffset) + 'px';
      imageDiv.style.transform = 'translate(-50%, -50%)';
      // Set the ID of the currently active image and dim the lights.
      currentId = imageId;
      toggleBlackDiv(false);
   };

   var contractImageView = function(imageId, resized) {
      var activeId = document.getElementById(imageId);
      // Abort if you can't get the element
      if (!activeId) {
         return;
      }

      var activeImg = activeId.children[0];
      // Change the div back to its original class
      if (currentPage === 'DESIGN') {
         var standardClass = 'design_div';
      } else {
         var standardClass = 'photo_div photo_div_active';
      }
      // This will make the images size properly in their standard state
      activeImg.style.maxHeight = 'none';
      activeImg.style.maxWidth = 'none';
      activeId.style.transform = 'none';
      activeId.style.left = '0';
      activeId.style.top = '0';
      // Set the divs class to normal mode
      activeId.className = standardClass;
      // Reset images onclick function
      activeImg.onclick = function() {expandImageView(imageId)};

      toggleBlackDiv(resized);
   };

   // Returns true if element is in view, or has been scrolled past, else returns false.
   var elementIntoView = function(eleId) {
      var ele = document.getElementById(eleId);
      var viewHeight = window.innerHeight;
      if (!ele) {
         return;
      }

      var eleRect = ele.getBoundingClientRect();

      if (eleRect.top <= viewHeight) {
         return true;
      } else {
         return false;
      }
   };

   // This function loads images as they come into view
   var lazyLoadContent = function() {
      console.log('Lazy loading');
      if (currentPage === 'PHOTO') {
         var lazyData = photoLazyData;
         var classValue = 'photo_div photo_div_active';
      } else {
         var lazyData = designLazyData;
         var classValue = 'design_div'
      }

      for (divItem in lazyData) {
         var lastChild = document.getElementById(divItem).children.length - 1
         
         if (elementIntoView(divItem) &&
            document.getElementById(divItem).children[lastChild].children[0].src.indexOf('lazy_placeholder.gif') !== -1) {
            for (subItem in lazyData[divItem]) {
               var imageEle = document.getElementById(subItem);
               
               if (!imageEle) {
                  return;
               }

               imageEle.children[0].src = lazyData[divItem][subItem];
               imageEle.className = classValue;
            }
         }
      }
   };


   var onLoadActivities = function() {
      // Hide the noscript div
      var ele = document.getElementById('noscript');
      ele.style.display = 'none';
      // Set globals depending on the page
      if (document.getElementById('DESIGN')) {
         currentPage = 'DESIGN';
         currentBody = 'bdesign';
         // This will be used to lazy load design images
         designLazyData = {
         'rc1':{'dimg07' : '../images/design/5katalyst2.png',
                'dimg08' : '../images/design/5katalyst3.png',
                'dimg09' : '../images/design/5katalyst4.png'},
         'rc2':{'dimg10' : '../images/design/nepos.png',
                'dimg11' : '../images/design/nepos_splash.png'},
         'rc3':{'dimg12' : '../images/design/GSLL1.png',
                'dimg13' : '../images/design/GSLL2.png',
                'dimg14' : '../images/design/GSLR.png'},
         'rc4':{'dimg15' : '../images/design/obsidian_dir.png',
                'dimg16' : '../images/design/obsidian_event.png',
                'dimg17' : '../images/design/EA1.png',
                'dimg18' : '../images/design/EA2.png',
                'dimg19' : '../images/design/EA3.png'}
         };

      } else {
         currentPage = 'PHOTO';
         currentBody = 'bphoto';
         rotatePhotoBanner();

         var containDiv = document.getElementById('container');
         var navButton = document.getElementById('navmobile');
         var topButton = document.getElementById('topbar');
         containDiv.style.boxShadow = '1px 0px 40px black';
         navButton.style.background = 'url("../images/sprites/mobile_button_dark.png") -1px -1px';
         topButton.style.backgroundColor = '#404040';
         // This will be used to lazy load photo images
         photoLazyData = {
            'rc1': null,
            'rc2': null,
            'rc3': null,
            'rc4': null,
            'rc5': null,
            'rc6': null,
            'rc7': null,
            'rc8': null,
            'rc9': null,
            'rc10': null,
            'rc11': null,
            'rc12': null,
            'rc13': null,
            'rc14': null,
            'rc15': null,
            'rc16': null,
         };

         var imgDir = '../images/photography/photo';
         var i = 7;

         for (itemId in photoLazyData) {
            var tempObj = {};
            tempObj['pimg' + paddify(i.toString(), '0', 2, 'r')] = imgDir + paddify(i.toString(), '0', 2, 'r') + '.jpg';
            tempObj['pimg' + paddify((i+1).toString(), '0', 2, 'r')] = imgDir + paddify((i+1).toString(), '0', 2, 'r') + '.jpg';
            tempObj['pimg' + paddify((i+2).toString(), '0', 2, 'r')] = imgDir + paddify((i+2).toString(), '0', 2, 'r') + '.jpg';
            photoLazyData[itemId] = tempObj;
            i += 3;
         }
      }
   };
   // This will collapse any open image on a resize.
   window.addEventListener('resize', function() {contractImageView(currentId, true)});
   // Remove the noscript div
   window.addEventListener('load', onLoadActivities);
   // Lazy load when stuff comes into view
   window.addEventListener('scroll', lazyLoadContent);
});
