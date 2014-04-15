'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	var handlebars = require('handlebars');

	var config = {
		// configurable paths
		src: 'source/ibmwatson',
		dev: 'dev/ibmwatson',
		dist: 'dist/ibmwatson'
	};

	grunt.initConfig({
		config: config,

		// File system watch; specify what tasks to run when files change
		// If you're getting a "watch ENOSPC" error on Linux (likely due to Dropbox), you can increase the max allowed watches with something like:
		// echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
		watch: {
			options: {
				// these two options significantly decrease execution time
				spawn: false,
				interrupt: true
			},

			sass: {
				files: ['<%= config.src %>/assets/sass/**/*'],
				tasks: ['sass']
			},

			templates: {
				files: ['<%= config.src %>/*.html', '<%= config.src %>/assets/templates/**/*.hbs'],
				tasks: ['compileTemplates', 'copy:templates']
			},

			// watch the rest of assets and run copy:dev if they change; some last-minute brute-forcing
			assets: {
				files: ['<%= config.src %>/assets/**/*', '!<%= config.src %>/assets//sass/**/*', '!<%= config.src %>/assets/templates/**/*.hbs'],
				tasks: ['copy:dev']
			}
		},

		// delete tmp files when starting Grunt
		clean: {
			'dev': {
				files: [{
					dot: true,
					src: [
						'./build-source/.tmp',
						'<%= config.dev %>/*',
						'!<%= config.dev %>/.git*'
					]
				}]
			},

			'dist': {
				files: [{
					dot: true,
					src: [
						'./build-source/.tmp',
						'<%= config.dist %>/*',
						'!<%= config.dist %>/.git*'
					]
				}]
			}
		},

		// jshint to catch errors early
		jshint: {
			dev: {
				options: { jshintrc: '.jshintrc' },
				files: [{
					src: [
						'<%= config.src %>/assets/js/**/*.js'
					]
				}]
			},
			dist: {
				options: { jshintrc: '.jshintrc-dist' },
				src: [
					'<%= config.dist %>/assets/js/**/*.js'
				]
			}
		},

		// compile into build-source/.tmp to be copied into correct env
		// folder by usemin or copy task
		'compileTemplates': {
			all: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.src %>',
					dest: './build-source/.tmp',
					src: [
						'*.html'
					]
				}]
			}
		},

		sass: {
			dev: {
				options: {
					sourcemap: 'true',
					style: 'expanded'
				},
				files: [{
					expand: true,
					cwd: '<%= config.src %>/assets/sass',
					src: ['main.scss'],
					dest: '<%= config.dev %>/assets/css/',
					ext: '.css'
				}]
			},

			dist: {
				options: {
					sourcemap: 'false',
					style: 'compressed'
				},
				files: [{
					expand: true,
					cwd: '<%= config.src %>/assets/sass',
					src: ['main.scss'],
					dest: './build-source/.tmp/assets/css/',
					ext: '.css'
				}]
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			options: {
				root: '<%= config.dist %>',
				dest: '<%= config.dist %>'
			},
			html: [
				'./build-source/.tmp/*.html'
			]
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		//
		// Note: Really just using this for the js/css replacement
		//
		// TODO: This does a ton of slow stuff we don't need which causes it to take way longer than necessary.
		//       Not using it to process the HTML but there's no way to turn off those features.
		//       Needs to be replaced with a more targeted build script.
		usemin: {
			options: {
				assetsDirs: ['<%= config.dist %>/assets']
			},
			html: [
				'<%= config.dist %>/*.html'
			],
			css: ['<%= config.dist %>/assets/css/**/*.css']
		},

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.src %>/assets/img',
					src: '**/*.{gif,png,jpg,jpeg}',
					dest: '<%= config.dist %>/assets/img'
				}]
			}
		},

		htmlmin: {
			dist: {
				options: {
					removeCommentsFromCDATA: false,
					collapseWhitespace: false,
					collapseBooleanAttributes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true,
					removeComments: false,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true
				},
				files: [{
					expand: true,
					cwd: './build-source/.tmp/',
					src: ['*.html'],
					dest: '<%= config.dist %>'
				}]
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			templates: { // only used in dev; useminPrepare handles this in dist
				files: [{
					expand: true,
					dot: true,
					cwd: './build-source/.tmp/',
					dest: '<%= config.dev %>',
					src: [
						'*.html'
					]
				}]
			},

			dev: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.src %>',
					dest: '<%= config.dev %>',
					src: [
						'./assets/js/**/*',
						'./assets/img/**/*',
						'./assets/grid/**/*',
						'./assets/fonts/**/*',
						'./assets/video/**/*',
						'./assets/data/**/*',
						'./assets/pdfs/**/*'
					]
				}]
			},

			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.src %>',
					dest: '<%= config.dist %>',
					src: [
						'./assets/grid/**/*',
						'./assets/fonts/**/*',
						'./assets/video/**/*',
						'./assets/data/**/*',
						'./assets/pdfs/**/*'
					]
				}]
			},

			// TODO: remove this last-minute kludge
			// usemin uses relative paths and is expecting to find js under .tmp, not source
			dist_tmp_js: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.src %>',
					dest: './build-source/.tmp',
					src: [
						'./assets/js/**/*'
					]
				}]
			}
		},

		// Run some tasks in parallel to speed up build process
		concurrent: {
			dist: [
				'imagemin'
			]
		}
	});

	grunt.registerMultiTask('compileTemplates', 'Compile templates and output them to static files', function() {
		var self = this;

		registerPartials('source/ibmwatson/assets/templates/**/*.hbs');

		this.files.forEach(function(file) {
			var fileStr = grunt.file.read(file.src),
				layoutTemplate = handlebars.compile(fileStr, {noEscape: true}),
				layoutHtml = layoutTemplate();

			grunt.log.writeln(file.dest);
			//grunt.log.writeln(layoutHtml);

			grunt.file.write(file.dest, layoutHtml);
		});
	});

	// register all matched files as handlebars partials
	function registerPartials(partialsGlob) {
		grunt.log.writeln('Register partials:');

		var partialsFiles = grunt.file.expand(partialsGlob);

		partialsFiles.forEach(function(path) {
			registerPartial(path);
		});
	}

	function registerPartial(path, partialName) {
		var partialFile = grunt.file.read(path),
			partialTemplate = handlebars.compile(partialFile);

		var partialName = (typeof partialName !== 'undefined') ?
			partialName :
			getPartialName(path); // use the file name without the leading '_' and without the file extension as the partial name

		grunt.log.writeln(' - ' + partialName);

		handlebars.registerPartial(partialName, partialTemplate);
	}

	// use the file name without the leading '_' and without the file extension as the partial name
	function getPartialName(path) {
		return path.match(/(?=_)(.*?)(?=\.)/g).toString().substr(1);
	}

	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('dev', [
		//'jshint:dev',
		//'complexity',
		'clean:dev',
		'compileTemplates',
		'copy:templates',
		'copy:dev',
		'sass:dev',
		'watch'
	]);

	grunt.registerTask('dist', [
		//'jshint:dist',
		'clean:dist',
		'compileTemplates',
		'sass:dist',
		'concurrent:dist',
		'copy:dist',
		'copy:dist_tmp_js',
		'useminPrepare',
		'concat',
		'uglify',
		'htmlmin',
		'usemin'
	]);

	grunt.registerTask('default', ['dev']);
};
