/* jshint esversion: 6,-W097, -W040, node: true, expr: true */
module.exports= function({gulp, scripts, $g, $o, app, cordova_target_device, error}){
    return function(cb){
        if(error.getNum()) return cb();
        gulp.src([ app.directories.bin+"raw/*.min.js" ])
            .pipe($g.concat(app.name+".min.js"))
            .pipe(gulp.dest(app.directories.bin))
            .on('end', function(){
                gulp.src([ app.directories.bin+"raw/*.d.ts" ])
                    .pipe($g.concat(app.name+".d.ts"))
                    .pipe(gulp.dest(app.directories.bin))
                    .on('end', cb);
            });
    };
};
