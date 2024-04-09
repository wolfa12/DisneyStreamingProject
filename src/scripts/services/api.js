export function fetchHomePageData() {
  return new Promise((resolve, reject) => {
    let resp = {};
    fetch('https://cd-static.bamgrid.com/dp-117731241344/home.json')
      .then(response => response.json())
      .then(homeData => {
        const promises = homeData.data.StandardCollection.containers.map(set => {
          if (set.set?.setId) {
            resp[set.set.setId] = {
              'title': set.set.text.title.full.set.default.content,
              'items': set.set.items
            };
            return Promise.resolve();
          } else {
            return fetch(`https://cd-static.bamgrid.com/dp-117731241344/sets/${set.set.refId}.json`)
              .then(response => response.json())
              .then(refSetData => {
                resp[set.set.refId] = {
                  'title': set.set.text.title.full.set.default.content,
                  'items': Object.values(refSetData.data)[0]?.items
                };
              })
              .catch(error => {
                console.error(`Error fetching data for set ${container.set.refId}:`, error);
                return Promise.reject(error);
              });
          }
        });

        Promise.all(promises)
          .then(() => resolve(resp))
          .catch(error => reject(error));
      })
      .catch(error => {
        console.error('Error fetching home data:', error);
        reject(error);
      });
  });
}
