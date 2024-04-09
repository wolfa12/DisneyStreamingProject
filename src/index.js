import Shelf from './scripts/components/Shelf.js';
import Banner from './scripts/components/Banner.js'
import { fetchHomePageData } from './scripts/services/api.js';
import './styles.css';
import './disney_logo.png';
import './joy_icon.png';

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function initKeyboardNavigation() {
  let shelves = document.querySelectorAll('.shelf');
  let activeShelfIndex = 0;
  let activeTileIndex = 0;

  function setFocusOnTile() {
    shelves.forEach((shelf, shelfIndex) => {
      let tiles = shelf.querySelectorAll('.tile');
      tiles.forEach((tile, tileIndex) => {
        if (shelfIndex === activeShelfIndex && tileIndex === activeTileIndex) {
          tile.focus();
        }
      });
    });
  }

  setFocusOnTile(); // Initial focus

  document.addEventListener('keydown', (e) => {
    const numShelves = shelves.length;
    const numTiles = shelves[activeShelfIndex].querySelectorAll('.tile').length;

    switch (e.key) {
      case 'ArrowRight':
        activeTileIndex = (activeTileIndex + 1) % numTiles;
        break;
      case 'ArrowLeft':
        activeTileIndex = (activeTileIndex - 1 + numTiles) % numTiles;
        break;
      case 'ArrowDown':
        activeShelfIndex = Math.min(activeShelfIndex + 1, numShelves - 1);
        activeTileIndex = 0; // Reset to first tile in next shelf
        break;
      case 'ArrowUp':
        activeShelfIndex = Math.max(activeShelfIndex - 1, 0);
        activeTileIndex = 0; // Reset to first tile in previous shelf
        break;
    }
    setFocusOnTile();
    
    // Scroll to the active shelf if it's not already visible
    const shelf = shelves[activeShelfIndex];
    if (!isElementInViewport(shelf)) {
      shelf.scrollIntoView({ behavior: 'smooth', block:"center", inline: "nearest"});
    }
  });
}



function start() {
  fetchHomePageData()
    .then(data => {
      console.log('Homepage data: ', data)
      Object.entries(data).forEach(([id, shelfData]) => {
        if (shelfData.title == 'New to Disney+'){
          const banner = new Banner(shelfData)
          document.getElementById('banner-container').appendChild(banner.element);
        }
        const shelf = new Shelf(id, shelfData);
        document.getElementById('shelves-container').appendChild(shelf.element);

      });
      initKeyboardNavigation();
    })
    .catch(error => console.error('Error fetching home page data:', error));
}

start();
