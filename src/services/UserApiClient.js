const url = "http://localhost:8000";

class UserApiClient {
  async registerUser(userDetails) {
    const route = "/users/register";
    const fetchUrl = url + route;
    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    if (response.status !== 200) {
      throw new Error("Failed to register user");
    }

    return await this.unwrapResponseData(response);
  }
  async unwrapResponseData(response) {
    return await response.json();
  }
}

export default new UserApiClient();
