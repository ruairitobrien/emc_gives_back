# About

This app is intended to be used by children with learning disabilities.

The use case is a child that would use either a tablet or a computer to engage with the content. The content should be customizable by the child or his/her parents, i.e. adding custom photos, sounds, etc.

# Getting Started
* install [git](http://git-scm.com/downloads)
    * allow access to git repositories through proxy: 
        `git config --global url."https://".insteadOf git://`
    * `git clone http://IAS00HYC6T01.isus.emc.com/ahlmaj/emc_gives_back.git`
* install [node js](https://nodejs.org/)
* on the command line ("Start - Run - cmd.exe")
    * install grunt (`npm install -g grunt-cli`)
    * install bower (`npm install -g bower`)
    * install ionic (`npm install -g ionic`)
    * navigate to project directory and install dependencies
        * `npm install`
        * `bower install`
    * serve in local browser (`grunt serve`)
* now the website will automatically update in browser whenever you change/save a file


# Background
* This app is written in [ionic](http://ionicframework.com/) which is a mobile-optimized HTML5 framework built on top of [angular js](https://angularjs.org/).
* The entire application logic, templates and assets are located in the "www/" folder, so all your changes should be done there.
* `www/index.html` is the starting point of your application, but it contains mostly administrative code and markup
* `www/js` contains the application code
* `www/templates` contains the HTML templates used to render the application
* `www/css` contains the CSS styles used to assign colors, positioning to the templates


# HTML5 Learning Resources
* you will mostly be editing HTML and CSS files
* please find below a couple of resources for understanding either of those
* [Codecademy - Web beginner](http://www.codecademy.com/courses/web-beginner-en-HZA3b/)
* [Codecademy - Make a website](http://www.codecademy.com/en/skills/make-a-website/)


