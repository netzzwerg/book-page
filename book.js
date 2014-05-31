(function() {
  'use strict';

  requirejs.config({
    baseUrl: 'bower_components',
    paths: {
      'jquery': 'jquery/jquery.min',
      'ace': 'ace/lib/ace',
      'ace/theme/default': 'weblimejs/lib/theme-default',
      'ace/theme/letterpress': 'weblimejs/lib/theme-letterpress',
      'weblime': 'weblimejs/lib/weblime'
    }
  });

  require(['jquery', 'weblime'], function($, Weblime) {

    new Weblime({
      el: $('.weblime')[0],
      theme: 'monokai',
      path: 'source/',
      callback: function(weblime) {
        console.log(weblime);
      }
    });

    new Weblime({
      el: $('.weblime')[1],
      theme: 'monokai',
      path: 'source/',
      callback: function(weblime) {
        console.log(weblime);
      }
    });

  });

}());