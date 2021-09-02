import api from './api';

export const login = (gsm_number) => {
    return api.post('/auth/request_sms', { gsm_number: gsm_number });
};

export const authenticateSms = (gsm_number, sms_code) => {
    return api.post('/auth/authenticate_sms', { gsm_number: gsm_number, sms_code: sms_code });
};

export const register = (data) => {
    return api.post('/auth/register', data);
};

export const checkSocialAccount = (token, type) => {
    return api.post('/auth/check_social', { token: token, type: type });
};

export const getUser = () => {
    return api.get('/user');
};

export const getUserPreferences = () => {
    return api.get('/user/preferences');
};

export const setUserPreferences = (data) => {
    return api.post('/user/preferences', data);
};

export const updateUserSettings = (data) => {
    return api.post('/user', data);
};

export const getNotifications = () => {
    return api.get('/notifications');
};

export const deleteNotification = (id) => {
    return api.post('/notifications/delete', { id: id });
};

export const markAsReadNotification = () => {
    return api.get('/notifications/mark_as_read');
};

export const getPurchased = () => {
    return api.get('/user/purchased');
};

//Favorite List
export const getFavoritesList = () => {
    return api.get('/user/favoritelists');
};

export const addFavoritesList = (type, title) => {
    return api.post('/user/favoritelists', { type, title });
};

export const renameFavoritesList = (list_uuid, title) => {
    return api.post('/user/favoritelists/rename', { list_uuid, title });
};

export const removeFavoriteList = (uuid) => {
    return api.delete('/user/favoritelists', { params: { uuid } });
};
//** */

//Favorites
export const getFavorites = (uuid) => {
    return api.get(`/user/favoritelists/${uuid}`);
};

export const addFavorites = (list_uuid, type, slug) => {
    return api.post('/user/favorite', { list_uuid, type, slug });
};

export const removeFavorites = (list_uuid, type, slug) => {
    return api.delete('/user/favorite', { data: { list_uuid, type, slug } });
};
//** */

//Cart
export const addCart = (recipe_slug, ingredients) => {
    return api.post(`/cart`, { recipe_slug, ingredients });
};

export const getCart = () => {
    return api.get(`/cart`);
};

export const deleteItem = (cart_uuid) => {
    return api.post(`/cart/delete`, { cart_uuid });
};

export const deleteRecipeFromCart = (recipe_slug) => {
    return api.post(`/cart/delete`, { recipe_slug });
};

export const getJWT = () => {
    return api.get(`/istegelsin/create_jwt`);
};
//** */

export const savePushToken = (token) => {
    return api.post(`/save-pushtoken`, { token });
};
