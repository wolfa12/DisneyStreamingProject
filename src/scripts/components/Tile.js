export default class Tile {
  constructor(tileData) {
      const title = tileData?.text?.title.full; 
      this.title = title ? Object.values(title)[0].default.content : '';

      const img = tileData?.image?.tile['1.78']; 
      this.tileImgUrl = img ? Object.values(img)[0].default?.url : undefined;

      this.element = this.render();
      this.element.tabIndex = 0;  
  }

render() {
  const tileElement = document.createElement('div');
  tileElement.classList.add('tile');

  // Check if the tile has an image URL
  if (this.tileImgUrl) {
    const imageElement = document.createElement('img');
    imageElement.src = this.tileImgUrl;

    // Check if the image loads successfully
    imageElement.onload = () => {
      tileElement.appendChild(imageElement);
    };

    // If the image fails to load, show fallback content
    imageElement.onerror = () => {
      tileElement.classList.add('fallback');
      tileElement.textContent = this.title; // Use the stored title as the fallback content
    };
  } else {
    // Fallback for when there is no image URL
    tileElement.classList.add('fallback');
    tileElement.textContent = this.title; // Use the stored title as the fallback content
  }

  return tileElement;
}
}
