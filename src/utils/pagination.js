export const paginate = ({
    page = 1,
    limit = 10,
}) => {

    page = Number(page);
    limit = Number(limit);

    return {
        limit,
        offset: (page - 1) * limit,
        currentPage: page,
    };

};

export const getPagingData = (
    count,
    rows,
    currentPage,
    limit
) => {

    return {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage,
        pageSize: limit,
        data: rows,
    };

};