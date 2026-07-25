const normalizePlateNumber = (plateNumber) => {

    if (!plateNumber) return plateNumber;

    return plateNumber
        .trim()
        .replace(/\s+/g, "")
        .toUpperCase();
};

export default normalizePlateNumber;