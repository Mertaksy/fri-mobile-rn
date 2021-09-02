import createDataContext from './createDataContext';
import api from '../api/api';
import { AsyncStorage } from 'react-native';
import * as UserAPI from '../api/user';
import * as ContentAPI from '../api/content';
import ApiErrors from '../api/errors';

let initialState = {
    isApiRequesting: false,
    hideIntro: false,
    userData: null,
    userToken: null,
    userPreferences: null,
    userAvailablePreferences: null,
    userCart: [],
    popularSearches: [],
    favoriteLists: [],
    favoriteSlugs: [],
    dynamicTags: [],
    successFailureModalVisibility: false,
    successFailureModalType: 'success',
    shouldRefreshMainPage: false,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_REFRESH_MAIN_PAGE':
            return { ...state, shouldRefreshMainPage: action.payload };
        case 'START_API_REQUESTING':
            return { ...state, isApiRequesting: action.payload };
        case 'STOP_API_REQUESTING':
            return { ...state, isApiRequesting: false };
        case 'SET_HIDE_INTRO':
            return { ...state, hideIntro: action.payload };
        case 'SET_USER_DATA':
            return { ...state, userData: action.payload };
        case 'UNSET_USER_DATA':
            return { ...state, userData: null, userCart: [] };
        case 'SET_USER_TOKEN':
            return { ...state, userToken: action.payload };
        case 'SET_USER_CART':
            return { ...state, userCart: action.payload };
        case 'SET_USER_FAVORITE_LISTS':
            return { ...state, favoriteLists: action.payload };
        case 'SET_USER_FAVORITE_SLUGS':
            return { ...state, favoriteSlugs: action.payload };
        case 'UPDATE_USER_FAVORITE_SLUGS':
            let favoriteSlugs = [...state.favoriteSlugs];
            if (favoriteSlugs.includes(action.payload)) {
                favoriteSlugs = favoriteSlugs.filter((slug) => slug !== action.payload);
            } else {
                favoriteSlugs.push(action.payload);
            }
            return { ...state, favoriteSlugs };
        case 'SET_DYNAMIC_TAGS':
            return { ...state, dynamicTags: action.payload };
        case 'UNSET_USER_TOKEN':
            return { ...state, userToken: null };
        case 'SET_POPULAR_SEARCHES':
            return { ...state, popularSearches: action.payload };
        case 'SET_USER_PREFERENCES':
            return { ...state, userPreferences: action.payload };
        case 'SET_USER_AVAILABLE_PREFERENCES':
            return { ...state, userAvailablePreferences: action.payload };
        case 'SET_SUCCESS_FAILURE_MODAL_VISIBILITY':
            return { ...state, successFailureModalVisibility: !state.successFailureModalVisibility };
        case 'SET_SUCCESS_FAILURE_MODAL_TYPE':
            return { ...state, successFailureModalType: action.payload };
        default:
            return state;
    }
};

const setSuccessFailureModalVisibility = (dispatch) => async () => {
    dispatch({
        type: 'SET_SUCCESS_FAILURE_MODAL_VISIBILITY',
    });
};

const setShouldRefreshMainPage = (dispatch) => async (data) => {
    dispatch({
        type: 'SET_REFRESH_MAIN_PAGE',
        payload: data,
    });
};

const setSuccessFailureModalType = (dispatch) => async (data) => {
    dispatch({
        type: 'SET_SUCCESS_FAILURE_MODAL_TYPE',
        payload: data,
    });
};

const setHideIntro = (dispatch) => async (data) => {
    await AsyncStorage.setItem('hideIntro', data.toString());

    dispatch({
        type: 'SET_HIDE_INTRO',
        payload: data,
    });
};

const setUserData = (dispatch) => async (data) => {
    await AsyncStorage.setItem('userData', JSON.stringify(data));

    dispatch({
        type: 'SET_USER_DATA',
        payload: data,
    });
};

const unsetUserData = (dispatch) => async () => {
    await AsyncStorage.removeItem('userData');
    dispatch({
        type: 'UNSET_USER_DATA',
    });
};

const setUserToken = (dispatch) => async (data) => {
    await AsyncStorage.setItem('userToken', data);
    api.defaults.headers.common['Authorization'] = 'Bearer ' + data;
    dispatch({
        type: 'SET_USER_TOKEN',
        payload: data,
    });
};

const unsetUserToken = (dispatch) => async () => {
    await AsyncStorage.removeItem('userToken');
    api.defaults.headers.common['Authorization'] = '';
    dispatch({
        type: 'UNSET_USER_TOKEN',
    });
};

const setUserPreferences = (dispatch) => async (value) => {
    dispatch({
        type: 'SET_USER_PREFERENCES',
        payload: value,
    });
};

const setUserCart = (dispatch) => async (data) => {
    dispatch({
        type: 'SET_USER_CART',
        payload: data,
    });
};

const setPopularSearches = (dispatch) => async (data) => {
    dispatch({
        type: 'SET_POPULAR_SEARCHES',
        payload: data,
    });
};

const setUserAvailablePreferences = (dispatch) => async (value) => {
    dispatch({
        type: 'SET_USER_AVAILABLE_PREFERENCES',
        payload: value,
    });
};

const setApiRequest = (dispatch) => async (value) => {
    dispatch({
        type: 'START_API_REQUESTING',
        payload: value,
    });
};

const updateFavoriteSlugs = (dispatch) => async (slug) => {
    dispatch({
        type: 'UPDATE_USER_FAVORITE_SLUGS',
        payload: slug,
    });
};

const syncFavoriteLists = (dispatch) => async () => {
    try {
        const response = await UserAPI.getFavoritesList();
        const data = response.data;
        if (data.success) {
            dispatch({
                type: 'SET_USER_FAVORITE_LISTS',
                payload: data.favoritelist,
            });
            let favoriteSlugs = [];
            data.favoritelist.map((item) => {
                item.favorites.map((favorite) => {
                    favoriteSlugs.push(favorite.favorite_data.slug);
                });
            });
            dispatch({
                type: 'SET_USER_FAVORITE_SLUGS',
                payload: favoriteSlugs,
            });
        }
    } catch (e) {
        const responseParsed = ApiErrors(e);
        if (responseParsed.status === 401) {
        }
    }
};

const syncDynamicTags = (dispatch) => async () => {
    try {
        const response = await ContentAPI.getDynamicTags();
        const data = response.data;
        if (data.success) {
            dispatch({
                type: 'SET_DYNAMIC_TAGS',
                payload: data.tags,
            });
        }
    } catch (e) {
        const responseParsed = ApiErrors(e);
        if (responseParsed.status === 401) {
        }
    }
};
const getLocalData = (dispatch) => async () => {
    await AsyncStorage.getItem('userToken', data);
};

export const { Provider, Context } = createDataContext(
    authReducer,
    {
        setHideIntro,
        setSuccessFailureModalType,
        setUserData,
        unsetUserData,
        setApiRequest,
        setUserToken,
        unsetUserToken,
        getLocalData,
        setPopularSearches,
        setUserPreferences,
        setUserAvailablePreferences,
        setUserCart,
        syncFavoriteLists,
        syncDynamicTags,
        updateFavoriteSlugs,
        setSuccessFailureModalVisibility,
        setShouldRefreshMainPage,
    },
    initialState,
);
