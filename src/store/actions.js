import { API } from "../components/services/api";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const USERS_FOR_VALIDATION = "USERS_FOR_VALIDATION";
export const PRODUCTS = "PRODUCTS";
export const USER_UPDATED = "USER_UPDATED";
export const COUNT_UPDATED = "COUNT_UPDATED";
export const ORDER_COMPLETED = "ORDER_COMPLETED";
export const DELETE_ACCOUNT = "DELETE_ACCOUNT";

const actionCreator = (type, payload) => {
  if (payload) {
    return { type, payload };
  } else {
    return { type };
  }
};

export const addUserAction = (user) => actionCreator(USER_LOGIN, user);
export const updateStatusWhenLogoutAction = () =>
  actionCreator(USER_LOGOUT, false);
export const getUsersForValidationAction = (users) =>
  actionCreator(USERS_FOR_VALIDATION, users);
export const getProductsAction = (products) =>
  actionCreator(PRODUCTS, products);
export const updateShoppingCartAction = (user) =>
  actionCreator(USER_UPDATED, user);
export const updateCountAction = (id, count) =>
  actionCreator(COUNT_UPDATED, { id, count });
export const orderCompletedAction = (user) =>
  actionCreator(ORDER_COMPLETED, user);
export const deleteAccountAction = () => actionCreator(DELETE_ACCOUNT, false);

export const getUserThunk = (id) => {
  return async (dispatch, getState) => {
    const res = await API.getUser(id);
    await API.updateStatus(res);
    dispatch(addUserAction(res));
  };
};

export const getUsersForValidationThunk = (user) => {
  return async (dispatch, getState) => {
    await API.getUsers().then((res) =>
      dispatch(getUsersForValidationAction(res))
    );
  };
};

export const registrationThunk = (user) => {
  return async (dispatch, getState) => {
    await API.registration(user).then((res) => dispatch(addUserAction(res)));
  };
};

export const updateStatusWhenLogoutThunk = (user) => {
  return async (dispatch, getState) => {
    await API.updateStatusWhenLogout(user);
    dispatch(updateStatusWhenLogoutAction());
  };
};

export const getProducts = () => {
  return async (dispatch, getState) => {
    await API.getProducts().then((res) => dispatch(getProductsAction(res)));
  };
};

export const updateShoppingCartThunk = (user, product) => {
  return async (dispatch, getState) => {
    await API.updateProducts(user, product).then((res) =>
      dispatch(updateShoppingCartAction(res))
    );
  };
};

export const deleteFromShoppingCartThunk = (user, product) => {
  return async (dispatch, getState) => {
    await API.deleteProduct(user, product).then((res) =>
      dispatch(updateShoppingCartAction(res))
    );
  };
};

export const completeOrderThunk = (user) => {
  return async (dispatch, getState) => {
    API.completeOrder(user).then((res) => dispatch(orderCompletedAction(res)));
  };
};

export const deleteAccountThunk = (user) => {
  return async (dispatch, getState) => {
    await API.deleteAccount(user);
    dispatch(deleteAccountAction());
  };
};
