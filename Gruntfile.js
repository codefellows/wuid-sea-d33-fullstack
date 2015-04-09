'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    copy: {
      dev: {
        cwd: 'app/',
        expand: true,
        src: '**/*.html',
        dest: 'build/'
      }
    },

    clean: {
      dev: {
        src: ['build/']
      }
    },

    browserify: {
      dev: {
        src: ['app/js/**/*.js'],
        dest: 'build/client_bundle.js',
        options: {
          transform: ['reactify']
        }
      }
    } 
  });
  grunt.registerTask('build', ['clean:dev', 'browserify:dev', 'copy:dev']);
};
