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
      ]
    },

    // Run a local server
    //
    browserSync: {
      bsFiles: {
        src : [
          '<%= config.temp %>/styles/*.css',
          '<%= config.jekyll %>/*.html'
        ]
      },
      options: {
        watchTask: true,
        server: {
          baseDir: ['<%= config.jekyll %>', '<%= config.temp %>'],
          routes: {
            '/bower_components': './bower_components'
          }
        }
      }
    },

    // Watch file for changes
    //
    watch: {
      jekyll: {
        files: ['<%= config.src %>/**/*.{html,md}', '<%= config.src %>/*.yml'],
        tasks: ['jekyll:server']
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
        tasks: ['sass:server']
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
        'jekyll:server',
        'sass:server',
        'copy:build'
      ]
    }
  });



  // Tasks
  // ---------------------------------------------------------------------------

  // Build
  //
  grunt.registerTask('build', [
    'clean:server',
    'concurrent:build',
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
