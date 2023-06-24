const url = "http://localhost:8000";


class BookingApiClient {

  async createNewBooking(access_token, bookingData) {
    const route = "/bookings/add/";
    const fetchUrl = url + route;
    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(bookingData),
      });
      return await this.unwrapResponseData(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async fetchBookingsOfTourist(access_token) {
    const route = "/bookings/tourist/";
    const fetchUrl = url + route;
    const response = await fetch(fetchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch bookings of tourist");
    }

    return await this.unwrapResponseData(response);
  }

  async fetchBookingsOfOwner(access_token) {
    const route = "/bookings/owner/";
    const fetchUrl = url + route;
    const response = await fetch(fetchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch bookings of owner");
    }

    return await this.unwrapResponseData(response);
  }

  async fetchBookingsOfCabin(access_token, cabinId) {
    const route = "/bookings/cabin/" + cabinId;
    const fetchUrl = url + route;
    const response = await fetch(fetchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch bookings of cabin " + cabinId);
    }

    return await this.unwrapResponseData(response);
  }

  async unwrapResponseData(response) {
    return await response.json();
  }
}

export default new BookingApiClient();
