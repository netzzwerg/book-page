(function() {
  'use strict';

  var rootPath = '../../../../';

  requirejs.config({
    baseUrl: rootPath + 'bower_components',
    paths: {
      'jquery': 'jquery/jquery.min'
    }
  });

  require(['jquery'], function($) {



  });

}());