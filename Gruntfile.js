module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ";\n\n"
      },
      ww: {
        nonull: true,
        src: [
          'js/src/ibm/common/lib/modernizr.js',
          'js/src/ibm/common/util/dojo-loader.js',
          'js/src/ibm/common/lib/jquery.js',
          'js/src/ibm/common/util/ibm-core.js',
          'js/src/ibm/common/lib/mlpushmenu.jquery.js',
          'js/src/ibm/common/widget/accordion.js',
          'js/src/ibm/ww/init.js'
        ],
        dest: 'js/build/ww.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'js/build/ww.min.js': ['js/build/ww.js']
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-concat');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify']);  //

};