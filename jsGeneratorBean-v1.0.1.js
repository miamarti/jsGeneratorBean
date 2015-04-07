/*
* jsGeneratorBean
* JavaScript POJO generator based on a json signature.
* @autor: Miller Augusto Silva Martins
* @email: miller.augusto@gmail.com
**/
String.prototype.camelCase = function() {
  var s = (this).replace(/_/g, ' ');
	return (s || '').toLowerCase().replace(/(\b|-)\w/g, function(m) {
	    return m.toUpperCase().replace(/-/, '');
	}).replace(/\s/gi, '');
};
var jsGeneratorBean = function(config){
  var declarationVariables = '';
  var constructor = '';
  var proto = '';
  config.name = config.name.camelCase() + 'Bean';
  
  for(key in config.signature){
    var factor = key.camelCase();
    constructor += '        	    bean.set' + factor.replace((factor.substring(0,1)), (factor.substring(0,1)).toUpperCase()) + '(data[0].' + factor + ');\n';
    declarationVariables += '        	this.' + factor + ';\n';
    
    proto += '\n\n';
    proto += '        	 /*\n';
    proto += '        	 * ' + factor + '\n';
    proto += '        	 */\n';
    proto += '        	 set' + factor.replace((factor.substring(0,1)), (factor.substring(0,1)).toUpperCase()) + ' : function(value) {\n';
    proto += '        	 	    this.' + factor + ' = value;\n';
    proto += '        	 },\n';
    proto += '        	 get' + factor.replace((factor.substring(0,1)), (factor.substring(0,1)).toUpperCase()) + ' : function() {\n';
    proto += '        	 	    return this.' + factor + ';\n';
    proto += '        	 },';
  }
  
  proto = proto.substring(0,(proto.length - 1));
  
  var bean = '';
      bean += '\n';
      bean += '\n    /*\n';
      bean += '    * Class ' + config.name + '\n';
      bean += '    */\n';
      bean += '    var ' + config.name + ' = function() {\n\n';
  
      bean += '        	/*\n';
      bean += '        	 * Constructor\n';
      bean += '        	 */\n';
  
      bean += '        	(arguments.length > 0) ? (function(data, bean) {\n';
      bean += constructor;
      bean += '        	})(arguments, this) : \'\';\n\n';
  
      bean += '        	/*\n';
      bean += '        	 * Declaration of variables\n';
      bean += '        	 */\n';
      bean += declarationVariables;
  
      bean += '\n';
      bean += '    };\n\n';
  
      bean += '    /*\n';
      bean += '    * POJO Bean\n';
      bean += '    */\n';
  
      bean += '    ' + config.name + '.prototype = {';
      bean += proto;
      bean += '\n    };';
      bean += '\n\n\n';

  if(config.angular){
      bean = config.appName + '.factory(\'' + config.name + '\', [ function() {' + bean + '    return ' + config.name + ';\n\n' + '} ]);';
  }
  
  try {
      document.getElementById('jsGeneratorBean-fileName').innerHTML = config.name + '.js';    
  } catch (e) {
  }
 
  return bean;
};
