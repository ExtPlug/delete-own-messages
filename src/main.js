define(function (require, exports, module) {

  const Plugin = require('extplug/Plugin');

  const DeleteOwnMessages = Plugin.extend({
    name: 'Delete Own Messages',
    description: 'Allows you to delete your own messages (...if you\'re staff.)',

    enable() {
      // code to start your plugin
    },

    disable() {
      // code to undo what you did in enable()
    }
  });

  module.exports = DeleteOwnMessages;

});
