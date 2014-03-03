/*
 * Generated on 2014-02-27
 * generator-assemble v0.4.10
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },
    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      css: {
        files: 'css/scss/_ww_cci.scss',
        tasks: ['sass']
      }
    },
    
    copy: {
      styles: {
        cwd: 'css',
        src: ['**/*', '!**/*.scss', '!scss'],
        dest: '<%= config.dist %>/css',
        expand: true
      },
    },

    sass: {                        
      dist: {                           
        options: {                       
          style: 'expanded'
        },
        files: {                        
          'css/ww_cci.css': 'css/ww_cci.scss'      
        }
      }
    },

    assemble: {
      options: {
        flatten: true,
        expand: true,
        assets: '<%= config.dist %>',
        layout: '<%= config.src %>/templates/layouts/default.hbs',
        data: '<%= config.src %>/data/*.{json,yml}',
        partials: '<%= config.src %>/templates/partials/*.hbs',
        plugins: ['assemble-contrib-permalinks'],
      },
      primary : {
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      },
      solutions : {
        files : {
          '<%= config.dist %>/solutions/' : ['<%= config.src %>/templates/pages/solutions/*.hbs']
        }
      },
      become : {
        options :{
            layout: '<%= config.src %>/templates/layouts/become.hbs'
        },
        files : {
          '<%= config.dist %>/' : ['<%= config.src %>/templates/pages/become/*.hbs']
        }
      }
    },

    prettify: {
      all: {
        expand: true,
        cwd: 'dist/ugly/', 
        ext: '.html',
        src: ['**/*.html'],
        dest: 'dist/'
      }
    },
    clean: ['<%= config.dist %>/**/*.{html,xml, hbs}','<%= config.dist %>/css', '<%= config.dist %>/js','<%= config.dist %>/**/*'  ]

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-prettify');


  grunt.registerTask('server', [
    'clean',
    'assemble',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build', 'sass', 'copy', 'watch'
  ]);
};
