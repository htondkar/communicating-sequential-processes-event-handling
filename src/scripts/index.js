import * as csp from 'js-csp';
import { listen, updateCoord } from './eventListener';

import '../styles/index.scss';

const { go, chan, take, CLOSED, timeout } = csp;

function* sink(channel) {
  while (true) {
    // the first time around react immediatly
    const message = yield take(channel);
    updateCoord(message);

    while (true) {
      yield take(timeout(32));
      const message = yield take(channel);

      if (message === CLOSED) {
        console.log('channel closed');
        return;
      }

      updateCoord(message);
    }
  }
}

function* runner() {
  const ch = chan(csp.buffers.dropping(1));
  listen(ch);
  go(sink, [ch]);
}

go(runner);
