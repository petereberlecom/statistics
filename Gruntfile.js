module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      files: ['css/{,*/}*.{scss,sass}'],
      tasks: ['sass']
    },

    sass: {
      dist: {
        options:{
          loadPath: 'bower_components/',
          style: 'compressed'
        },
        files: {
          'css/main.css': 'css/main.sass'
        }
      }
    }

  });



  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('serve', ['watch']);

};
