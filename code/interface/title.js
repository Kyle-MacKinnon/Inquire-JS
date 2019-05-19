/**
 * title.js
 *
 * Controls the HTML element for the title
 */

const title = {
   set(title) {
      this.contents = title;
      this.htmlElement.innerHTML = this.contents;
   },

   contents: "",
   htmlElement: document.getElementById("title")
};
