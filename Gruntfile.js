module.exports = function(grunt) {
  var BANNER = '/*! \n'
              + ' * Name: ibm.com v17e JS file\n'
              + ' * Version <%= pkg.version %>\n'
              + ' * Built: <%= grunt.template.today("longTime") %>\n'
              + ' * Owner: Corporate Webmaster (NUS_N_NIWWW)\n'
              + ' * Copyright (c) 2013 IBM Corporation\n'
              + ' */\n'
              + '\n\n'
              + '// URI: www.ibm.com/common/v17e/js/ww.js\n'
              + '// Description: Official JS file for v17e project\n'
              + '//\n';

  var CORE_LIBS_PATHS = [
    'js/src/ibm/common/lib/modernizr.js',
    'js/src/ibm/common/util/dojo-loader.js',
    'js/src/ibm/common/lib/jquery.js',
    'js/src/ibm/common/util/ibm-core.js',
    'js/src/ibm/common/lib/mlpushmenu.jquery.js',
    'js/src/ibm/common/widget/accordion.js',
    'js/src/ibm/ww/init.js'
  ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ";\n\n"
      },
      dev: {
        nonull: true,
        src: CORE_LIBS_PATHS,
        dest: 'js/build/ww.dev.js'
      },
      prod: {
        nonull: true,
        src: CORE_LIBS_PATHS,
        dest: 'js/build/ww.prod.js'
      }
    },

    uglify: {
      options: {
        banner: BANNER
      },
      build: {
        files: {
          'js/build/ww.prod.min.js': ['js/build/ww.prod.js']
        }
      }
    }
  });

  var target = grunt.option("target");

  if (typeof(target) == "undefined") {
    grunt.fail.warn("A target must be specified using the --target=[target] option. Valid targets are \"dev\" and \"prod\".");
  }

  grunt.loadNpmTasks('grunt-contrib-concat');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  var taskList = ['concat:'+target];

  if (target == "prod") {
    taskList.push("uglify");
  }

  // Default task(s).
  grunt.registerTask('default', taskList);  //, 'uglify'
};