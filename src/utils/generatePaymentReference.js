export default function generatePaymentReference() {

    const random =
        Math.random()
            .toString(36)
            .substring(2, 10)
            .toUpperCase();

    return `ECO_${Date.now()}_${random}`;

}