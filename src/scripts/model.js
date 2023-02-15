export const state = {
  events: [],
};

function persistEvents() {
  localStorage.setItem('events', JSON.stringify(state.events));
}

export function createEventObject(data) {
  try {
    if (data.title === '') data.title = 'Meeting';

    const event = data;

    if (
      state.events.find((el) => el.day === event.day && el.time === event.time)
    ) {
      throw new ReferenceError(
        'Failed to create an event. Time slot is already booked.'
      );
    }

    state.events.push(event);

    persistEvents();
  } catch (err) {
    throw err;
  }
}

export function removeEventObject(cell) {
  console.log(cell);
  if (!cell) return;
  const index = state.events.indexOf(
    state.events.find(
      (el) => el.time === cell.dataset.time && el.day === cell.dataset.day
    )
  );

  state.events.splice(index, 1);

  persistEvents();
}

function init() {
  const storage = localStorage.getItem('events');
  if (storage) state.events = JSON.parse(storage);
}
init();

function clearEvents() {
  localStorage.clear('Events');
}

// clearEvents();
