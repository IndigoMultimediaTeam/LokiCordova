/* jshint esversion: 6,-W097, -W040, node: true, expr: true */
module.exports= function({gulp, scripts, $g, $o, app, cordova_target_device, error}){
    const /* files source and destination */
        [ target_folder, files_pattern, files_not_pattern ]= [ app.directories.docs, "*.html", "*.sub.html" ],
        folder= "src_"+target_folder;
    /* jshint -W061 */const gulp_place= $g.place({ variable_eval: (str)=> eval(str), filesCleaner: require("../gulp_cleanJSHINT.js") });/* jshint +W061 */
    return function(cb){
        if(error.getNum()) return cb();
        gulp.src([ `${folder}${files_pattern}`, `!${folder}${files_not_pattern}` ])
        .pipe(gulp_place({ folder, string_wrapper: '' }))
        .pipe(gulp.dest(target_folder))
        .on('end', ()=>{
            gulp.src([ app.directories.bin+app.name+".min.js" ])
            .pipe(gulp.dest(target_folder))
            .on('end', cb);
        });
    };
};
