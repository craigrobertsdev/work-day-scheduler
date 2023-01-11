// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // get all hour container divs
  const hourSections = $('div.container-lg > div');
  // Displays the date at the top of the page
  displayDate();
  setHourColours();
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // add event listeners to each hour container
  for (section of hourSections) {
    $(section).find('button').click(event, handleSave);
  }

  // updates colours then sets timer to change as hour changes
  function setHourColours() {
    const nextHour = dayjs().startOf('h').add(1, 'hour');
    const diff = nextHour.diff(dayjs());
    updateColours();
    setTimeout(() => {
      updateColours();
      diff = 3600000;
      setTimeout(updateColours, diff);
    }, diff);
  }

  function updateColours() {
    // iterate over the hour containers and compare their hour to the current one. set class appropriately
    for (section of hourSections) {
      let sectionHour = parseInt($(section).attr('id').split('-')[1]);
      let currentHour = dayjs().hour();

      if (sectionHour === currentHour) {
        $(section).addClass('present');
      } else if (sectionHour < currentHour) {
        $(section).addClass('past');
      } else {
        $(section).addClass('future');
      }
    }
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
});

// displays the current date in the header section
// this function updates the date only when the day changes. Done in this way to save on having to process the entire function every second
function displayDate() {
  const startOfTomorrow = dayjs().startOf('d').add(24, 'hour');

  // determine how long until tomorrow
  let diff = startOfTomorrow.diff(dayjs());

  // display current date
  displayDay();

  // set timeout to run every 24 hours from then on
  setTimeout(function () {
    displayDay();
    // number of milliseconds in a day
    let diff = 86400000;
    setTimeout(displayDay, diff);
  }, diff);
}

function displayDay() {
  const suffix = ordinalSuffixOf(dayjs().date());
  const currentDate = dayjs().format('dddd, MMMM D');
  $('#currentDay').text(currentDate + '' + suffix);
}

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

function handleSave(event) {
  event.preventDefault();
  const textarea = $(this).siblings('textarea')[0];
  const text = $(textarea).val();
  const id = $(this).parent('div.time-block').attr('id');

  save(id, text);
}

function save(id, text) {
  console.log('calling save' + id + ' ' + text);
  localStorage.setItem(id, text);
}
