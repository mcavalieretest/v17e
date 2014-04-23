module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ";"
      },
      dist: {
        src: ['js/src/foo.js', 'js/src/bar.js', 'js/src/baz.js'],
        dest: 'js/build/combined.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        // files: {
        //     'js/build/ww.min.js': ['js/src/ww.js']
        // }
        files: {
          'js/ww.min.js': ['js/ww.js'],
          // 'js/build/combined.min.js', ['js/build/combined.js']
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-concat');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify']);

};