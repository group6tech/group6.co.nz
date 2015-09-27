//
// Gruntfile
// =============================================================================

module.exports = function(grunt) {

  // Show elapsed time after tasks run
  require('time-grunt')(grunt);

  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project Configuration
  // ---------------------------------------------------------------------------

  var config = {
    src: 'app',
    dest: 'dist',
    temp: '.tmp',
    jekyll: '.jekyll'
  };

  // Tasks Configuration
  // ---------------------------------------------------------------------------

  grunt.initConfig({

    // Load the project config
    //
    config: config,

    // Clean up old files
    //
    clean: {
      server: [
        '<%= config.jekyll %>',
        '<%= config.temp %>'
      ],
      dist: [
        '<%= config.dest %>'
      ]
    },

    // Run a local server
    //
    browserSync: {
      server: {
        bsFiles: {
          src: [
            '<%= config.src %>/scripts/**/*.js'
          ]
        },
        options: {
          background: true,
          server: {
            baseDir: [
              '<%= config.jekyll %>',
              '<%= config.temp %>',
              '<%= config.src %>'
            ],
            routes: {
              '/bower_components': './bower_components'
            }
          }
        }
      },
      dist: {
        options: {
          server: '<%= config.dest %>'
        }
      }
    },

    // BrowserSync reload tasks
    //
    bsReload: {
      all: {
        reload: '*.html'
      },
      css: {
        reload: '*.css'
      }
    },

    // Watch file for changes
    //
    watch: {
      options: {
        spawn: false
      },
      jekyll: {
        files: ['<%= config.src %>/**/*.{html,md}', '<%= config.src %>/*.yml'],
        tasks: ['jekyll:server', 'bsReload:all']
      },
      js: {
        files: [
          'Gruntfile.js',
          '<%= config.src %>/scripts/{,*/}*.js'
        ],
        tasks: ['jshint']
      },
      sass: {
        files: ['<%= config.src %>/_styles/{,*/}*.scss'],
        tasks: ['sass:server', 'bsReload:css']
      }
    },


    // Copy assets around that aren't normally moved
    //
    copy: {
      build: {
        files: [
          { expand: true, flatten: true, src: 'bower_components/font-awesome/fonts/*', dest: '<%= config.temp %>/fonts' }
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.jekyll %>',
          src: [
            'rss/**'
          ],
          dest: '<%= config.dest %>'
        }, {
          expand: true,
          cwd: '<%= config.src %>',
          src: [
            '*.{ico,json,png,txt,xml}',
            'CNAME',
            'images/**'
          ],
          dest: '<%= config.dest %>'
        }, {
          expand: true,
          cwd: '<%= config.temp %>',
          src: [
            'fonts/**',
            'images/**'
          ],
          dest: '<%= config.dest %>'
        }]
      }
    },

    // Compile the Jekyll resources
    //
    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml',
        src: '<%= config.src %>'
      },
      server: {
        options: {
          dest: '<%= config.jekyll %>'
        }
      }
    },

    // Compile the Sass stylesheets
    //
    sass: {
      options: {
        loadPath: ['bower_components']
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/_styles',
          src: '*.scss',
          dest: '<%= config.temp %>/styles',
          ext: '.css'
        }]
      }
    },

    // Generate responsive images
    //
    responsive_images: {
      options: {
        engine: 'im',
        newFilesOnly: true
      },
      clients: {
        options: {
          sizes: [{
            name: 'thumb',
            quality: 70,
            width: 440,
          }, {
            name: 'full',
            quality: 70,
            width: 1440
          }]
        },
        files: [{
          expand: true,
          cwd: '<%= config.src %>/images/clients',
          src: '**/*.{jpg,png}',
          dest: '<%= config.temp %>/images/clients'
        }]
      },
      index: {
        options: {
          sizes: [{
            quality: 80,
            width: 1440
          }]
        },
        files: [{
          expand: true,
          cwd: '<%= config.src %>/images/index',
          src: '**/*.{jpg,png}',
          dest: '<%= config.temp %>/images/index'
        }]
      },
      services: {
        options: {
          sizes: [{
            quality: 80,
            width: 1440
          }]
        },
        files: [{
          expand: true,
          cwd: '<%= config.src %>/images/services',
          src: '**/*.{jpg,png}',
          dest: '<%= config.temp %>/images/services'
        }]
      }
    },

    // Check js files for issues
    //
    jshint: {
      all: [
        'Gruntfile.js',
        '<%= config.src %>/scripts'
      ]
    },


    // Prepare the use min tasks
    //
    useminPrepare: {
      html: '<%= config.jekyll %>/index.html',
      dest: '<%= config.dest %>'
    },

    // Join files together
    //
    concat: {

    },

    // Uglify Javascript
    //
    uglify: {

    },

    // Minify css
    //
    cssmin: {

    },

    // Apply the minified links
    //
    usemin: {
      html: '<%= config.jekyll %>/**/*.html',
      dest: '<%= config.dest %>'
    },

    // Minify the HTML
    //
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.jekyll %>',
          src: '**/*.html',
          dest: '<%= config.dest %>'
        }]
      }
    },

    // Tasks which can run at the same time
    //
    concurrent: {
      build: [
        'copy:build',
        'jekyll:server',
        'responsive_images',
        'sass:server'
      ]
    }
  });



  // Tasks
  // ---------------------------------------------------------------------------

  // Build
  //
  grunt.registerTask('build', [
    'clean:server',
    'concurrent:build'
  ]);

  // Serve
  //
  grunt.registerTask('serve', 'start the server and preview your app', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['dist', 'browserSync:dist']);
    }

    grunt.task.run([
      'build',
      'browserSync',
      'watch'
    ]);
  });

  // Dist
  //
  grunt.registerTask('dist', [
    'clean:dist',
    'build',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'usemin',
    'htmlmin',
    'copy:dist'
  ]);

  // Default
  //
  grunt.registerTask('default', [
    'build'
  ]);
};
