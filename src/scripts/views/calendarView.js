import View from './View';
import { HOURS, DAYS } from '../config';

class CalendarView extends View {
  _parentElement = document.querySelector('.table');
  _tableRows = document.querySelectorAll('.table__row');
  _tableCell = document.querySelectorAll('.table__cell');
  _hours = document.querySelectorAll('.table__data--time');
  _btnDeleteEvent = document.querySelector('.event__delete');
  _btnFilter = document.getElementById('members-sort');
  currentCell;
  _btnDelSubmit;
  _btnDelCancel;

  constructor() {
    super();
    this._setDataAttribute();
    this._setTime();
  }

  getWindowLocation() {
    return window.location.origin;
  }

  _renderWarning() {
    this._parentElement.insertAdjacentHTML(
      'beforeend',
      this._generateWarningMessageMarkup()
    );
  }

  deleteEventElement(e) {
    const btn = e.target.closest('.event__delete');

    if (!btn) return;

    this._renderWarning();
    this._modal = document.querySelector('.modal');

    this._btnDelSubmit = document.querySelector('.btn--delete');
    this._btnDelCancel = document.querySelector('.btn--cancel');

    if (!this._btnDelSubmit) return;

    this._btnDelSubmit.addEventListener('click', (e) => {
      const cell = btn.closest('.table__cell');
      cell.classList.remove('table__data--event');
      cell.innerHTML = '';
      this.currentCell = cell;
      this._modal.remove();
      console.log(this.currentCell);
    });

    this._btnDelCancel.addEventListener('click', () => this._modal.remove());
  }

  addHandlerDeleteEvent(handler) {
    if (!this._parentElement) return;
    this._parentElement.addEventListener('click', handler);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  _setTime() {
    this._hours.forEach((el, i) => (el.textContent = `${HOURS[i]}:00`));
  }

  _setDataAttribute() {
    Array.from(this._tableRows)
      .slice(1)
      .forEach((row, i) => {
        row.dataset.time = HOURS[i];
        row.querySelectorAll('.table__cell').forEach((cell, i) => {
          cell.dataset.day = DAYS[i];
          cell.dataset.time = row.dataset.time;
        });
      });
  }

  _createEvent(events) {
    events.forEach((ev) => {
      const cell = [...this._tableCell].find(
        (el) => el.dataset.day === ev.day && +el.dataset.time === +ev.time
      );

      if (!cell) return;

      cell.classList.add('table__data--event');
      cell.insertAdjacentHTML('afterbegin', this._generateEventMarkup());
      cell.querySelector('.event__title').textContent = ev.title;
    });
  }

  renderEvent(events) {
    this._createEvent(events);
  }

  filterEvents(events) {
    if (!this._btnFilter) return;
    this._btnFilter.addEventListener('change', (e) => {
      const cells = document.querySelectorAll('.table__data--event');
      cells.forEach((el) => {
        el.classList.remove('table__data--event');
        el.innerHTML = '';
      });

      if (e.target.value === 'all') this._createEvent(events);

      const filter = events.filter(
        (el) => el.participants.join(', ') === e.target.value
      );

      this._createEvent(filter);
    });
  }
}

export default new CalendarView();
