  var Router = Backbone.Router.extend({
    routes: {
      'employees': 'employeesRoute',
      '/': 'defaultRoute',
      '*actions': 'defaultRoute'
    },

    defaultRoute: function(actions) {
      alert("inside defaultRoute");
        // this.trigger("route:login");
        new LoginView();
    },

    employeesRoute: function(id) {
          var appView = new AppView();

        // $("#sidebar").empty();
        // $("#sidebar").hide();
        // $(".main-nav li").removeClass("active");
        // $(".main-nav a").removeClass("nav_selected");
        // $("#orgs_nav").addClass("nav_selected");
        // this.trigger("route:administration", 'org_list', id);
    },

  });

  // return Router;
// });