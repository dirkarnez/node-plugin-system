const fs =  require('fs');

module.exports = (() => {
    var plugins = {};

	var pluginsDir = './plugins';

	if (!fs.existsSync(pluginsDir)){
	    fs.mkdirSync(pluginsDir);
	}
    
    fs.readdirSync(pluginsDir).forEach(file => {
        if (fs.statSync(`${pluginsDir}/${file}`).isDirectory()) {
           var data = fs.readFileSync(`${pluginsDir}/${file}/plugin.json`, 'utf8');
           var pluginInfo = {directory: file, ...JSON.parse(data)};
           
           plugins = {
                ...plugins, 
                [pluginInfo.type]: plugins[pluginInfo.type] ? [...plugins[pluginInfo.type], pluginInfo] : [pluginInfo]
            };
        }
    })
    
    for (const pluginType in plugins) {
        for (const plugin of plugins[pluginType]) {
            console.log(plugin.name);
        }
    }
})();