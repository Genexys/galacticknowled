const getValueCourse = () => {
  const courseButtons = document.querySelectorAll(`.courses__button`);
  const form = document.querySelector(`.main-form`);
  const hiddenInput = form.querySelector(`input[hidden]`);
  for (const courseButton of courseButtons) {

    courseButton.addEventListener(`click`, function () {
      hiddenInput.setAttribute(`value`, this.dataset.valueCourse);
    });
  }
};

export {getValueCourse};
