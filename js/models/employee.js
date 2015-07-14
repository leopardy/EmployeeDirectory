var Employee = Backbone.Model.extend({

    /** Default attributes for the model */
    defaults: {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        location: ''
    },


    initialize: function(options) {
        this.idToSearchFor = options.id;
    },

    url: function(){
        return 'http://dark-cloud-7108.getsandbox.com/employees/'+ this.idToSearchFor;
    },

    parse: function(resp) {
        return resp;
    },

    //gets are being done through fetch which uses url and parse

    create: function(currentView) {
        var url = 'http://dark-cloud-7108.getsandbox.com/employees';

        var formObject = {'id': this.idToSearchFor};
        $.extend(formObject, this.objectify($("#emp_form")));    

        var self = this;

        $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
            options.crossDomain ={
                crossDomain: true
            };
        });

        $.ajax({
            url: url,
            type: "POST",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(formObject),
            success: function(data) {
                self.set(data);
                currentView.employees.add(self); //triggers add event
            },
            error: function() {
                bootbox.alert("Error creating new employee", function() {});
            }
        });
    },

    update: function(emp_id, currentView) {
        var url = 'http://dark-cloud-7108.getsandbox.com/employees/'+ emp_id;

        var formObject = {'id': emp_id};
        $.extend(formObject, this.objectify($("#emp_form")));    

        var self = this;

        $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
            options.crossDomain ={
                crossDomain: true
            };
        });

        $.ajax({
            url: url,
            type: "PUT",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(formObject),
            success: function(data) {
                self.set(data);         //triggers change event
                // currentView.employees.add(self); //triggers change event
            },
            error: function() {
                bootbox.alert("Error updating existing employee", function() {});
            }
        });
    },

    objectify: function (form) {
        var object = {};
        $.each(form.serializeArray(), function() {
            // Do not add element to object if value is undefined or empty
            if (this.value && this.value.length > 0 ) {
                // Not the first time we have seen this attribute?
                // Need to support array types so pushing multiple values
                if (object[this.name] !== undefined) {
                    // Convert object entry into array if needed
                    if (!object[this.name].push) {
                        object[this.name] = [object[this.name]];
                    }

                    object[this.name].push(this.value);
                } else { // First (and maybe only) instance of attribute in form
                    object[this.name] = this.value;
                }
            }
        });

        return object;

    },

    destroy: function(emp_id, currentView) {
        var url = 'http://dark-cloud-7108.getsandbox.com/employees/'+ emp_id;
        var self = this;

        $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
            options.crossDomain ={
                crossDomain: true
            };
        });

        $.ajax({
            url: url,
            type: "DELETE",
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {
                currentView.employees.remove(self); //triggers remove event
                bootbox.alert("Employee removed successfully", function() {});
            },
            error: function() {
                bootbox.alert("Error deleting employee", function() {});
            }
        });
    },


});