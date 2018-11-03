# Sinclair.Bio website

Based on a jekyll theme for dental clinics. But then heavily modified.

* Here is a live demo of the original:       http://obaez.com/dentistsmile/
* Here is the documentation of the original: http://obaez.com/dentistsmile-docs/
* Here is the original repo:                 https://github.com/obaez/dentistsmile/

## Versions
* Development version:        http://127.0.0.1:4000
* Preview version:            http://sinclair.bio.github.io
* Online production version:  http://sinclair.bio

## Installing
The `npm` tool should come with your OS. To get the dependencies to run the next steps, you need to do:

    $ npm install

## Running
To re-generate the website, there are some grunt tasks to run:

    $ rm -rf _site/; grunt concat; grunt uglify; grunt sass; grunt autoprefixer; grunt svgmin;  grunt svgstore; grunt shell:jekyllBuild; grunt serve

In particular if you only need to generate the CSS form the SCSS:

    $ touch _scss/main.scss
    $ grunt sass

## Serving
To serve the website:

    $ grunt serve