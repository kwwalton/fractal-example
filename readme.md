Purpose: Set up a starter kit for Fractal pattern library as part of a front-end toolkit using Gulp, Sass, Handlebars, Webpack, and Git.

Instructions:
To install, clone the repository and 
- install Node if not yet installed. I am on a Mac using NVM, Node Version 13.8.0
- install Gulp if not yet installed. I am using Gulp 4.0.2
- in a command window, type "npm install"

To run in development mode
- in command window at the root of the project, enter "gulp"
- now open your web browser and visit "localhost:3000"

To build the project so you can host it somewhere
- in command window at the root of the project, enter "gulp build"
- this compiles everything into the "build" folder

ToDo: Set up JavaScript and Webpack, Write instructions, Add linting for Sass and JS. Also arrange components folder to follow GE's Predix Design System, a variation on the atomic design system.

All Fractal configuration done in the package.json and the gulpfile.js instead of using a fractal.js file.

Resources:
- https://fractal.build/
- https://www.smashingmagazine.com/2018/07/pattern-library-first-css/
- https://medium.com/ge-design/ges-predix-design-system-8236d47b0891
- https://github.com/nvm-sh/nvm
  I did not use Homebrew, just put "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash" in a Terminal window and hit enter. Then followed https://osxdaily.com/2014/02/12/install-command-line-tools-mac-os-x/ so I didnt need XCode.