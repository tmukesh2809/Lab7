// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

 //Make sure you register your service worker here too

 if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
} 

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
    });
});
// the function is used to implement the back click using the popstate
window.addEventListener('popstate', (event) => {
  let defaultTitle = "Journal Entries";
  let defaultClassName = "";
   // if clicking the back arrow key does not give any state, meaning we cannot go any further back, we use the default entry title and default class
  if (!event.state) {
    document.body.className = defaultClassName;
    document.querySelector('header h1').innerText = defaultTitle;
  }
   //else when we do get a state by clicking the back arrow key we change the class and header accordingly
  else {
    document.body.className = event.state['className'];
    document.querySelector('header h1').innerText = event.state['header'];
  }
});


//This event listener is used to determine what element has been clicked and performs tasks accordingly
document.addEventListener('click', function(event) {
  // if we click on one of the journal entries
  if(event.target.nodeName == "JOURNAL-ENTRY") {  
    // if there is an existing journal entry from before in the single entry view, we delete that entry 
    if(document.querySelector('entry-page')){
      document.querySelector('entry-page').remove();
    }
   //we set the title, urllink and classtype of the new entry, we then add the new entry to the single view
   let counter = 1;
   let jEntry = event.target;
   while(jEntry.previousSibling != null){
     jEntry = jEntry.previousSibling;
   }
   while(jEntry != event.target) {
    counter++;
    jEntry = jEntry.nextSibling;
  }
    router.setState("Entry "+ counter, "./#entry"+counter, "single-entry");
    let entryPage = document.createElement('entry-page');
    entryPage.entry = event.target.entry;
    document.body.appendChild(entryPage);
  }
  // if the element we click on is the title bar, then we go back to home page
  if (event.target == (document.querySelector('header h1'))) {  
    router.setState("Journal Entries", "./", "");
  }
  //if the element we click is the settings icon, then we open the setting tab
  if (event.target == (document.querySelector('header img'))) { 
    router.setState("Settings", "./#settings", "settings");
  }
});

