const normalizeEnum = (value) => {

    if (!value) return value;

    return value
        .trim()
        .toUpperCase();
};

export default normalizeEnum;