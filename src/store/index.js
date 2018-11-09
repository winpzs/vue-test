//注意项目自定义的模块名称不能使用core，mvue-core内部使用了core这个名字
function newStore(Vuex){
    return new Vuex.Store({
        modules: {
        }
    });
}
export default newStore