const url = "http://localhost:8000";

class ApiClient {
  async fetchCabins(params) {
    let route = "/cabins";
    let fetchUrl = url + route + "?" + this.buildQueryString(params);
    console.log(`request to ${fetchUrl}`)
    try {
      const fetchResponse = await fetch(fetchUrl);
      return await this.unwrapResponseData(fetchResponse);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async fetchCabinById(id) {
    const route = "/cabins/" + id;
    let fetchUrl = url + route;
    try {
      const fetchResponse = await fetch(fetchUrl);
      return await this.unwrapResponseData(fetchResponse);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async fetchPhotosOfCabin(id) {
    const route = `/photos?cabin_id=${id}`;
    let fetchUrl = url + route;
    try {
      const fetchResponse = await fetch(fetchUrl);
      let response = await fetchResponse.json();
      let photosUrls = []
      for (let photo of response) {
        photosUrls.push(`${url}/photos/${photo.id}`)
      }

      return photosUrls;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async countCabins() {
    let route = "/cabins/count";
    let fetchUrl = url + route;
    try {
      const fetchResponse = await fetch(fetchUrl);
      return await this.unwrapResponseData(fetchResponse);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  buildQueryString(params) {
    /*
     * params = {key1: str, key2: arr[str], ..}
     * */
    for (let key in params) {
      if (params[key]===null) {
        delete params[key]
      }
    }

    var queryString = Object.entries(params)
      .flatMap(([key, value]) => {
        if (Array.isArray(value) && value !== []) {
          let ret_val = [];
          value.forEach((value) => {
            ret_val.push(
              encodeURIComponent(key) + "=" + encodeURIComponent(value)
            );
          });
          return ret_val;
        }
        if (value === true) {
          return encodeURIComponent(key);
        }
        return encodeURIComponent(key) + "=" + encodeURIComponent(value);
      })
      .join("&");
    return queryString;
  }

  async unwrapResponseData(response) {
    return await response.json();
  }

  getPhotoUrl(id) {
    let fetchUrl = url + `/photos/${id}`;
    return fetchUrl;
  }
}

export default new ApiClient();
