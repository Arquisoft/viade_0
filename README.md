[![Build Status](https://travis-ci.org/pglez82/travisreact_tut.svg?branch=master)](https://travis-ci.org/pglez82/travisreact_tut.svg) [![codecov](https://codecov.io/gh/pglez82/travisreact_tut/branch/master/graph/badge.svg)](https://codecov.io/gh/pglez82/travisreact_tut) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/2f1d352bb3c8454cb77353f3e2098476)](https://www.codacy.com/manual/pglez82/travisreact_tut?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=pglez82/travisreact_tut&amp;utm_campaign=Badge_Grade)

This project shows how to create a new react webapp and configure it using travis in order to enable continuous integration.

## Setting up the enviroment
We are going to prepare the enviroment using docker. This way we will ensure that the setup will work without depending on our local setup. Lets create a Ubuntu 16.04LTS container as our development enviroment:
```
docker run -it -v "$PWD/Proyectos/travisreact_tut":/webapps -p 3000:3000 --name travisreact_tut ubuntu:16.04
```

This Ubuntu 16.04 image does not have Node installed. We could have chosen here a docker image with node but we are using this one in order to illustrate how to **install node** in Ubuntu:
```bash
apt-get update
apt-get install curl
curl -sL https://deb.nodesource.com/setup_12.x | bash -
apt-get install nodejs
```
With node installed we have **npm** and **npx** available that will be used in the next steps.

Let's install also the git client. We will use this as travis needs that our code is hosted in the control version system:
```
apt-get install git
```
Also install nano our your other text editor of your preference:
```
apt-get install nano
```

## Creating the react app

The easiest way to create a react app is to use the project [create react app](https://github.com/facebook/create-react-app), that not only creates a react application but configures it propertly. Among other things we will get:
  * Simple react web application working
  * Unit tests configured and ready to work
  * Git repository initialized locally

In order to use this project, the only required step is to execute (in the directory that we want the project to be generated, in our case **/webapps**):
```javascript
cd /webapps
npx create-react-app travisreact_tut
```
This code will work considering that we have properly installed node.
The name *travistest* is the name of our application. The generator will generate a directory with the app inside. If we want to start our app in a local server, we just need to type:
```javascript
cd travisreact_tut
npm start
```
We can see our application in http://localhost:3000 . It is important to understand that this method is only good for develpment purposes because the react (JSX) code from react is translated on the fly (thus, it is slow). If we want to 'compile' the code and create html, javascript and css files only, we can execute `npm run build`.

After checking that everything is working propertly, we need to create a new git repository to host our application and push the application to it. In my case I will create the repository **travisreact_tut**.


## Configure travis
Create a [Travis](https://travis-ci.org/) account. It is important to note that travis is free for our GitHub public respositories. Configure Travis to monitor the git repository where you host your app (in my case **travisreact_tut**). Everytime that Travis detects a new commit it will test the application and if the tests are correct, the application will be deployed automatically. For this to work, we need to give Travis permissions to work in our GitHub account:
  * Configure a GitHub access token. This is in done in the "global settings page>Developer Settings>Personal access tokens".  
  * Create an enviroment variable in travis called github_token with the value obtained in the previous step.

Now, we got to the most important part, the **.travis.yml** file. This file should be in the project root:
```
language: node_js
node_js:
  - 12.14.0
cache:
  directories:
  - node_modules
script:
  - npm test
  - npm run build
deploy:
  provider: pages
  skip_cleanup: true
  github_token: $github_token
  local_dir: build
  on:
    branch: master
```
We also need to configure the file `package.json`. In this file we will add a new line indicating where our application will be deployed:
```json
"homepage": "https://pglez82.github.io/travisreact_tut/",
```

As a final step, we need to make sure that we are using the gh-pages branch as our repository page (this is configured in the settings part of our repository).

## Final tests
Change the App.js page, modify the tests and make a commit. Travis should detect the commit, create a new virtual enviroment where it will download the code, execute the tests (npm test) and then, if the tests are passed, execute npm build to build a release and deploy it to github pages.

## Codecov
Codecov is a tool that allows us to see which part of the code is covered by the tests and which part is not. This tool is very easy to integrate with Travis. We only have to follow the following steps:
1. Create an account in [Codecov](https://codecov.io). Log in using your Git account so Codecov can find your repositories. Codecov is free for public repositories.
2. Look for your Git repository in your Codecov dashboard
3. Configure your app so it generates a code coverage report and uploads it to the Codecov dashboard. We need to make two modifications for this:

File *package.json*. Add `--coverage` so Jest generates a code coverage report.
```
"test": "react-scripts test --coverage",
```
File *.travis.yml*. In the script section, add the following:
```
  - npm install -g codecov
  - npm test && codecov
```

If now we make a new commit, a code coverage report will be created that will be analized by the Codecov tool and uploaded to the Codecov.io website. We can check this report in our Codecov dashboard.

Codecov can be configured. For instance we may want to ignore some files that do not need to be tested. We are going to use this for not analyzing the `index.js` file.

File *codecov.yml* (place this file in the project root)
```json
ignore:
  - "src/index.js"
```
For more configuration options you can check: [About the Codecov yaml](https://docs.codecov.io/docs/codecov-yaml).

## Arc42 documentation [under construction]
Under the directory src/docs we have the documentation in AsciiDoc format (template downloaded from [here](https://arc42.org/download)). We are going to install first the required packages for generate the documentation in html from this asciidoc files:
```bash
apt-get install ruby openjdk-8-jre
gem install asciidoctor asciidoctor-diagram
```
Note: openjdk-8-jre and asciidoctor-diagram are only required if we want to use **PlantUML** to build UML diagrams.

After we have the required tools, we can generate the help files (execute this in the project root):
```bash
asciidoctor -D ../../build/docs -B src/docs -a imagesdir=./images -r asciidoctor-diagram src/docs/index.adoc
cp -R src/docs/images build/docs
```
So know our site with the documentation is in build/docs. The idea is to deploy it along the main website. Obviously this is optional. In this example we are going to integrate it with npm and travis.


