const parallax = () => {
  const controller = new ScrollMagic.Controller();

  const banner = document.querySelector(`.main-banner`);
  const courses = document.querySelector(`.courses`);
  const why = document.querySelector(`.why-way`);
  const planets = banner.querySelectorAll(`.animate-planet`);
  const rocket = banner.querySelectorAll(`.rocket`);
  const asteroid = document.querySelector(`.asteroid`);
  const comet = document.querySelector(`.comet`);
  const tlBanner = new TimelineMax();
  const tlCourses = new TimelineMax();
  const tlWhy = new TimelineMax();

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

  tlWhy
    .to(comet, 6, {
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

  let sceneWhy = new ScrollMagic.Scene({
    triggerElement: why,
    duration: "200%",
    triggerHook: 0
  })
    .setTween(tlWhy)
    .addTo(controller);
};

export {parallax};
