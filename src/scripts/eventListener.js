import * as csp from 'js-csp';

const canvas = document.getElementById('mouse-drag');

export function listen(channel) {
  if (!canvas) return;

  canvas.addEventListener('mousemove', event => {
    csp.putAsync(channel, [event.clientX, event.clientY]);
  });
}

export function updateCoord([x, y]) {
  canvas.innerHTML = `${x}, ${y}`;
}
