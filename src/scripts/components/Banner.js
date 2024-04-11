class Banner {
  constructor(bannerData) {
      this.videoUrl = bannerData.items[0].videoArt.length > 0 ? bannerData.items[0].videoArt[0].mediaMetadata?.urls[0].url : null;
      
      this.render = () => {
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
      };

      this.element = this.render();
  }
}

export default Banner;
