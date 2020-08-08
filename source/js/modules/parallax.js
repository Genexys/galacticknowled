const parallax = () => {
  const controller = new ScrollMagic.Controller();

  const banner = document.querySelector(`.main-banner`);
  const planets = banner.querySelectorAll(`.animate-planet`);
  const tl = new TimelineMax();

  tl
    .to(planets[0], 6, {
      y: 100
    })
    .to(planets[1], 6, {
      y: -200
    }, '-=6');

  let scene = new ScrollMagic.Scene({
    triggerElement: banner,
    duration: "200%",
    triggerHook: 0
  })
    .setTween(tl)
    // .setPin('.banner')
    .addTo(controller);
};

export {parallax};
