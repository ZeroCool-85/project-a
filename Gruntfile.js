module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'modules/index.js',
                    'modules/addon_shit.js'
                ],
                dest: 'public_html/script.js'
            }
        },

        watch: {
            scripts: {
                files: ['**/*.js'],
                tasks: ['concat'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-fast-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Default task(s).
    grunt.registerTask('default', ['concat']);


};