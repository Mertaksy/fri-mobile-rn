export const sortCategories = function (categoryArr) {
    return categoryArr.sort((curCategory, nextCategory) => {
        const orderDiff = curCategory.order - nextCategory.order;
        const curCategoryName = curCategory.name.toLocaleLowerCase();
        const nextCategoryName = nextCategory.name.toLocaleLowerCase();

        if (orderDiff === 0) {
            return curCategoryName.localeCompare(nextCategoryName);
        }
        return orderDiff;
    });
};
