$(function () {
  // get all hour container divs
  const hourSections = $('div.container-lg > div');

  getLocalStorage();
  // Displays the date at the top of the page
  displayDate();
  setHourColours();

  // add event listeners to each hour container
  for (section of hourSections) {
    $(section).find('button').click(event, handleSave);
  }

  // updates colours then sets timer to change as hour changes
  function setHourColours() {
    // works out how long until the hour is over
    const nextHour = dayjs().startOf('h').add(1, 'hour');
    const diff = nextHour.diff(dayjs());
    updateColours();
    // start a countdown until the hour ends. when it does, update the colours and reset the countdown for 1 hour
    setTimeout(() => {
      updateColours();
      // this is the number of milliseconds in an hour
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

  // loads stored tasks from localStorage
  function getLocalStorage() {
    for (section of hourSections) {
      let val = localStorage.getItem($(section).attr('id'));
      if (val) {
        // set the hourSection text content based on anything found in local storage
        $(section).children('textarea').val(val);
      }
    }
  }

  // displays the current date in the header section
  // this function updates the date only when the day changes. Done in this way to save on having to process the entire function every second
  function displayDate() {
    const startOfTomorrow = dayjs().startOf('d').add(24, 'hour');

    // determine how long until tomorrow
    let diff = startOfTomorrow.diff(dayjs());

    // display current date to header
    displayDay();

    // set timeout to run every 24 hours from then on
    setTimeout(function () {
      displayDay();
      // number of milliseconds in a day
      let diff = 86400000;
      setTimeout(displayDay, diff);
    }, diff);
  }

  // appends the current date to the header section
  function displayDay() {
    const suffix = ordinalSuffixOf(dayjs().date());
    const currentDate = dayjs().format('dddd, MMMM D');
    $('#currentDay').text(currentDate + '' + suffix);
  }

  // determines which ordinal suffix to return based on the date provided
  function ordinalSuffixOf(i) {
    // i determines the last digit of the number
    const j = i % 10,
      // k deals with the numbers 11, 12 and 13 as they don't follow the ordinal conventions like all other numbers
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

  // called whenever an hour section is saved
  function handleSave(event) {
    event.preventDefault();
    // gets the text area associated with the save button
    const textarea = $(this).siblings('textarea')[0];
    const text = $(textarea).val();
    const id = $(this).parent('div.time-block').attr('id');

    save(id, text);
  }

  // saves the text and hour section id to local storage
  function save(id, text) {
    localStorage.setItem(id, text);
  }
});
