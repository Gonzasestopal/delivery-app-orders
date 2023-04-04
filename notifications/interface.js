/**
 @constructor
 @abstract
 */
 var Notifications = function() {
    if (this.constructor === Notifications) {
      throw new Error("Can't instantiate abstract class!");
    }
    // Notifications initialization...
};

/**
 @abstract
 */
Notifications.prototype.send = function() {
    throw new Error("Abstract method!");
}
module.exports = {
    Notifications,
}