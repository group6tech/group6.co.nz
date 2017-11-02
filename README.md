group6.co.nz
============

Jekyll site for GitHub Pages.

Requirements
------------

First ensure [Node.js](http://nodejs.org/) is installed.

Then we need [Grunt](http://gruntjs.com/)...

`npm install -g grunt-cli`

And [Yarn](https://yarnpkg.com/en/...

We also need Ruby. There's [RubyInstall](http://rubyinstaller.org/) for Windows,
and [RVM](http://rvm.io/) for OS X.
Make sure you install the **Development Kit** as well, it's separate installer
usually (at least for Windows).

Now [Bundler](http://bundler.io/)...

`gem install bundler`

Also [ImageMagick](http://www.imagemagick.org/). Make sure you install **legacy utilities**.

And the Gems from the project directory...

`bundle install`

Jeez!

Now you can install the Node modules.
If Windows, make sure you run it from the **Developer Command Prompt for VS2015**.

`npm install`

And the Yarn modules

`yarn install`


Development
----------

Run `grunt serve` from the command line to run the local development server

Deployment
----------

`grunt deploy` will compile the site and push to the relevant GitHub repo.
