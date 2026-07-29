const normalizeEnum = (value) => {
    if (!value) return value;

    const normalized = value.trim().toUpperCase();

    // Legacy support
    if (normalized === "USER") {
        return "PASSENGER";
    }

    return normalized;
};

export default normalizeEnum;