Build notes:

Grunt
1) Grunt is set up to handle 'dev' and 'dist' builds
2) 'grunt dev' is the default and can be run simply by running 'grunt' on the command line
3) 'grunt dev' builds from the 'source' folder to the 'dev' folder whenever there are pertinent file changes.  Local apache server should point to the 'dev' folder.
4) 'grunt dist' builds to the 'dist' folder for deployments
5) There is a lot of unnecessary, time-consuming overhead in the dist build.  It was quickly hacked together and is in desperate need of an overhaul!

NPM
1) We are not committing node modules to source control so 'npm install' is needed on new checkouts for the grunt tasks to work correctly.

Handlebars
1) Using Handlebars to pre-compile client-side includes.
2) Handlebars partials are kept in source/assets/templates, have an .hbs extension, and are prefixed with an underscore.
3) The build script is very basic and does not allow for template nesting or dynamic data; just simple, static partials.

Sass
1) Using Sass as our CSS preprocessor
2) Ruby Gemfile included so you can install the Sass gem by running 'bundle install' from the root directory

Animations
1) The site was initially scrolling-animation heavy so we added a small architecture around that.
2) sceneManager.js creates a Greensock timeline for each .scene class in the html
3) Each of these scene timelines is appended to a main timeline which is moved through on scroll
4) By default, each scene timeline is empty
5) If you want to have something happen for a particular scene on a particular page, you can add a scene function to the individual page's js and sceneManager will use this to determine the behavior.  You can see an example of this in tech.js or demos.js.
6) There is also the ability to offset the start time of each scene animation via an 'offset' variable.  Again, see demos.js for an example.


