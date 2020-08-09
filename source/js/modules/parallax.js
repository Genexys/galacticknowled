const parallax = () => {
  const controller = new ScrollMagic.Controller();

  const banner = document.querySelector(`.main-banner`);
  const courses = document.querySelector(`.courses`);
  const planets = banner.querySelectorAll(`.animate-planet`);
  const rocket = banner.querySelectorAll(`.rocket`);
  const asteroid = document.querySelector(`.asteroid`);
  const tlBanner = new TimelineMax();
  const tlCourses = new TimelineMax();

  tlBanner
    .to(planets[0], 6, {
      y: 100
    })
    .to(planets[1], 6, {
      y: 150
    }, '-=6')
    .to(rocket, 6, {
      y: -200
    }, '-=6');

  tlCourses
    .to(asteroid, 6, {
      y: 100,
      x: -100,
    });

  let sceneBanner = new ScrollMagic.Scene({
    triggerElement: banner,
    duration: "200%",
    triggerHook: 0
  })
    .setTween(tlBanner)
    .addTo(controller);

  let sceneCourse = new ScrollMagic.Scene({
    triggerElement: planets[0],
    duration: "200%",
    triggerHook: 0
  })
    .setTween(tlCourses)
    .addTo(controller);
};

export {parallax};
