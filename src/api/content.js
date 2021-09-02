import api from './api';
import { sortCategories } from '../utils/utils';

export const getAllCategoriesList = async (show_all_flat) => {
    const response = await api.get(`/categories?show_all_flat=${show_all_flat}`);
    const newResp = { ...response };
    newResp.data.categories = sortCategories(response.data.categories);
    return newResp;
};

export const getAllCategoriesByType = async (type, hideSponsored = 1, showNested = 1) => {
    const response = await api.get(`/categories?type=${type}&hide_sponsored=${hideSponsored}&show_nested=${showNested}`);
    if (type === 'tarif') {
        const newResp = { ...response };
        newResp.data.categories = sortCategories(response.data.categories);
        return newResp;
    }
    return response;
};

export const getSponsorCardsByType = (categorySlug) => {
    return api.get(`/sponsor_cards?category=${categorySlug}`);
};

export const getSliderList = () => {
    return api.get(`/sliders_stories`);
};

export const getDailyRecommendation = () => {
    return api.get(`/dailyrecommendation`);
};

export const getDailyRecipes = () => {
    return api.get(`/dailyrecipes`);
};

export const getPersonalizedRecipes = () => {
    return api.get('/recipes?sort=random&personalize=1');
};

export const getHomepageBlocks = () => {
    return api.get(`/homepage_blocks`);
};

export const getTagDetails = (tag, sort = 'recent', page = 1, showContent = 1) => {
    return api.get(`/freetexts?tags=${tag}&sort=${sort}&show_content=${showContent}&page=${page}`);
};

export const getAuthorFreeTexts = (authorSlug, sort = 'recent', page = 1) => {
    return api.get(`/freetexts?author_slug=${authorSlug}&sort=${sort}&page=${page}`);
};

export const getAuthorRecipes = (authorSlug, sort = 'recent', page = 1) => {
    return api.get(`/recipes?author_slug=${authorSlug}&sort=${sort}&page=${page}`);
};

export const getAllRecipes = (sortType) => {
    return api.get(`/recipes?sort=${sortType}`);
};

export const getAllRecipesByCategory = (sortType, categories) => {
    return api.get(`/recipes?sort=${sortType}&categories=${categories}`);
};

export const getRecipeDetails = (slug) => {
    return api.get(`/recipes/${slug}`);
};

export const getFreetextDetails = (slug) => {
    return api.get(`/freetexts/${slug}`);
};

export const getAllLists = (sortType = 'recent', page = 1) => {
    return api.get(`/lists?sort=${sortType}&page=${page}`);
};

export const getListDetails = (slug) => {
    return api.get(`/lists/${slug}`);
};

export const getDictionaryByLetter = (letter, sortType) => {
    return api.get(`/dictionary/letters/?letter=${letter}&sort=${sortType}`);
};

export const getSearchSuggestResult = (keyword) => {
    return api.get(`/search/suggest?keyword=${keyword}`);
};

export const getSearchResults = (keywords, sortType, recordsPerPage, contentType = 'all') => {
    return api.get(`/search?keywords=${keywords}&sort=${sortType}&records_per_page=${recordsPerPage}&content_type=${contentType}`);
};

export const getDifficulties = () => {
    return api.get(`/difficulties`);
};

export const getWithUrl = (url) => {
    return api.get(url);
};

export const getPopularSearches = () => {
    return api.get(`/search/popular`);
};

export const getDynamicTags = () => {
    return api.get(`/dynamictags`);
};

export const getHamburgerMenuSponsor = () => {
    return api.get(`/sponsors_and_menus`);
};
