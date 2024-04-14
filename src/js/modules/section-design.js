window.addEventListener("load", () => {
    gsap.timeline({
        defaults: {
            ease: "none",
        },
        scrollTrigger: {
            trigger: ".section-design__title",
            start: "top bottom",
            end: "bottom+=200 top",
            scrub: 0,
            // markers: true,
        },
    })
        .addLabel("shift")
        .to(
            ".section-design__title",
            {
                x: () => {
                    return $(".section-design__title").offset().left * -2;
                },
            },
            "shift"
        );
});
