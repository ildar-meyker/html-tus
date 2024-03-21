// $.extend(true, $.magnificPopup.defaults, {
//     tClose: "", // Alt text on close button
//     tLoading: "Загрузка...", // Text that is displayed during loading. Can contain %curr% and %total% keys
//     gallery: {
//         tPrev: "", // Alt text on left arrow
//         tNext: "", // Alt text on right arrow
//         tCounter: "%curr% из %total%", // Markup for "1 of 7" counter
//     },
//     image: {
//         tError: 'Не удалось загрузить <a href="%url%">изображение</a>.', // Error message when image could not be loaded
//     },
//     ajax: {
//         tError: 'Не удалось загрузить <a href="%url%">страницу</a>.', // Error message when ajax request failed
//     },
// });

// $.validator.addMethod(
//     "mobileRU",
//     function (phone_number, element) {
//         var ruPhone_number = phone_number.replace(/\(|\)|\s+|-/g, "");
//         return (
//             this.optional(element) ||
//             (ruPhone_number.length > 9 &&
//                 /^((\+7|7|8)+([0-9]){10})$/.test(ruPhone_number))
//         );
//     },
//     "Пожалуйста укажите корректный номер."
// );
