/*
* jsGeneratorBean
* JavaScript POJO generator based on a json signature.
* @autor: Miller Augusto Silva Martins
* @email: miller.augusto@gmail.com
**/
var jsGeneratorBean = function(config){
  var declarationVariables = '';
  var constructor = '';
  var proto = '';
  
  for(key in config.signature){
    constructor += '    	    bean.set' + key.replace((key.substring(0,1)), (key.substring(0,1)).toUpperCase()) + '(data[0].' + key + ');\n';
    declarationVariables += '    	this.' + key + ';\n';
    
    proto += '\n\n';
    proto += '    	 /*\n';
    proto += '    	 * ' + key + '\n';
    proto += '    	 */\n';
    proto += '    	 set' + key.replace((key.substring(0,1)), (key.substring(0,1)).toUpperCase()) + ' : function(value) {\n';
    proto += '    	 	    this.' + key + ' = value;\n';
    proto += '    	 },\n';
    proto += '    	 get' + key.replace((key.substring(0,1)), (key.substring(0,1)).toUpperCase()) + ' : function() {\n';
    proto += '    	 	    return this.' + key + ';\n';
    proto += '    	 },';
  }
  
  proto = proto.substring(0,(proto.length - 1));
  
  var bean = '';
      bean += '\n\n';
      bean += '\n/*\n';
      bean += '* Class ' + config.name + '\n';
      bean += '*/\n';
      bean += 'var ' + config.name + ' = function() {\n\n';
  
      bean += '    	/*\n';
      bean += '    	 * Constructor\n';
      bean += '    	 */\n';
  
      bean += '    	(arguments.length > 0) ? (function(data, bean) {\n';
      bean += constructor;
      bean += '    	})(arguments, this) : \'\';\n\n';
  
      bean += '    	/*\n';
      bean += '    	 * Declaration of variables\n';
      bean += '    	 */\n';
      bean += declarationVariables;
  
      bean += '\n';
      bean += '};\n\n';
  
      bean += '/*\n';
      bean += '* POJO Bean\n';
      bean += '*/\n';
  
      bean += config.name + '.prototype = {';
      bean += proto;
      bean += '\n};';
      bean += '\n\n\n';

  if(config.angular){
      bean = config.appName + '.factory(\'' + config.name + '\', [ function() {' + bean + ' return ' + config.name + ';\n\n' + '} ]);';
  }
  
  console.info(config.name + '.js');
  console.log(bean);
  return bean;
};
