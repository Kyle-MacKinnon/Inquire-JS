/**
 * world.js
 *
 * Manages and stores all worldly information
 */

function toTitleCase(str) {
   return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
   });
}

const world = {
   objects: {},

   addObjects: function(newObjects) {
      const objectNames = Object.keys(newObjects);

      // Loop through all new objects
      for (let i = 0; i < objectNames.length; i++) {
         const objectName = objectNames[i];
         const newObject = newObjects[objectName];

         // Link actions back to parent objects so we can manipulate them through actions
         newObject.actionsArray.forEach(action => {
            action.parent = newObject;
         });

         // Add id to each new object
         newObject.id = this.objects.length + i;
      }

      // Merge with objects
      this.objects = Object.assign(newObjects, this.objects);
   }
};
