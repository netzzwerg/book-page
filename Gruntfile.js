/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    connect: {
      server: {
        options: {
          base: 'blog',
          port: 9009,
          useAvailablePort: true,
          hostname: '0.0.0.0', // Change to 0.0.0.0 to external connection.
          open: true,
          middleware: function (connect, options) {
            return [
              require('connect-livereload')({ port: 35729 }),
              // Serve static files.
              connect.static(options.base),
              connect.static('bower_components')
            ];
          }
        }
      }
    },

    watch: {
      scss: {
        files: ['blog/scss/**/*.scss'],
        tasks: ['sass:dist'], // Add more tasks here.
        options: {
          livereload: 35729
        }
      },
      reload: {
        files: ['blog/js/**/*.js' , 'blog/html/**/*.html' , 'blog/css/**/*.css' ],
        tasks: [], // Add more tasks here.
        options: {
          livereload: 35729
        }
      }
    },

    sass: {
      dist: {
        files: [{
          'blog/css/main.css': 'blog/scss/main.scss'
        },{
          'blog/css/index.css': 'blog/scss/page/index.scss'
        },{
          'blog/css/home.css': 'blog/scss/page/home.scss'
        },{
          'blog/css/post.css': 'blog/scss/page/post.scss'
        },{
          'blog/css/book.css': 'blog/scss/page/book.scss'
        }]
      }
    }

  });

  // Load task modules.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task.
  grunt.registerTask('default', 'server');
  grunt.registerTask('server', ['connect', 'watch:scss']);

};