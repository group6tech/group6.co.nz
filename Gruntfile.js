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
    src: './app',
    dest: './dist',
    temp: './.tmp',
    jekyll: './.jekyll'
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
      }
    },

    // BrowserSync reload tasks
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
    copy: {
      build: {
        files: [
          { expand: true, flatten: true, src: 'bower_components/font-awesome/fonts/*', dest: '<%= config.temp %>/fonts' }
        ]
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
    responsive_images: {
      options: {
        engine: 'im',
        newFilesOnly: true
      },
      build: {
        options: {
          sizes: [{
            name: 'sm',
            width: 480,
          }, {
            name: 'md',
            width: 768,
          }, {
            name: 'lg',
            width: 992
          }, {
            name: 'xl',
            width: 1140
          }]
        },
        files: [{
          expand: true,
          cwd: '<%= config.src %>/images/clients',
          src: '**/*.{jpg,png}',
          dest: '<%= config.temp %>/images/clients'
        }]
      }
    },

    // Check js files for issues
    jshint: {
      all: [
        'Gruntfile.js',
        '<%= config.src %>/scripts'
      ]
    },

    // Tasks which can run at the same time
    //
    concurrent: {
      build: [
        'copy:build',
        'jekyll:server',
        'responsive_images:build',
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
  grunt.registerTask('serve', [
    'build',
    'browserSync',
    'watch'
  ]);

  // Default
  //
  grunt.registerTask('default', [
    'build'
  ]);
};
