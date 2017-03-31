// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by foodmenu.js.
import { name as packageName } from "meteor/verylocal:foodmenu";

// Write your tests here!
// Here is an example.
Tinytest.add('foodmenu - example', function (test) {
  test.equal(packageName, "foodmenu");
});
