var _inherits= function(subClass, superClass){
    if(typeof superClass !== "function" && superClass !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        
    subClass.prototype= Object.create(superClass&&superClass.prototype, {
        constructor: { value: subClass, enumerable: false, writable: true, configurable: true }
    });
    /* jshint ignore:start *///gulp.keep.line
    if(superClass) subClass.__proto__= superClass;
    /* jshint ignore:end *///gulp.keep.line
};