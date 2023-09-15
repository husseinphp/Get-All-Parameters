document.addEventListener('DOMContentLoaded', function() {
  let scrapeEmails = document.getElementById('scrapeEmails');
  let list = document.getElementById('parameterslist');

  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let emails = request.emails;

    if (emails == null || emails.length == 0) {
      let li = document.createElement('li');
      li.innerHTML = " NO Result 📩";
      list.appendChild(li);
    } else {
      emails.forEach((email) => {
        let button = document.createElement('button');
        button.innerText = email;
        button.addEventListener("click", () => {
          // Get the current tab's URL
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0] && tabs[0].url) {
              let currentUrl = tabs[0].url;
              
              // Add the parameter to the current URL
              let updatedUrl = currentUrl + '?' + encodeURIComponent(email) + '=batman"/>';

              // Open the updated URL in a new tab
              chrome.tabs.create({ url: updatedUrl, active: true });
            }
          });
        });

        let li = document.createElement('li');
        li.appendChild(button);
        list.appendChild(li);
      });
    }
  });

  scrapeEmails.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: scrapeEmailsFromPage,
    });
  });

  function scrapeEmailsFromPage() {
    const emailregEx = /<input[^>]*name=['"]([^'"]+)['"][^>]*>/g;
    const inputHtml = document.body.innerHTML;
    const matchArray = [...inputHtml.matchAll(emailregEx)];
    const emails = matchArray.map(match => match[1]);
    chrome.runtime.sendMessage({ emails });
  }

  // Create a new button to open all emails in new tabs
  let openAllButton = document.createElement('button');
  openAllButton.innerText = 'Open All Parameters 💣';
  openAllButton.style.color = '#e3e3e3';
  openAllButton.style.background = '#63c991';
  
  openAllButton.addEventListener('click', () => {
    let emailButtons = document.querySelectorAll('#parameterslist button');
    emailButtons.forEach((button) => {
      let email = button.innerText;
      // Get the current tab's URL
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].url) {
          let currentUrl = tabs[0].url;
          // Add the parameter to the current URL
          let updatedUrl = currentUrl + '?' + encodeURIComponent(email) + '=batman"/>';
          // Open the updated URL in a new tab
          chrome.tabs.create({ url: updatedUrl, active: true });
        }
      });
    });
  });

  // Append the new button to the body
  document.body.appendChild(openAllButton);


    // Create a new button to visit @0xHussein on Twitter
    let twitterButton = document.createElement('button');
    twitterButton.className = 'twitter-button';
    twitterButton.className = 'twitter-button';
    twitterButton.innerText = '@0xHussein 🐦';
    twitterButton.style.color = 'rgb(255, 255, 255)';
    twitterButton.style.background = 'rgb(58, 163, 246)';
    twitterButton.style.padding = '1px';
    twitterButton.style.display = 'block';
    twitterButton.style.textAlign = 'center';
    twitterButton.style.margin = '0 auto';
    twitterButton.style.marginTop = '16px';
    twitterButton.style.borderRadius = '7px';
    
    twitterButton.onclick = function() {
      window.open('https://twitter.com/0xHussein', '_blank');
    };
  
    // Append the Twitter button to the body or any other suitable container
    document.body.appendChild(twitterButton);



});
