const useHotelAPI = () => {
  const URL_API = "https://hotels-api.academlo.tech";
  const token = sessionStorage.getItem("token");

  const getCities = async () => {
    try {
      const response = await fetch(`${URL_API}/cities`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const getHotels = async () => {
    try {
      const response = await fetch(`${URL_API}/hotels`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const getHotel = async (id) => {
    try {
      const response = await fetch(`${URL_API}/hotels/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching hotel:", error);
    }
  };

  const registerUser = async ({
    email,
    firstName,
    gender,
    lastName,
    password,
  }) => {
    try {
      const response = await fetch(`${URL_API}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, firstName, gender, lastName, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      const response = await fetch(`${URL_API}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to login user");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error login user:", error);
      throw error;
    }
  };

  const createBooking = async ({ checkIn, checkOut, hotelId }) => {
    try {
      const response = await fetch(`${URL_API}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ checkIn, checkOut, hotelId }),
      });

      if (!response.ok) {
        throw new Error("Failed creating booking");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  };

  const getBookings = async () => {
    try {
      const response = await fetch(`${URL_API}/bookings`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Error fetching bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const deleteBooking = async (id) => {
    try {
      const response = await fetch(`${URL_API}/bookings/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Error delete booking");
      }
    } catch (error) {
      console.error("Error delete booking:", error);
    }
  };

  const createReview = async ({ rating, comment, hotelId }) => {
    try {
      const response = await fetch(`${URL_API}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, comment, hotelId }),
      });

      if (!response.ok) {
        throw new Error("Failed creating review");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating review:", error);
      throw error;
    }
  };

  return {
    getCities,
    getHotels,
    getHotel,
    registerUser,
    loginUser,
    createBooking,
    getBookings,
    deleteBooking,
    createReview
  };
};

export default useHotelAPI;
