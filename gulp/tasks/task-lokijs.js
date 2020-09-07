/* jshint esversion: 6,-W097, -W040, node: true, expr: true */
module.exports= function({gulp, scripts, $g, $o, app, cordova_target_device, error}){
    return function(cb){
        if(error.getNum()) return cb();
        gulp.src([ "node_modules/lokijs/build/lokijs.min.js" ])
            .pipe(gulp.dest(app.directories.bin+"raw/"))
            .on('end', cb);
    };
};
