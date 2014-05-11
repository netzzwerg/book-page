/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    connect: {
      server: {
        options: {
          port: 9000,
          hostname: '0.0.0.0', // Change to 0.0.0.0 to external connection.
          open: true,
          middleware: function (connect, options) {
            return [
              require('connect-livereload')({ port: 35729 }),
              // Serve static files.
              connect.static(options.base),
            ];
          }
        }
      }
    },

    watch: {
      scss: {
        files: ['scss/**/*.scss'],
        tasks: ['compass'], // Add more tasks here.
        options: {
          livereload: 35729
        }
      },
      reload: {
        files: ['book.js' , 'index.html' , 'main.css' ],
        tasks: [], // Add more tasks here.
        options: {
          livereload: 35729
        }
      }
    },

    compass: {
      build: {
        options: {
          relativeAssets: true,
          sassDir: 'scss',
          cssDir: '',
          environment: 'development',
          outputStyle: 'expanded',
          imagesDir: 'img'
        }
      }
    }

  });

  // Load task modules.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task.
  grunt.registerTask('default', 'server');
  grunt.registerTask('server', ['connect', 'watch:scss']);

};