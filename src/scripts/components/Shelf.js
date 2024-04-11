import Tile from './Tile';

class Shelf {
  constructor(id, shelfData) {
    this.id = id;
    this.title = shelfData.title;
    this.items = shelfData.items;

    this.render = () => {
      // Create shelf element
      const shelfElement = document.createElement('div');
      shelfElement.classList.add('shelf');

      // Render shelf title
      const titleElement = document.createElement('h2');
      titleElement.textContent = this.title;
      shelfElement.appendChild(titleElement);

      // Create container for tiles
      const tilesContainer = document.createElement('div');
      tilesContainer.classList.add('tiles-container');
      shelfElement.appendChild(tilesContainer);

      // Render tiles
      this.items.forEach((itemData) => {
        const tile = new Tile(itemData);
        tilesContainer.appendChild(tile.element);
      });

      return shelfElement;
    };
    
    this.element = this.render();
  }
}

export default Shelf;
