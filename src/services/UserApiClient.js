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
  async loginUser(email, password, role) {
    const route = "/users/login";
    const fetchUrl = url + route;
    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password, role}),
    });

    if (response.status !== 200) {
      throw new Error("Failed to login user");
    }

    return await this.unwrapResponseData(response);
  }
  async fetchUserDetails(access_token) {
    const route = "/users/me";
    const fetchUrl = url + route;
    const response = await fetch(fetchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch user details");
    }

    return await this.unwrapResponseData(response);
  }
  async unwrapResponseData(response) {
    return await response.json();
  }
}

export default new UserApiClient();
