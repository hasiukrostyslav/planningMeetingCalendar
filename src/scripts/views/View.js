export default class View {
  _parentElement = document.querySelector('.container');

  _generateEventMarkup() {
    return `
      <p class="event">
        <span class="event__title"></span>
        <button class="event__delete"></button>
      </p>
    `;
  }

  _generateErrorMarkup(err) {
    return `
      <div class="error">
        <p class="error__message">
          ${err}
        </p>
        <button class="error__close"></button>
      </div>
    `;
  }

  _generateWarningMessageMarkup(title) {
    return `
      <div class="modal">
        <p class="modal__text">
          Are you sure you want to delete event?
        </p>
        <div class="modal__btns">
          <button class="btn btn--modal btn--cancel">No</button>
          <button class="btn btn--modal btn--delete">Yes</button>
        </div>
      </div>
    `;
  }
}
