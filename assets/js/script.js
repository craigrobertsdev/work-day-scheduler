// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  
  // TODO: Add code to display the current date in the header of the page.
  displayDate();
  //flag to change diff to 24 hours if the day has changed when the call to setInterval is made

  // this function updates the date only when the day changes. Done in this way to save on having to process the entire function every second
  function displayDate() {
    const startOfTomorrow = dayjs().startOf('d').add(24, 'hour');

    // determine how long until tomorrow
    let diff = startOfTomorrow.diff(dayjs());
    let currentDate = dayjs().format('dddd, MMMM D');

    // get ordinal suffix for date
    let suffix = ordinalSuffixOf(dayjs().date());
    // display current date
    $('#currentDay').text(currentDate + '' + suffix);

    // update date and set timeout to run every 24 hours from then on
    setTimeout(function timer() {
      suffix = ordinalSuffixOf(dayjs().date());
      currentDate = dayjs().format('dddd, MMMM D');
      $('#currentDay').text(currentDate + '' + suffix);
      diff = 86400000;
      setTimeout(timer, diff);
    }, diff);
  }
});

// determines which ordinal suffix to return based on the date provided
function ordinalSuffixOf(i) {
  const j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return 'st';
  }
  if (j == 2 && k != 12) {
    return 'nd';
  }
  if (j == 3 && k != 13) {
    return 'rd';
  }
  return 'th';
}
