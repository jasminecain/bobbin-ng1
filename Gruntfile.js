/*
  configure Grunt to lint, compile Sass, and watch for changes
 */

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        predef: [ "document", "console", "$", "$scope", "firebase" ],
        esnext: true,
        debug: true,
        globalstrict: true,
        globals: {"angular": true, "app": true}
      },
      files: ['app/**/*.js']
    },
    sass: {
      dist: {
        files: {
          'app/styles/css/main.css': 'app/styles/sass/main.scss'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['app/**/*.js'],
        tasks: ['jshint']
      },
      sass: {
        files: ['app/styles/sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'watch']);
};
