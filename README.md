group6.co.nz
============

Jekyll site for GitHub Pages.

Requirements
------------

First ensure [Node.js](http://nodejs.org/) is installed.

Then we need [Grunt](http://gruntjs.com/)...

`npm install -g grunt-cli`

And [Bower](http://bower.io/)...

`npm install -g bower`

We also need Ruby. There's [RubyInstall](http://rubyinstaller.org/) for Windows,
and [RVM](http://rvm.io/) for OS X.
Make sure you install the **Development Kit** as well, it's separate installer
usually (at least for Windows).

Now [Bundler](http://bundler.io/)...

`gem install bundler`

Also [ImageMagick](http://www.imagemagick.org/).

And the Gems from the project directory...

`bundle install`

Jeez!

Development
----------

Run `grunt serve` from the command line to run the local development server

Deployment
----------

`grunt deploy` will compile the site and push to the relevant GitHub repo.
