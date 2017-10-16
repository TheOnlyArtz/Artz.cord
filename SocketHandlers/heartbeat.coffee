Basic = require './basic.coffee'

class HeartBeat extends Basic

  constructor: (wshandler) ->
    super(wshandler)

  handle: (packet) ->
    this.wshandler.wsmanager.send({
       op: 11,
       d: null,
       t: null,
       s: null
       });
module.exports = HeartBeat;
