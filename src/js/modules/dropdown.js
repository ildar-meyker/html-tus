// let activeBtn = null;

// function update(btnEl, isActive) {
//     const target = $(btnEl).data("target");
//     $(target).add(btnEl).toggleClass("active", isActive);
// }

// function activate(btnEl) {
//     update(btnEl, true);
// }

// function deactivate(btnEl) {
//     update(btnEl, false);
// }

// function handleBtnClick(e) {
//     e.preventDefault();

//     if (activeBtn) {
//         deactivate(activeBtn);
//     }

//     if (this === activeBtn) {
//         // already deactivated
//         activeBtn = null;
//     } else {
//         activate(this);
//         activeBtn = this;
//     }
// }

// function handleOutsideClick(e) {
//     if (!activeBtn) return;
//     if ($(e.target).closest(".js-dropdown-parent").length) return;

//     deactivate(activeBtn);
//     activeBtn = null;

//     console.log("dropdown:handleOutsideClick");
// }

// $(function () {
//     $(document).on("click", ".js-dropdown-btn", handleBtnClick);
//     $(document).on("click", handleOutsideClick);
// });
