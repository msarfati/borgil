var default_buffer = 100;

module.exports = function () {
    // Create buffer objects for each client.
    this.buffers = {};

    // Log each message to a buffer.
    this.on('message', function (transport, msg) {
        // Initialize buffer for this transport and source if necessary.
        if (!(transport.name in this.buffers)) {
            this.buffers[transport.name] = {};
        }
        if (!(msg.replyto in this.buffers[transport.name])) {
            this.buffers[transport.name][msg.replyto] = [];
        }
        var buffer = this.buffers[transport.name][msg.replyto];

        // Trim buffer to maximum length, then add this message.
        if (buffer.length >= this.config.get('buffer', default_buffer)) {
            buffer.pop();
        }
        buffer.unshift(msg);
    });
};
