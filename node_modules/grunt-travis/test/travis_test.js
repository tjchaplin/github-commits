var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['travis'] = {
  setUp: function(done) {
    "use strict";

    done();
  },
  'node': function(test) {

    "use strict";

    var data = {
      language: "node_js",
      node_js: ["0.8","0.6"]
    };

    var expected = "language: node_js\n";
    expected += "node_js:\n";
    expected += "  - 0.8\n";
    expected += "  - 0.6";

    test.equal(grunt.helper('travisBuildFile',data), expected, 'Test to make sure node files are being built correctly');

    test.done();
  },
  'c': function(test) {

    "use strict";

    var data = {
      language: "c",
      compiler: ["gcc","clang"],
      script: "./configure && make"
    };

    var expected = "language: c\n";
    expected += "compiler:\n";
    expected += "  - gcc\n";
    expected += "  - clang\n";
    expected += "script: ./configure && make";

    test.equal(grunt.helper('travisBuildFile',data), expected, 'Test to make sure c files are being built correctly');

    test.done();

  },
  'cplusplus': function(test) {

    "use strict";

    var data = {
      language: "cpp",
      compiler: ["gcc","clang"],
      script: "./configure && make"
    };

    var expected = "language: cpp\n";
    expected += "compiler:\n";
    expected += "  - gcc\n";
    expected += "  - clang\n";
    expected += "script: ./configure && make";

    test.equal(grunt.helper('travisBuildFile',data), expected, 'Test to make sure c++ files are being built correctly');

    test.done();

  },
  'clojure': function(test) {

    "use strict";

    var data = {
      language: "clojure",
      jdk: ["oraclejdk7","openjdk7","openjdk6"],
      lein: "lein2"
    };

    var expected = "language: clojure\n";
    expected += "lein: lein2\n";
    expected += "jdk:\n";
    expected += "  - oraclejdk7\n";
    expected += "  - openjdk7\n";
    expected += "  - openjdk6";

    test.equal(grunt.helper('travisBuildFile',data), expected, 'Test to make sure clojure files are being built correctly');

    test.done();

  },
  'erlang': function(test) {

    "use strict";

    var data = {
      language: "erlang",
      otp_release: ["R15B02","R15B01","R14B04"]
    };

    var expected = "language: erlang\n";
    expected += "otp_release:\n";
    expected += "  - R15B02\n";
    expected += "  - R15B01\n";
    expected += "  - R14B04";

    test.equal(grunt.helper('travisBuildFile',data), expected, 'Test to make sure erlang files are being built correctly');

    test.done();

  },
  'haskell': function(test) {

    "use strict";

    var data = {
      language: "haskell"
    };

    var expected = "language: haskell";

    test.equal(grunt.helper('travisBuildFile',data), expected, 'Test to make sure haskell files are being built correctly');

    test.done();

  },
  'go': function(test) {

    "use strict";

    var data = {
      language: "go"
    };

    var expected = "language: go";

    test.equal(grunt.helper('travisBuildFile',data), expected, 'Test to make sure go files are being built correctly');

    test.done();

  },
  'groovy': function(test) {

    "use strict";

    var data = {
      language: "groovy",
      jdk: ["oraclejdk7","openjdk7","openjdk6"]
    };

    var expected = "language: groovy\n";
    expected += "jdk:\n";
    expected += "  - oraclejdk7\n";
    expected += "  - openjdk7\n";
    expected += "  - openjdk6";

    test.equal(grunt.helper('travisBuildFile',data), expected, 'Test to make sure groovy files are being built correctly');

    test.done();

  },
  'java': function(test) {

    "use strict";

    var data = {
      language: "java",
      jdk: ["oraclejdk7","openjdk7","openjdk6"]
    };

    var expected = "language: java\n";
    expected += "jdk:\n";
    expected += "  - oraclejdk7\n";
    expected += "  - openjdk7\n";
    expected += "  - openjdk6";

    test.equal(grunt.helper('travisBuildFile',data), expected, 'Test to make sure java files are being built correctly');

    test.done();

  },
  'scala': function(test) {

    "use strict";

    var data = {
      language: "scala",
      scala: ["2.9.2","2.8.2"],
      jdk: ["oraclejdk7","openjdk7","openjdk6"]
    };

    var expected = "language: scala\n";
    expected += "scala:\n";
    expected += "  - 2.9.2\n";
    expected += "  - 2.8.2\n";
    expected += "jdk:\n";
    expected += "  - oraclejdk7\n";
    expected += "  - openjdk7\n";
    expected += "  - openjdk6";

    test.equal(grunt.helper('travisBuildFile',data), expected, 'Test to make sure scala files are being built correctly');

    test.done();

  }
};
