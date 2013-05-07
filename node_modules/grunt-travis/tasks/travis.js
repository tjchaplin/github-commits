/*
 * grunt-travis
 * https://github.com/arhea/grunt-travis
 *
 * Copyright (c) 2012 Alex Rhea
 * Licensed under the MIT license.
 */

 "use strict";

module.exports = function(grunt) {

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerTask('travis', 'Validate your travis yaml files', function() {

    var data = grunt.utils._.extend({},{
      src: "./.travis.yml",
      dest: "./.travis.yml",
      validate: true
    },grunt.config("travis"));

    var file = data.src;

    if(data && data.language) {
      var content = grunt.helper('travisBuildFile',data);

      if(data.dest) {
        file = data.dest;
      } else {
        grunt.log.error("You must provide a destination file for your yaml file.");
      }

      file = data.dest;
      grunt.file.write(file , content);
      grunt.log.writeln(file + " successfully written.");
    }

    if(data.validate) {
      var exec = require('child_process').exec;
      var done = this.async();
      grunt.log.writeln("Validating File...");

      exec("travis-lint " + file, function(error, stdout, stderr){

        grunt.log.writeln("Process Complete!");

        if(error) {
          grunt.log.writeln("Process complete with errors");
          grunt.log.error( stderr );
          done( false );
        } else {
          grunt.log.writeln("Process Complete!");
          grunt.log.writeln( "Travis Output:" );
          grunt.log.write( stdout );
          done( true );
        }

      });
    }

  });

  grunt.registerHelper('travisBuildFile',function(data) {

    var content = "";

    if(data.language) {
      content = content + grunt.helper('travisBuildFileFormat',"language",data.language);
    }

    if(data.lein) {
      content = content + grunt.helper('travisBuildFileFormat',"lein",data.lein);
    }

    if(data.compiler) {
      content = content + grunt.helper('travisBuildFileList',"compiler",data.compiler);
    }

    if(data.scala) {
      content = content + grunt.helper('travisBuildFileList',"scala",data.scala);
    }

    if(data.jdk) {
      content = content + grunt.helper('travisBuildFileList',"jdk",data.jdk);
    }

    if(data.otp_release) {
      content = content + grunt.helper('travisBuildFileList',"otp_release",data.otp_release);
    }

    if(data.node_js) {
      content = content + grunt.helper('travisBuildFileList',"node_js",data.node_js);
    }

    if(data.perl) {
      content = content + grunt.helper('travisBuildFileList',"perl",data.perl);
    }

    if(data.php) {
      content = content + grunt.helper('travisBuildFileList',"php",data.php);
    }

    if(data.python) {
      content = content + grunt.helper('travisBuildFileList',"python",data.python);
    }

    if(data.rvm) {
      content = content + grunt.helper('travisBuildFileList',"rvm",data.rvm);
    }

    if(data.before_install) {
      content = content + grunt.helper('travisBuildFileList',"before_install",data.before_install);
    }

    if(data.after_install) {
      content = content + grunt.helper('travisBuildFileList',"after_install",data.after_install);
    }

    if(data.install) {
      content = content + grunt.helper('travisBuildFileFormat',"install",data.install);
    }

    if(data.before_script) {
      content = content + grunt.helper('travisBuildFileList',"before_script",data.before_script);
    }

    if(data.after_script) {
      content = content + grunt.helper('travisBuildFileList',"after_script:",data.after_script);
    }

    if(data.script) {
      content = content + grunt.helper('travisBuildFileFormat',"script",data.script);
    }

    if(data.after_success) {
      content = content + grunt.helper('travisBuildFileList',"after_success",data.after_success);
    }

    if(data.after_failure) {
      content = content + grunt.helper('travisBuildFileList',"after_failure",data.after_failure);
    }

    return grunt.utils.normalizelf(content.trim());

  });

  grunt.registerHelper('travisBuildFileFormat',function(key,value) {

    return key + ": " + value + "\n";
  });

  grunt.registerHelper('travisBuildFileList',function(name,data) {

    if(grunt.utils.kindOf(data) === "string") {
      data = [data];
    }

    var content = name + ":\n";

    for(var i=0; i<data.length; i++) {
      content = content + "  - " + data[i] + "\n";
    }

    return content;

  });

};