export default class Banner {
    constructor(bannerData) {
        this.title = bannerData.title;
        this.img = bannerData.items[0].image.title_treatment_layer["3.91"].series.default.url;
        this.videoUrl = bannerData.items[0].videoArt.length > 0 ? bannerData.items[0].videoArt[0].mediaMetadata?.urls[0].url : null;
        this.element = this.render();
    }

    render() {
        // Create the banner container
        const bannerElement = document.createElement('div');
        bannerElement.classList.add('banner');

        // Structured this way to workaround the autoplay issue with web browsers
        setTimeout(() => {
          const videoElement = document.createElement('video');
          videoElement.src = this.videoUrl;
          videoElement.muted = true;
          videoElement.autoplay = true;
          videoElement.loop = true;
          setTimeout(() => { 
            bannerElement.appendChild(videoElement);
            }, 0); 
          }, 0);
    
        return bannerElement;
      }
 }
