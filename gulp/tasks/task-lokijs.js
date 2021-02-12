/* jshint esversion: 6,-W097, -W040, node: true, expr: true */
module.exports= function({gulp, scripts, $g, $o, app, cordova_target_device, error}){
    const { bin }= app.directories;
    const raw= bin+"raw/";
    const src_dest_loki= "node_modules/lokijs/";
    const loki_types_output= bin+"lokijs.d.ts";
    
    return function(cb){
        if(error.getNum()) return cb();
        return getLoki_()
        .then(getTypes_.bind(null, src_dest_loki+"src/lokijs.js", raw))
        .then(renameTypeOut_.bind(null, raw+"lokijs.d.ts"))
        .then(getTypes_.bind(null, bin+"raw/wrapper.js", raw))
        .then(appendLocalTypes_)
        .catch(e=>e)
        .then(cb);
    };
    
    function getLoki_(){
        return new Promise(function(resolve){
            gulp.src([ src_dest_loki+"build/lokijs.min.js" ])
                .pipe(gulp.dest(bin+"raw/"))
                .on('end', resolve);
        });
    }
    function getTypes_(src, destination){
        const [jsdoc2ts_cmd, ...jsdoc2ts_rest]= scripts.jsdoc2ts.split(" ");
        return new Promise(function(resolve,reject){
            const cmd= $o.spawn(jsdoc2ts_cmd, [ ...jsdoc2ts_rest, src, "-d", destination ], {});
            cmd.stdout.on('data', error.logBuffer);
            cmd.on('close', code=> code ? error.logSave("jsdoc2ts", reject) : resolve(destination+"types.d.ts"));
        });
    }
    function renameTypeOut_(output, target){
        return new Promise(function(resolve,reject){
            $o.fs.rename(target, output, err=> err ? reject(err) : resolve());
        });
    }
    function appendLocalTypes_(target){
        return new Promise(function(resolve,reject){
            $o.fs.appendFile(
                target,
                "const db= new Loki;\nconst tb= {\n    //tabulka: new Collection;\n};" ,
                'utf8',
                err=> err ? reject(err) : resolve()
            );
        });
    }
};
