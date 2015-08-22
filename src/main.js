define(function (require, exports, module) {

  const Plugin = require('extplug/Plugin');
  const Events = require('plug/core/Events');
  const { deleteChat } = require('plug/facades/chatFacade');
  const Lang = require('lang/Lang');
  const $ = require('jquery');

  const deletable = {
    message: true,
    mention: true,
    emote: true
  }

  const DeleteOwnMessages = Plugin.extend({
    name: 'Delete Own Messages',
    description: 'Allows you to delete your own messages (...if you\'re staff.)',

    style: {
      '#chat .deletable:hover .delete-button': {
        'display': 'block'
      }
    },

    enable() {
      this.listenTo(Events, 'chat:afterreceive', (message, el) => {
        if (!el || !el.length) return;

        let user = API.getUser();
        if (user.role >= API.ROLE.BOUNCER &&
            message.uid &&
            message.cid &&
            deletable[message.type] &&
            el.find('.delete-button').length === 0) {
          let deleteButton = $('<div />')
            .addClass('delete-button')
            .on('click', this.deleteChat)
            .text(Lang.chat.delete);

          el.addClass('deletable').append(deleteButton);
        }
      });
    },

    deleteChat(e) {
      let button = $(e.currentTarget);
      let el = button.parent('.deletable');
      if (el && el.data('cid')) {
        deleteChat(el.data('cid'));
      }
      button.remove();
    }
  });

  module.exports = DeleteOwnMessages;

});
