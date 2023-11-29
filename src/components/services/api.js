export const API = {
  getUsers: async () => {
    return await fetch(
      "https://6442d57333997d3ef91aa550.mockapi.io/api/mindboard/users"
    ).then((res) => res.json());
  },

  getUser: async (id) => {
    return await fetch(
      "https://6442d57333997d3ef91aa550.mockapi.io/api/mindboard/users/" + id
    ).then((res) => res.json());
  },

  registration: async (newUser) => {
    const resPost = await fetch(
      "https://6442d57333997d3ef91aa550.mockapi.io/api/mindboard/users",
      {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify(newUser),
      }
    );
    const resGet = await resPost.json();
    localStorage.setItem("user", JSON.stringify(resGet.id));

    return resGet;
  },

  updateStatus: (user) => {
    return fetch(
      "https://6442d57333997d3ef91aa550.mockapi.io/api/mindboard/users/" +
        user.id
    )
      .then((res) => res.json())
      .then((data) => {
        data.status = true;
        return fetch(
          "https://6442d57333997d3ef91aa550.mockapi.io/api/mindboard/users/" +
            data.id,
          {
            method: "PUT",
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify(data),
          }
        );
      });
  },

  getProducts: async () => {
    try {
      const response = await fetch(
        "https://6442d57333997d3ef91aa550.mockapi.io/api/mindboard/products"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const acc = data.reduce((acc, el) => {
        if (acc[el.category]) {
          acc[el.category].push(el);
        } else {
          acc[el.category] = [];
          acc[el.category].push(el);
        }
        return acc;
      }, {});
      return acc;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  updateStatusWhenLogout: async (user) => {
    await fetch(
      "https://6442d57333997d3ef91aa550.mockapi.io/api/mindboard/users/" +
        user.id
    )
      .then((res) => res.json())
      .then((data) => {
        data.status = false;
        return fetch(
          "https://6442d57333997d3ef91aa550.mockapi.io/api/mindboard/users/" +
            data.id,
          {
            method: "PUT",
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify(data),
          }
        );
      });
  },

  updateProducts: async (user, product) => {
    const existingItem = user.shoppingCart.find(
      (item) => item.id === product.id
    );
    if (existingItem) {
      existingItem.count++;
    } else {
      product.count = 1;
      user.shoppingCart.push(product);
    }

    const res = fetch(
      `https://6442d57333997d3ef91aa550.mockapi.io/api/mindboard/users/${user.id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify(user),
      }
    ).then((res) => res.json());

    return res;
  },

  deleteProduct: async (user, product) => {
    const updatedCart = user.shoppingCart.filter(
      (item) => item.id !== product.id
    );

    const response = await fetch(
      `https://6442d57333997d3ef91aa550.mockapi.io/api/mindboard/users/${user.id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          ...user,
          shoppingCart: updatedCart,
        }),
      }
    ).then((res) => res.json());

    return response;
  },

  completeOrder: async (user) => {
    user.shoppingCart.forEach((el) => {
      const existingItem = user.orders.find((item) => item.id === el.id);

      if (existingItem) {
        existingItem.count += el.count;
      } else {
        user.orders.push(el);
      }
    });

    user.shoppingCart = [];
    const response = await fetch(
      "https://6442d57333997d3ef91aa550.mockapi.io/api/mindboard/users/" +
        user.id,
      {
        method: "PUT",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify(user),
      }
    );

    const res = response.json();

    return res;
  },

  deleteAccount: async (user) => {
    await fetch(
      "https://6442d57333997d3ef91aa550.mockapi.io/api/mindboard/users/" +
        user.id,
      {
        method: "DELETE",
      }
    );
  },
};
