import View from './View';

class FormView extends View {
  _form = document.querySelector('.form');
  _inputTitleEl = document.getElementById('event-title');
  _selectParticipantsEl = document.getElementById('members-add');
  _selectDayEl = document.getElementById('day');
  _selectTimeEl = document.getElementById('time');
  _btnCancel = document.querySelector('.btn--cancel');
  _btnCloseError;

  addHandlerRemoveError() {
    this._btnCloseError.addEventListener('click', this.removeError);
  }

  removeError() {
    const errorEl = document.querySelector('.error');

    if (!errorEl) return;

    errorEl.remove();
  }

  renderError(err) {
    this._parentElement.insertAdjacentHTML(
      'afterbegin',
      this._generateErrorMarkup(err)
    );

    this._btnCloseError = document.querySelector('.error__close');
  }

  getInputsData() {
    return {
      title: this._inputTitleEl.value,
      participants: this._selectParticipantsEl.value.split(', '),
      day:
        this._selectDayEl.value[0].toUpperCase() +
        this._selectDayEl.value.slice(1),
      time: this._selectTimeEl.value,
    };
  }

  addHandlerCreateEvent(handler) {
    if (!this._form) return;
    this._form.addEventListener('submit', handler);
  }
}

export default new FormView();
