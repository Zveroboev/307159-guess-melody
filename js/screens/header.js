import lives from './lives';
import time from './time';

const header = `
<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
  <circle
     cx="390" cy="390" r="370"
     class="timer-line"
     style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center">
  </circle>
</svg>
${time}
${lives}
`;

export default header;