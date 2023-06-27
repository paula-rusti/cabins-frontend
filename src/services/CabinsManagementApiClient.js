const url = "http://localhost:8000";


class CabinsManagementApiClient {
  async addCabin(propertyData, accessToken) {
    // issue a post request, body represent the cabin data except for user_id which is sent in a header
    const route = "/cabins/";
    const fetchUrl = url + route;
    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(propertyData), // body data type must match "Content-Type" header
      });
      return await this.unwrapResponseData(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async getCabins(page, size, accessToken, other_filters = {}) {
    let route = "/cabins";
    let fetchUrl = url + route + "?" + this.buildQueryString({page, size, ...other_filters});
    try {
      const fetchResponse = await fetch(fetchUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return await this.unwrapResponseData(fetchResponse);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async uploadPhoto(formData, cabinId, principal) {
    let route = "/photos";
    let fetchUrl = url + route + "?" + this.buildQueryString({cabin_id: cabinId, principal});
    try {
      const fetchResponse = await fetch(fetchUrl, {
        method: "POST",
        body: formData,
      });
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
}

export default new CabinsManagementApiClient();
