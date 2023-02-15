import '../styles/main.scss';
import * as model from './model.js';
import calendarView from './views/calendarView';
import formView from './views/formView';

function controlEvent() {
  calendarView.renderEvent(model.state.events);

  calendarView.filterEvents(model.state.events);
}

function controlAddEvent(e) {
  try {
    e.preventDefault();

    formView.removeError();

    model.createEventObject(formView.getInputsData());

    window.location.href = calendarView.getWindowLocation();
  } catch (err) {
    formView.renderError(err.message);

    formView.addHandlerRemoveError();
  }
}

function controlDeleteEvent(e) {
  calendarView.deleteEventElement(e);

  model.removeEventObject(calendarView.currentCell);
}

function init() {
  formView.addHandlerCreateEvent(controlAddEvent);
  calendarView.addHandlerRender(controlEvent);
  calendarView.addHandlerDeleteEvent(controlDeleteEvent);
}

init();
