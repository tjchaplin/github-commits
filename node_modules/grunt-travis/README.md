# grunt-travis [![Build Status](https://secure.travis-ci.org/arhea/grunt-travis.png?branch=master)](https://travis-ci.org/arhea/grunt-travis)

Validate and create travis yaml files from your grunt build process.

## Dependencies
You must install the travis-lint gem.

```text
gem install travis-lint
```

## Limitations
Currently the travis-lint script gem is outdated. So with node it says the versions are out of date. They have been fixed in the repository but not pushed out. So it will give you an error there. To work around this currently only use node 0.6.

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-travis`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-travis');
```

## Options

Create a `.travis.yml`
```json
travis: {
  dest: "./.travis.yml",
  language: "node_js",
  node_js: [0.6,0.4],
  validate: true
}
```

Note: The linter only supports node 0.6 and less as officially supported

Just to validate.
```json
travis: {
  src: "./.travis.yml",
  validate: true
}
```


## License
Copyright (c) 2012 Alex Rhea
Licensed under the MIT license.
