/**
 * output.js
 *
 * Controls the HTML element for output
 */

var output = {
  words: [],
  lines: {},
  maxLineIndex: undefined,
  focusedWord: undefined,
  htmlElement: document.getElementById("output"),

  text(sentence) {
    const moreWords = sentence.split(/ /g);
    moreWords.forEach(word => {
      this.words.push({
        text: `<span id="word-${
          this.words.length
        }" class="text">${word} </span>`,
        index: this.words.length
      });
    });
    return this;
  },

  object(object, options = {}) {
    const fullStop = options.fullStop ? "." : "";
    const comma = options.comma ? "," : "";
    const wordsLength = this.words.length;

    this.words.push({
      text: `<span id="word-${wordsLength}" class="object" onClick="output.focus('${wordsLength}')">${
        object.name
      }</span>${fullStop}${comma}`,
      object: object,
      index: wordsLength
    });
    return this;
  },

  focus(objectIndex) {
    let word = this.words[objectIndex];
    this.focusedWord = word;
    this.render();
  },

  performAction(actionIndex) {
    this.focusedWord.object.actionsArray[actionIndex].run();
  },

  render() {
    // Clear everything, redrawing / recalcuating
    this.htmlElement.innerHTML = "";
    this.lines = {};

    // Output all words
    this.words.forEach((word, index) => {
      this.htmlElement.innerHTML += word.text + " ";

      // Calculate line index for each word using offsetTop
      const wordElement = document.getElementById(`word-${index}`);
      const wordTop = wordElement.getBoundingClientRect().top;
      word.lineIndex = wordTop;

      // Build an array of all words by line
      if (!this.lines[wordTop]) {
        this.lines[wordTop] = [];

        // Keep track of the highest line index
        this.maxLineIndex = wordTop;
      }
      this.lines[wordTop].push(word);
    });

    // Insert details on focused word if one exists
    if (this.focusedWord) {
      const focusedWordLine = this.lines[this.focusedWord.lineIndex];
      wordToBreakOn = focusedWordLine[focusedWordLine.length - 1];

      // Clear & render a second time now that we know where the details should go
      this.htmlElement.innerHTML = "";

      this.words.forEach((word, index) => {
        // Breaking on this word?
        if (this.focusedWord && wordToBreakOn && index == wordToBreakOn.index) {
          this.htmlElement.innerHTML += `${
            word.text
          } <div class="details" id="details"></div>`;
        } else {
          this.htmlElement.innerHTML += `${word.text} `;
        }
      });
    }

    // If we're focused on something then render the details
    if (this.focusedWord) {
      let detailsElement = document.getElementById("details");
      detailsElement.innerHTML = this.focusDetails();
    }
  },

  focusDetails() {
    let focusedWordElement = document.getElementById(
      `word-${this.focusedWord.index}`
    );
    const arrowImageStyle = `left: ${focusedWordElement.offsetLeft +
      focusedWordElement.offsetWidth / 2}px`;
    const arrowImage = `<img src="icons/small-arrow-up.png" class="focus-arrow" style="${arrowImageStyle}"></img>`;
    const name = `<div class="details-description">${toTitleCase(
      this.focusedWord.object.name
    )}</div>`;
    const description = `<div class="details-description">${this.focusedWord.object.examine()}</div>`;

    // Build actions if we have any
    let actions = "";
    if (this.focusedWord && this.focusedWord.object.actionsArray) {
      this.focusedWord.object.actionsArray.forEach((action, index) => {
        if (!action.hidden) {
          actions += `<div class="details-actions"><span id="action-${index}" class="action" onClick="output.performAction(${index})">${
            action.name
          }</span></div>`;
        }
      });
    } else {
      // Clear actions
      this.actions = undefined;
    }

    return `${arrowImage}</div><hr>${name}${description}${actions}<hr>`;
  }
};

/* 
   Author: Greg Dean
   Source: https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript

   Used to Capitalizes object names in details
*/
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Resize event causes a re-render
window.addEventListener(
  "resize",
  () => {
    output.render();
    return true;
  },
  false
);
