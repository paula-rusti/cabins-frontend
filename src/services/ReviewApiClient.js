let url = "http://localhost:8000/"

class ReviewApiClient {
  async leaveReview(review, accessToken) {
    let response = await fetch(url + "reviews/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken
      },
      body: JSON.stringify(review)
    })
    if (response.status !== 201) {
      throw new Error("Failed to leave review")
    }
    return await response.json()
  }

  async getReviews({user_id, cabin_ids, page = 1, size = 100}) {

    let params = {
      user_id: user_id,
      cabin_ids: cabin_ids,
      page: page,
      size: size
    }

    if (user_id == null) {
      delete params.user_id
    }
    if (cabin_ids == null) {
      delete params.cabin_ids
    }

    console.log("params: ", params)

    let response = await fetch(url + "reviews/?" + this.buildQueryString(params), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    return await response.json()
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
}

export default new ReviewApiClient()
