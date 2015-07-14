var EmployeeList = Backbone.Collection.extend({

    model: Employee,

    url: function() {
        return 'http://dark-cloud-7108.getsandbox.com/employees';
    },

    parse: function(resp) {
        return resp;
    }
});