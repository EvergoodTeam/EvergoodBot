const deployer = require('../util/deploy-commands')

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		deployer() // Register slash commands

		console.log(`Logged in as ${client.user.tag}`);

		const presence = require('../util/presence');

		(function status(){
			presence.execute()
			setTimeout(status, 1 * 60000);
		})();
	},
};