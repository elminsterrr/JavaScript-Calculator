// JavaScript Calculator v.2.0
// Created by: Elminster White - elminsterthewhite@gmail.com

'use strict';

function Calculator(calcId) {
  const oneCalc = document.querySelector('#' + calcId);

  // One global variable for one CALC
  const CALC = {};
  CALC.inputs = [];
  CALC.lastResult = null;
  CALC.operationsUpdate = oneCalc.querySelector('.inputTextboxUpper');
  CALC.screenUpdate = oneCalc.querySelector('.inputTextboxLower');
  CALC.buttons = oneCalc.querySelectorAll('[data-value]');

  // Handle CALC buttons
  CALC.buttons.forEach(button => button.addEventListener('click', whenClicked));

  function whenClicked() {
    const click = this.dataset.value;
    // The last element in inputs array
    const last = CALC.inputs[CALC.inputs.length - 1];
    // Function that updates inputs on screen
    function update() {
      CALC.operationsUpdate.value = CALC.inputs.join('');
      // To avoid undefined when using CE before first getTotal
      if (CALC.lastResult === null) {
        CALC.screenUpdate.value = '...';
      } else {
        CALC.screenUpdate.value = CALC.lastResult;
      }
      // Scrolling HTML textbox to right when have many digits on screen
      CALC.operationsUpdate.scrollLeft = CALC.operationsUpdate.scrollWidth;
      CALC.screenUpdate.scrollLeft = CALC.screenUpdate.scrollWidth;
    }
    // Does the math using an extensive math library for JavaScript (math.js)
    function calcBrain(joinedInputs) {
      math.config({
        number: 'BigNumber',
        precision: 64
      });
      return math.eval(joinedInputs);
    }
    // Function that calculates total value using calcBrain function
    function getTotal() {
      // Refresh is the value of last calculation
      const refresh = calcBrain(CALC.inputs.join(''));
      CALC.operationsUpdate.value = CALC.inputs.join('');
      CALC.lastResult = refresh;
      CALC.screenUpdate.value = refresh;
    }
    // Preventing this 1++2 from happening
    if ((click === '+' || click === '-' || click === '*' || click === '/' ||
        click === '.') && (last === '+' || last === '-' || last === '*' ||
        last === '/' || last === '.')) {
      return; // Do nothing when this conditions are fulfilled
    }
    // Handling special buttons
    if (click === 'deleteAll') {
      // All Clear
      CALC.inputs = [];
      CALC.lastResult = null;
      CALC.operationsUpdate.value = '';
      CALC.screenUpdate.value = 0;
    } else if (click === 'backOne') {
      // Clear Entry
      // Only when we have something in 'inputs' array we can use pop
      if (CALC.inputs.length > 0 && CALC.inputs.length === 1) {
        // If CALC.inputs.length is === 1 'Clear Entry' behaves just like 'AC'
        CALC.inputs = [];
        CALC.lastResult = null;
        CALC.operationsUpdate.value = '';
        CALC.screenUpdate.value = 0;
      } else if (CALC.inputs.length > 0 && CALC.inputs.length !== 1) {
        CALC.inputs.pop();
        update();
      }
    } else if (click === 'total') {
      // When there is nothing to calculate do nothing
      if ((CALC.inputs.length === 0) && (CALC.lastResult === null)) {
        return; // Do nothing when this conditions are fulfilled
      }
      // Calculating total value
      getTotal();
    } else {
      // Pushing numbers and operators to inputs array
      CALC.inputs.push(click);
      update();
      // Showing last pushed button on screen
      CALC.screenUpdate.value = click;
    }
    /*
    // TESTING
    // Function that prints object with global variables to console log each
    // time user hits any calculator button - useful for checking CALC behavior
    (function consoleLogPrinter() {
      console.log(CALC);
    }());
    */
  }
}
const calculator1 = new Calculator('calculator1');
const calculator2 = new Calculator('calculator2');
const calculator3 = new Calculator('calculator3');
