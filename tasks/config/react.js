module.exports = function(grunt) {

    grunt.config.set('react', {
        dev: {
            files: [{
                expand: true,
                cwd: 'assets/jsx',
                src: ['**/*.jsx'],
                dest: '.tmp/public/jsx',
                ext: '.js'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-react');
};