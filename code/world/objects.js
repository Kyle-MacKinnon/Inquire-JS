/**
 * objects.js
 *
 * Stores all object defintions
 */

class GameObject {
   constructor(name, description, actions) {
      this.name = name;
      this.description = description;
      this.actionsMap = {};
      this.actionsArray = [];

      if (actions) {
         actions.forEach(action => {
            this.actionsMap[action.name] = action;
            this.actionsArray.push(action);
         });
      }
   }
   examine() {
      return this.description;
   }
}

class Action {
   constructor(name, run, options = {}) {
      this.name = name;
      this.run = run;
      this.hidden = options.hidden != undefined ? options.hidden : false;
      this.parent = undefined; // When added to the world
   }
}

let initialObjects = {
   whiteHouse: new GameObject(
      "white house",
      "The house is a beautiful colonial house which is painted white. It is clear that the owners must have been extremely wealthy."
   ),

   frontDoor: new GameObject("front door", "The door is closed."),

   mailBox: new GameObject("mailbox", "The small mailbox is closed.", [
      new Action("open", function() {
         this.parent.description = "Inside the small mailbox you see it contains a leaflet";
         this.hidden = true;
         this.parent.actionsMap["close"].hidden = false;
         output.render();
      }),
      new Action(
         "close",
         function() {
            this.parent.description = "The small mailbox is closed.";
            this.hidden = true;
            this.parent.actionsMap["open"].hidden = false;
            output.render();
         },
         { hidden: true }
      )
   ])
};

world.addObjects(initialObjects);
