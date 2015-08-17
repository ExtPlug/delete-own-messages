

define('extplug/delete-own-messages/main',['require','exports','module','extplug/Plugin','plug/core/Events','plug/facades/chatFacade','lang/Lang','jquery'],function (require, exports, module) {

  var Plugin = require('extplug/Plugin');
  var Events = require('plug/core/Events');

  var _require = require('plug/facades/chatFacade');

  var _deleteChat = _require.deleteChat;

  var Lang = require('lang/Lang');
  var $ = require('jquery');

  var DeleteOwnMessages = Plugin.extend({
    name: 'Delete Own Messages',
    description: 'Allows you to delete your own messages (...if you\'re staff.)',

    style: {
      '#chat .deletable:hover .delete-button': {
        'display': 'block'
      }
    },

    enable: function enable() {
      var _this = this;

      this.listenTo(Events, 'chat:afterreceive', function (message, el) {
        if (!el || !el.length) return;

        var user = API.getUser();
        if (user.role >= API.ROLE.BOUNCER && message.uid && message.cid && el.find('.delete-button').length === 0) {
          var deleteButton = $('<div />').addClass('delete-button').on('click', _this.deleteChat).text(Lang.chat['delete']);

          el.addClass('deletable').append(deleteButton);
        }
      });
    },

    deleteChat: function deleteChat(e) {
      var button = $(e.currentTarget);
      var el = button.parent('.deletable');
      if (el && el.data('cid')) {
        _deleteChat(el.data('cid'));
      }
      button.remove();
    }
  });

  module.exports = DeleteOwnMessages;
});
