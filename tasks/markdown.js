'use strict';

module.exports = function (grunt) {

    var marked = require('marked');
    var hljs = require('highlight.js');
    var _ = require('lodash');

    function escapeId(text) {
        return text.toLowerCase().replace(/[^\w]+/g, '-');
    }

    grunt.registerMultiTask("marked", "Runs marked plugin to render markdown files", function () {
        var options = {
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false,
            highlight: true
        };

        var renderer = new marked.Renderer();
        renderer.heading = anchorHeadings;
        renderer.table = bootstrapTable;
        renderer.link = underLinedLink;
        renderer.image = responsiveImage;
        options.renderer = renderer;

        // install highlight.js
        options.highlight = (function (highlight) {
            return function (code) {
                return highlight.highlightAuto(code).value;
            };
        })(hljs);

        marked.setOptions(options);

        grunt.util.async.forEachLimit(this.files, 25, function (file, next) {
            convert(file.src, file.dest, next);
        }.bind(this), this.async());

        function convert(src, dest, next) {
            var content = markdown(grunt.file.read(src));
            grunt.file.write(dest, content);
            grunt.log.writeln('File "' + dest + '" created.');
            process.nextTick(next);
        }

        function markdown(file) {
            var content = marked(file);
            return '<div class="container">' +
                        '<div>' + content + '</div>' +
                    '</div>';
        }

        function anchorHeadings(text, level) {
            var escapedText = escapeId(text);

            return '<h' + level + '>' +
                        '<a id="' + escapedText + '"' +
                        ' class="anchor" href="#/docs/' + escapedText + '">' +
                            '<span class="header-link"></span>' +
                        '</a>' +
                    text +
                    '</h' + level + '>';
        }

        function bootstrapTable(header, body) {
            return '<div class="table-responsive">' +
                        '<table class="table table-responsive">\n'
                            + '<thead>\n'
                                + header
                            + '</thead>\n'
                            + '<tbody>\n'
                                + body
                            + '</tbody>\n'
                        + '</table>\n' +
                    '</div>'
        }

        function underLinedLink(href, title, text) {
            var markedLink = new marked.Renderer().link(href, title, text);
            return markedLink.replace("<a ", "<a class=\"docs-link\" ");
        }

        function responsiveImage(href, title, text) {
            var markedLink = new marked.Renderer().image(href, title, text);
            return markedLink.replace("<img ", "<img class=\"img-responsive\" ");
        }
    });

    grunt.registerTask("extractheaders", "extract headers from markdown files", function () {

        var options = this.options();
        var dest = options.dest;
        if (grunt.file.exists(dest)) {
            grunt.file.delete(dest);
        }

        var content = [];
        _.forEach(options.sources, function(src) {
            content = content.concat(parse(grunt.file.read(src)));
        });

        var jsonContent = JSON.stringify(content);

        grunt.log.writeln('File "' + dest + '" created.');
        grunt.file.write(dest, jsonContent);

        function parse(file) {
            var tokens = marked.lexer(file);
            var headers = _.chain(tokens)
                .filter(function (node) {
                    return _.includes([1, 2], node.depth);
                })
                .map(function (node) {
                    return {
                        "size" : 'h' + node.depth,
                        "title": node.text,
                        "link" : escapeId(node.text)
                    };
                });
            return headers.value();
        }
    });
};
