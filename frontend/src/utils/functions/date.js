"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
const formatDate = (date) => {
    const options = {
        timeZone: "Asia/Jerusalem",
        year: "2-digit",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date).replace(",", "");
};
exports.formatDate = formatDate;
// Example:
const israelDate = (0, exports.formatDate)(new Date());
console.log(israelDate); // Example: 1/1/24 22:15
//# sourceMappingURL=date.js.map