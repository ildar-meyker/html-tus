window.addEventListener("load", () => {
    gsap.timeline({
        defaults: {
            ease: "none",
        },
        scrollTrigger: {
            trigger: ".section-about__title",
            start: "top bottom",
            end: "bottom+=200 top",
            scrub: 0,
            // markers: true,
        },
    })
        .addLabel("shift")
        .to(
            ".section-about__title",
            {
                x: () => {
                    return $(".section-about__title").offset().left * -2;
                },
            },
            "shift"
        );
});
