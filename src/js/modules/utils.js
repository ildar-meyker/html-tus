export function isOutsideOf(el, selector) {
    return $(el).closest(selector).length === 0;
}

export function getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
}

export function getISODate(date) {
    return new Date(date + " UTC").toISOString().substr(0, 10);
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
