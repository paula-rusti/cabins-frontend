const url = "http://localhost:8000";


class BookingApiClient {
  async fetchBookings(access_token) {
    const route = "/bookings";
    const fetchUrl = url + route;
    const response = await fetch(fetchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch bookings");
    }

    return await this.unwrapResponseData(response);
  }

  async unwrapResponseData(response) {
    return await response.json();
  }
}

export default new BookingApiClient();
