/**
 * render.js
 *
 * Renders the world to the interface
 */

const objects = world.objects;

title.set("West of House");

output
   .text("You are standing in an open field west of a")
   .object(objects.whiteHouse, { comma: true })
   .text("with a boarded")
   .object(objects.frontDoor, { fullStop: true })
   .text("There is a small")
   .object(objects.mailBox)
   .text("here.")
   .render();
