var LoginView = Backbone.View.extend({
	el: '#main',

	template: undefined,

	CONSTS: {
		NOSELECT: "Select a type",
		HR: "Login as HR employee",
		NOHR: "Login as non HR employee"

	},

    events: {
      "click #login_selection li a": "captureSelection",
      "click #login_button ": "login"
    },

	initialize: function(){
		var loginTemplate = $("#login-data").html();
		this.template = _.template(loginTemplate);
		this.$el.html(this.template);
	},


	captureSelection: function(event){
		event.preventDefault();
		$("#dropdown_text").html($(event.currentTarget).text());
	},

	login: function(){
		var selection = $("#dropdown_text").text();
		var isValid = selection !== this.CONSTS.NOSELECT;
		var access = selection == this.CONSTS.HR ? true : false;
    	(isValid == true) ? new AppView(access) : bootbox.alert("Please select a valid option", function() {});
	}
});

var AppView = Backbone.View.extend({

	el: '#main',

	access: undefined,

	template: undefined,
		
	collections: {
	    employees: {
	        ready: false,
	        collection: undefined
	    },
	},

	initialize: function(access){
		var mainTemplate = $("#main-data").html();
		this.template = _.template(mainTemplate);
		this.$el.html(this.template);
		this.render(access);
	},

	render: function(access){
		//go fetch employees and add to to table
		var subview= new EmployeeListView(access);
	}
});

var EmployeeListView = Backbone.View.extend({

	template: undefined,

	employees: undefined,

	selectedEmployee: undefined,

	events: {
      "click #create_emp_button": "createEmployee",
      "click #delete_emp_button": "deleteEmployee",
      "click #update_emp_button": "updateEmployee",
      "click #employees_table tr": "selectEmployee"
    },

 	required: [
		"#first_name",
		"#last_name",
		"#email",
		"#addr",
		"#city",
		"#state"
	],
    	
    form: '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                    '<form id="emp_form" class="form-horizontal"> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-3 control-label required" for="first_name">First Name</label> ' +
                    '<div class="col-md-8"> ' +
                    '<input id="first_name" name="first_name" type="text" class="form-control input-md"> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-3 control-label required" for="last_name">Last Name</label> ' +
                    '<div class="col-md-8"> ' +
                    '<input id="last_name" name="last_name" type="text" class="form-control input-md"> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-3 control-label required" for="email">Email</label> ' +
                    '<div class="col-md-8"> ' +
                    '<input id="email" name="email" type="text" class="form-control input-md"> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-3 control-label" for="ctel">Cell Phone #</label> ' +
                    '<div class="col-md-4"> ' +
                    '<input id="ctel" name="ctel" type="tel" class="form-control input-md"> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-3 control-label" for="htel">Home Phone #</label> ' +
                    '<div class="col-md-4"> ' +
                    '<input id="htel" name="htel" type="tel" class="form-control input-md"> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-3 control-label" for="otel">Other Phone #</label> ' +
                    '<div class="col-md-4"> ' +
                    '<input id="otel" name="otel" type="tel" class="form-control input-md"> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-3 control-label required" for="addr">Address</label> ' +
                    '<div class="col-md-8"> ' +
                    '<input id="addr" name="addr" type="text" class="form-control input-md"> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-3 control-label required" for="city">City</label> ' +
                    '<div class="col-md-8"> ' +
                    '<input id="city" name="city" type="text" class="form-control input-md"> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-3 control-label required" for="state">State</label> ' +
                    '<div class="col-md-8"> ' +
                    '<select id="state" name="state" class="form-control">' +
			        '<option value="Alabama">AL</option>' +
			        '<option value="Alaska">AK</option>' +
			        '<option value="Arizona">AZ</option>' +
			        '<option value="Arkansas">AR</option>' +
			        '<option value="California">CA</option>' +
			        '<option value="Colorado">CO</option>' +
			        '<option value="Connecticut">CT</option>' +
			        '<option value="Delaware">DE</option>' +
			        '<option value="Florida">FL</option>' +
			        '<option value="Georgia">GA</option>' +
			        '<option value="Hawaii">HI</option>' +
			        '<option value="Idaho">ID</option>' +
			        '<option value="Illinois">IL</option>' +
			        '<option value="Indiana">IN</option>' +
			        '<option value="Iowa">IA</option>' +
			        '<option value="Kansas">KS</option>' +
			        '<option value="Kentucky">KY</option>' +
			        '<option value="Louisiana">LA</option>' +
			        '<option value="Maine">ME</option>' +
			        '<option value="Maryland">MD</option>' +
			        '<option value="Massachusetts">MA</option>' +
			        '<option value="Michigan">MI</option>' +
			        '<option value="Minnesota">MN</option>' +
			        '<option value="Mississippi">MS</option>' +
			        '<option value="Missouri">MO</option>' +
			        '<option value="Montana">MT</option>' +
			        '<option value="Nebraska">NE</option>' +
			        '<option value="Nevada">NV</option>' +
			        '<option value="New Hampshire">NH</option>' +
			        '<option value="New Jersey">NJ</option>' +
			        '<option value="New Mexico">NM</option>' +
			        '<option value="New York">NY</option>' +
			        '<option value="North Carolina">NC</option>' +
			        '<option value="North Dakota">ND</option>' +
			        '<option value="Ohio">OH</option>' +
			        '<option value="Oklahoma">OK</option>' +
			        '<option value="Oregon">OR</option>' +
			        '<option value="Pennsylvania">PA</option>' +
			        '<option value="Rhode Island">RI</option>' +
			        '<option value="South Carolina">SC</option>' +
			        '<option value="South Dakota">SD</option>' +
			        '<option value="Tennessee">TN</option>' +
			        '<option value="Texas">TX</option>' +
			        '<option value="Utah">UT</option>' +
			        '<option value="Vermont">VT</option>' +
			        '<option value="Virgina">VA</option>' +
			        '<option value="Washington">WA</option>' +
			        '<option value="West Virginia">WV</option>' +
			        '<option value="Wisconsin">WI</option>' +
			        '<option value="Wyoming">WY</option>' +
			    	'</select>' +
                    '</div> ' +
                    '</div> ' +
                    '<div id="validation" class="required_key"></div>' +
                    '</form></div> </div>',

	initialize: function(access){
		var employeesTemplate = $("#employees-data").html();
		this.template = _.template(employeesTemplate);
		var task = (access == true) ? "Manage Employees" : "Employee Directory";

		this.$el.html(this.template({task:task, access:access}));
		$("#submanagement_app").html(this.$el);
		$("#employees_table").DataTable({
		  responsive: true,
		  "bProcessing": true,
		  "pagingType": "full_numbers"  
		});

		this.render();
	},

    selectEmployee: function(event) {
      $("#employees_table tr").removeClass('selected_row');
      $(event.currentTarget).addClass('selected_row');

      var rowInfo = $("#employees_table").dataTable().fnGetData(event.currentTarget);
      var id = $.parseHTML(rowInfo[0])[0].id;

      if (rowInfo){
        this.selectedEmployee = this.employees.get({ "id": id});
      }

    },

	render: function(){
		var self = this;
		this.startProcessing();

		//go fetch employees and add to table
		this.employees = new EmployeeList();
		this.employees.fetch({
		    success: function(employees) {
		    	self.endProcessing();
		        self.addAllEmployees();
		        self.employees.on('reset change add remove', self.addAllEmployees, self);
		    },
		    error: function(model, xhr) {
			  	self.endProcessing();
		    	bootbox.alert("Error fetching employees", function() {});
		    }
		});
	},

	startProcessing: function(){
		$("#employees_table_processing").css('display', 'block');
		$("#employees_table_processing").css('visibility', 'visible');
	},

	endProcessing: function(){
		$("#employees_table_processing").css('display', 'none');
		$("#employees_table_processing").css('visibility', 'hidden');
	},

	addAllEmployees: function() {
		$("#employees_table").dataTable().fnClearTable();
		var self = this;
		this.employees.each(function(emp) {
			var conversions = {
			    'name': emp.attributes.first_name + " " + emp.attributes.last_name,
			    'location': $.map( emp.attributes.location[0], function( value ) {
							    return value + " ";
							}).join(""),
			    'phone':  $.map( emp.attributes.phone_number[0], function( value, key ) {
							    if (value == null){
							        return key + ": NONE ";
							    } else {
							        return key + ":" + value; 
							    }
							}).toString()
			};

			var rowData = [
			    '<span id="' + emp.attributes.id + '" >' + conversions.name + "</span>",
			    conversions.location,
			    conversions.phone,
			    emp.attributes.email
			];

			var tbl = $("#employees_table").dataTable();
			tbl.fnAddData(rowData);
		});
	},

    createEmployee: function() {
      var self = this;
      bootbox.dialog({
                title: "Create Employee",
                message: self.form,
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: _.bind(self.validate, self, "create")
                    }
                }
            }
        );
    },

    updateEmployee: function() {
      	var emp = this.selectedEmployee;
      	var self = this;
      	if (emp){
		  var self = this;
		  bootbox.dialog({
		            title: "Update Employee",
		            message: self.form,
		            buttons: {
		                success: {
		                    label: "Save",
		                    className: "btn-success",
		                    callback: _.bind(self.validate, self, "update")
		                }
		            }
		        }
		    );

		//populate form with current entry values
		 $('#first_name').val(this.selectedEmployee.attributes.first_name);
		 $('#last_name').val(this.selectedEmployee.attributes.last_name);
		 $('#email').val(this.selectedEmployee.attributes.email);
		 $('#htel').val(this.selectedEmployee.attributes.phone_number[0].home);
		 $('#ctel').val(this.selectedEmployee.attributes.phone_number[0].cell);
		 $('#otel').val(this.selectedEmployee.attributes.phone_number[0].other);
		 $('#addr').val(this.selectedEmployee.attributes.location[0].address);
		 $('#city').val(this.selectedEmployee.attributes.location[0].city);
		 $('#state').val(this.selectedEmployee.attributes.location[0].state);
		}
    },

    validate: function(action) {
    	var foundBad = false;
    	this.required.some(function(input) {
            if ( !($(input).val()) ) {
            	foundBad = true;
                return true;
            } 
        });
        if (!foundBad){
	    	var generated = Math.random().toString(16).slice(2);
	    	var employee = new Employee({id: generated});
	    	action == "create" ? employee.create(this) : employee.update(this.selectedEmployee.attributes.id, this);
     	} else {
     		$("#validation").html("Please provide all required fields");
     		return false;//don't allow dialog to close
     	}

    },

    deleteEmployee: function() {
      var emp = this.selectedEmployee;
      var self = this;
      if (emp) {  
      	var display = "Are you sure you want to delete employee "+ this.selectedEmployee.attributes.first_name + " " + this.selectedEmployee.attributes.last_name +"?"
        bootbox.confirm(display, function(result) {
			if (result == true){
			  emp.destroy(emp.attributes.id, self);
			}
		});   
      }
      this.clearSelection();
    },

    clearSelection: function() {
      this.selectedEmployee = undefined;
      $("#employees_table tr").removeClass('selected_row');
    },	

});



$(document).ready(function() {	
	//allow CORS
	(function() {
	  var proxiedSync = Backbone.sync;
	  Backbone.sync = function(method, model, options) {
	    options || (options = {});
	    if (!options.crossDomain) {
	      options.crossDomain = true;
	    }
	    return proxiedSync(method, model, options);
	  };
	})();
	new LoginView();
})