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
      serve: {
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
              '/node_modules': './node_modules'
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
        loadPath: ['node_modules']
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
      content: {
        options: {
          sizes: [{
            name: 'pvw',
            filter: 'Gaussian',
            quality: 25,
            width: 100,
          }, {
            name: 'sm',
            quality: 75,
            width: 480,
          }, {
            name: 'md',
            quality: 80,
            width: 656,
          }, {
            name: 'lg',
            quality: 80,
            width: 768,
          }, {
            name: 'xl',
            quality: 80,
            width: 1200,
          }]
        },
        files: [{
          expand: true,
          cwd: '<%= config.src %>/images/content',
          src: '**/*.{jpg,png}',
          dest: '<%= config.temp %>/images/content'
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
      options: {
        dest: '<%=config.dest %>',
        root: './'
      }
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

    // Deploy the site to GitHub
    //
    'gh-pages': {
      options: {
        base: '<%= config.dest %>',
        clone: '.azure',
        repo: 'git@github.com:group6tech/group6.co.nz.git',
        branch: 'azure'
      },
      src: ['**']
    },

    // Tasks which can run at the same time
    //
    concurrent: {
      build: [
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
      'browserSync:serve',
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

  // Deploy
  //
  grunt.registerTask('deploy', [
    'dist',
    'gh-pages'
  ]);

  // Default
  //
  grunt.registerTask('default', [
    'build'
  ]);

  grunt.registerTask('test', [
    'useminPrepare',
    'cssmin'
  ]);
};
