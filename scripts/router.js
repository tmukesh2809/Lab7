// router.js

export const router = {};

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
router.setState = function(titleheader, link, className) {
  let state = {'header': titleheader, 'link': link, 'className': className};
  history.pushState(state, '', link);

  document.body.className = className;
  document.querySelector('header h1').innerText = titleheader;
}

window.addEventListener('popstate', (event) => {
  let defaultTitle = "Journal Entries check Git"
  if (event.state) {
    document.body.className = event.state['className'];
    document.querySelector('header h1').innerText = event.state['header'];
  }
  else {
    document.body.className = "";
    document.querySelector('header h1').innerText = defaultTitle;
  }
});

document.addEventListener('click', function(event) {
  let clickedItem = event.target.nodeName;
  if (clickedItem == "JOURNAL-ENTRY") {  
  if(document.querySelector('entry-page')){
    document.querySelector('entry-page').remove();
  }                                         // journal entry clicked (go to single entry view)
   let entryPage = document.createElement('entry-page');
    entryPage.entry = event.target.entry;
    document.body.appendChild(entryPage);
    router.setState("Entry "+679094, "./#entry"+69, "single-entry");
  }
  else if (event.target == (document.querySelector('header h1'))) {  // title header clicked (return to main page)
    router.setState("Journal Entries", "./", "");
  }
  else if (event.target == (document.querySelector('header img'))) { // settings button clicked (go to settings)
    router.setState("Settings420", "./#settings", "settings");
  }
});
