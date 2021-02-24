# 25 + 5 clock (Pomodoro Clock)

My React-based app for the [Build a 25 + 5 Clock](https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-25--5-clock) freeCodeCamp Front End Development Libraries project. Also known as a Pomodoro clock, apparently!

## To-do

- look into replacing `setInterval()` with Accurate_Interval.js by Squuege
- make it pretty:
  - media query 768px
  - color scheme
  - tomato background?

## Notes

### FCC timer tests

I had some issues getting the app to pass FCC timer tests #10, #13 and #15.

To pass timer tests #13 and #15, I moved the calculation of the display time (mm:ss) into a separated function `calcDisplaytime()` that only gets called when the `id="time-left"` element is rendered. This function converts the value (in secs) of `state.intClock` into mm:ss.

Previously, the display time was calculated inside `setInterval()` and put into state (`state.displayTime`). `id="time-left"` would then get the value from state via props during rendering. It would appear that doing this way meant the intClock and the displayed time were slightly out of sync when switching between the break/work timers.

To pass timer test #10, I moved the timer decrement logic from `handleStartStop()` to a separate function (`runTimer()`). Now when we start the timer, `runTimer()` returns the `intervalId` from `setInterval(`) directly into setState, i.e:

`this.setState({ intervalId: this.runTimer(), isTimerRunning: true })`

Previously, the app failed the test because there was a 2 second delay before the timer was stopped after pressing the start/stop btn in the test. The problem seems to arise when pressing start/stop twice quickly in succession. Presumably the `state.intervalId` value was not updated fast enough when you first start the timer under the previous configuration, when this value was updated from within inside `setInterval()`.
