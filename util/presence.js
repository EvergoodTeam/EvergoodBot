const client = require('../index')
const config = require('../config.json')

module.exports = {
	name: 'presence',
	execute() {

        var type = []
        for (var x in config.status) {
            type.push(x);
        }

        const indexType = Math.floor(Math.random() * type.length)

        const statusLength = config.status[type[indexType]].length
        const indexStatus = Math.floor(Math.random() * statusLength)

        //client.user.setActivity('Minecraft', { type: 'PLAYING' });

        client.user.setActivity(config.status[type[indexType]][indexStatus], { type: type[indexType]})
	},
};