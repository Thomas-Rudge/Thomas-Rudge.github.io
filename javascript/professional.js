var moreInfoDict = {
   0:'<div class=moreinfo onclick="lessInfo()">\
        <p class="gen_text moreinfo_text margin0 justify">\
          <span class=centred style="float:right;"><b><u>Freelance</u></b></span>\
          <br><br>\
          Designed and built Nepos, a point of sale and cash management system for start-ups and small businesses. \
          Currently in use by several businesses in the north east of India.\
          <br><br>\
          Created desktop software that creates Swift MT940 cash statements from financial records for a company in Germany.\
          <br><br>\
          Provided Business Analyst services to a finance company for various projects in and around Nagaland.\
          <br><br>\
          Produced various designs and printed materials for a number of companies in the north east of India.\
        </p>\
      </div>',
   1:'<div class=moreinfo onclick="lessInfo()">\
        <p class="gen_text moreinfo_text margin0 justify">\
          <span class=centred style="float:right;"><b><u>Career Break</u></b></span>\
          <br><br>\
          During this time I moved to Nagaland in India to spend time with my wife\'s family, and get to know her place of birth, \
          culture, and customs. As well as exploring her beautiful country I spent a lot of my time acquiring knowledge and \
          learning new skills through online resources.\
        </p>\
      </div>',
   2:'<div class=moreinfo onclick="lessInfo()">\
        <p class="gen_text moreinfo_text margin0 justify">\
          <span class=centred style="float:right;"><b><u>Technical SME<br><span style="font-size: 12px;">Analyst</span></u></b></span>\
          <br><br><br>\
          Senior analyst in the management team of the corporate and investment bank’s reconciliation services utility. \
          Responsible for the proactive optimisation of operational processes and systems. Advisor to senior management on \
          operations, technology, and change. \
          <br><br>\
          Business technical lead in global change activities, including requirement elicitation, solution assessment, operations impact \
          analysis, risk analysis, testing, implementation planning and execution.\
        </p>\
        <ul>\
          <li>\
          5% improvement on TLM system STP automating the work of 4 full time employees.\
          </li>\
          <li>\
          Successful implementation of a major upgrade to the main reconciliation system TLM.\
          </li>\
          <li>\
          Successful implementation of an automated archiving solution.\
          </li>\
          <li>\
          Worked with Sarbanes Oxley to develop a control framework for the reconciliation of a national payment system.\
          </li>\
          <li>\
          Automation and improvement of various manual process.\
          </li>\
        </ul>\
      </div>',
   3:'<div class=moreinfo onclick="lessInfo()">\
        <p class="gen_text moreinfo_text margin0 justify">\
          <span class=centred style="float:right;"><b><u>Business Analyst<br><span style="font-size: 12px;">Corporate Change</span></u></b></span>\
          <br><br><br>\
          Business Analyst within the Global Payments Change Team. Role included: Eliciting and documenting stakeholder and \
          end user requirements; performing impact assessments on business operations and systems; contributing to operational \
          risk assessments and developing/proposing effective controls; designing and managing the execution of User Acceptance \
          Testing; creating implementation plans; and performing post implementation analysis and lessons learnt.\
        </p>\
        <ul>\
          <li>\
          Awarded the "Significant Technology Achievement Award" from the CIO of Technology and COO of Barclays Africa, in \
          recognition of the outstanding contribution to the Kenya Replatforming Programme.\
          </li>\
          <li>\
          Awarded the "Global Payments Award 2009" from the GP Vice Chairman for playing a critical role in the resolution of a BAU system incident.\
          </li>\
          <li>\
          Successful implementation of multiple projects.\
          </li>\
        </ul>\
      </div>',
   4:'<div class=moreinfo onclick="lessInfo()">\
        <p class="gen_text moreinfo_text margin0 justify">\
          <span class=centred style="float:right;"><b><u>TLM System Administrator</u></b></span>\
          <br><br>\
          Monitoring and administration of STL TLM and SSR Swift messaging systems. Duties included static configuration; monitoring via logs \
          and SQL queries to databases; incoming and outgoing message monitoring; account proofing; and incident management and resolution.\
      </div>',
   5:'<div class=moreinfo onclick="lessInfo()">\
        <p class="gen_text moreinfo_text margin0 justify">\
          <span class=centred style="float:right;"><b><u>Account Manager<br><span style="font-size: 12px;">Global Payments</span></u></b></span>\
          <br><br><br>\
          This role involved the daily monitoring, reconciling, and timely reporting of account ledgers and statements. Due to my extensive knowledge \
          of the business processes I was selected to write the business procedures and process flow maps as part of an off-shoring project. I then used \
          those documents to train and test my off-shore colleagues.\
      </div>',
   6:'<div class=moreinfo onclick="lessInfo()">\
        <p class="gen_text moreinfo_text margin0 justify">\
          <span class=centred style="float:right;"><b><u>English Teacher</u></b></span>\
          <br><br>\
          Taught English to class 10 students at the Children\'s Christian School in Kohima, Nagaland. The school provides education to poor and \
          underprivileged children in the north east of India.\
          <br><br>\
      </div>'
};


// The responsive stuff for mobile phone users
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

// This function displays a pop-up window for a particular job
var moreInfo = function(posId) {
   var infoDiv = document.getElementById('moreinfo_cont');
   infoDiv.innerHTML = moreInfoDict[posId];
   infoDiv.style.display = 'block';
   
   setTimeout(function() {
     infoDiv.children[0].style.opacity = 1;
   }, 50);
};

// This function removes any pop-up window in view
var lessInfo = function() {
  var infoDiv = document.getElementById('moreinfo_cont');
  
  if (!infoDiv.children[0]) {
     return;
  }
  
  infoDiv.children[0].style.opacity = 0;
  setTimeout(function() {
     infoDiv.innerHTML = '';
     infoDiv.style.display = 'none';
  }, 500);
};

// This hides the noscript div
var hideNoscript = function() {
   var ele = document.getElementById('noscript');
   ele.style.display = 'none';
};

window.onload = function() {hideNoscript()};
window.onresize = function() {hideOnResize(), lessInfo()};
window.onscroll = function() {lessInfo()};