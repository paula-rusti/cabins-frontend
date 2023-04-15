
const url = "http://localhost:8000";

class ApiClient {
  async fetchCabins(params) {
    let route = "/cabins";
    let fetchUrl = url + route + "?" + this.buildQueryString(params);
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
    const route = `/photos/cabin/${id}`;
    let fetchUrl = url + route;
    try {
      const fetchResponse = await fetch(fetchUrl);
      return await this.unwrapResponseData(fetchResponse);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async addCabin(propertyData, userId) {
    // issue a post request, body represent the cabin data except for user_id which is sent in a header
    const route = "/cabins/";
    const fetchUrl = url + route;
    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-id": userId,
        },
        body: JSON.stringify(propertyData), // body data type must match "Content-Type" header
      });
      return await this.unwrapResponseData(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  buildQueryString(params) {
    /*
     * params = {key1: str, key2: arr[str], ..}
     * */
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
