var mvueCore=require('mvue-core').default;
var customActions = {
    currentUser: {method: 'GET', url: 'user/info'}
};
var $resource=mvueCore.resource('user{/id}',customActions);

module.exports={
    $resource:$resource
}