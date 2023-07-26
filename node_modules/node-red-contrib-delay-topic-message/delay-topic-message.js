module.exports = function(RED) {
	function updateStatus(node) {
		node.status({
			fill: node.messagesCount > 0 ? 'green' : 'grey',
			shape: 'dot',
			text: 'Running timers: ' + node.messagesCount,
		});
	}

	function resetNode(node) {
		node.messages = {};
		node.messagesCount = 0;
		updateStatus(node);
	}

	function resetTimeouts(node) {
		for (let topic in node.messages) {
			clearTimeout(node.messages[topic].timeout);
			delete node.messages[topic];
		}
	}

	function delayTimer(config) {
		RED.nodes.createNode(this, config);

		let node = this;
		resetNode(node);
		node.delay = config.delay;

		node.on('input', function (msg) {
			if (msg.stopAll && msg.stopAll === true) {
				resetTimeouts(node);
				resetNode(node);
				return;
			}

			let topic = msg.topic || '__notopic';

			if (node.messages[topic]) {
				node.messagesCount--;
				clearTimeout(node.messages[topic].timeout);
			}

			if (msg.stopTimer && msg.stopTimer === true) {
				delete node.messages[topic];
				updateStatus(node);
				return;
			}

			node.messagesCount++;
			updateStatus(node);

			node.messages[topic] = {
				timeout: setTimeout(function () {
					node.send(node.messages[topic].msg);
					delete node.messages[topic];
					node.messagesCount--;
					updateStatus(node);
				}, (msg.delay || node.delay) * 1000),
				msg: msg,
			};
		});
	}

	RED.nodes.registerType('delay-topic-message', delayTimer);
}
