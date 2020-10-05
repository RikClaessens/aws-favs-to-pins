// ------- Main Driver Begins ---------

/*
 * Check regularly until the required div appears on the page
 */
var checkExist = setInterval(function () {
  if (document.querySelector('div[data-testid="favorites-container"]')) {
    const pins = createPinsFromFavs();
    addPinsToHeader(pins);
    clearInterval(checkExist);
  }
}, 100);
// ------- Main Driver Ends -----------

/*
 * Given an array of pins, appends each of them to nav header
 */
function addPinsToHeader(pins) {
  for (pin of pins) {
    const header = document.getElementById("awsc-nav-header").firstChild;
    header.append(pin);
  }
}

/*
 * Iterate over favorites list elements
 * and create divs for the pins. Each div contains an anchor
 * that navigates to respective AWS service.
 * Only adds first 7 fav services as pins
 */
function createPinsFromFavs() {
  const favs = getAllFavs();
  let pins = [];

  for (li of favs) {
    const favService = li.firstChild;
    const serviceName = favService.childNodes[1].textContent;
    favService.removeChild(favService.childNodes[1]);
    favService.removeAttribute("title");

    let pin = document.createElement("div");
    pin.className = "pin-style";

    const tooltip = document.createElement("span");
    tooltip.className = "tooltip";
    tooltip.append(document.createTextNode(serviceName));

    pin.append(favService);
    pin.append(tooltip);

    pins.push(pin);
  }
  return pins;
}

/*
 * Clones favorite services from the menu
 * Returns an array of li elements
 */
function getAllFavs() {
  const favContainer = document
    .querySelector('div[data-testid="favorites-container"]')
    .firstChild.cloneNode(true);
  return favContainer.getElementsByTagName("li");
}
