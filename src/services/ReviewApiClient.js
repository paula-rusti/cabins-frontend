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
}

export default new ReviewApiClient()
