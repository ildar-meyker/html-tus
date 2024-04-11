import isDesktop from "../helpers/isDesktop";

$(function () {
    gsap.timeline({
        defaults: {
            ease: "none",
        },
        scrollTrigger: {
            trigger: ".wrapper",
            start: 0,
            end: 1500,
            scrub: 0,
            markers: true,
            pin: true,
        },
    })
        .addLabel("start")
        .to(
            ".intro-zhk__image",
            {
                scale: () => {
                    let fullScale;

                    if (isDesktop()) {
                        fullScale = 1;

                        $("#intro-zhk").get(0).style = "";
                    } else {
                        const imageRatio = 0.9339;
                        const toolbarHeight = 100;
                        const windowHeight = $(window).height();
                        const imageHeight = $(window).width() * imageRatio;

                        fullScale = windowHeight / imageHeight;

                        $("#intro-zhk").outerHeight(
                            $(".intro-zhk__image").offset().top + windowHeight
                        );
                    }

                    console.log("scale calc", fullScale);
                    return fullScale;
                },
                borderRadius: 0,
                duration: 2,
                y: -$(".intro-zhk__image").offset().top,
            },
            "start"
        )
        .to(
            ".intro-zhk__h1",
            {
                opacity: 0,
                duration: 1,
            },
            "start"
        );
});
