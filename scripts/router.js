// router.js

export const router = {};

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
// function to set the states and related properties of each page
router.setState = function(titleheader, link, className) {
  let state = {'header': titleheader, 'link': link, 'className': className};
  document.body.className = className;
  document.querySelector('header h1').innerText = titleheader;
  history.pushState(state, 'title', link);
}

