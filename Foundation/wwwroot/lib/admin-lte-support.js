var adminLTE = angular.module('adminLTE', [])
.config(function () {
})
.run(['adminLTE.options',function (options) {
    //Make sure jQuery has been loaded before app.js
    if (typeof jQuery === "undefined") {
        throw new Error("AdminLTE requires jQuery");
    }

    /* AdminLTE
     *
     * @type Object
     * @description $.AdminLTE is the main object for the template's app.
     *              It's used for implementing functions and options related
     *              to the template. Keeping everything wrapped in an object
     *              prevents conflict with other plugins and is a better
     *              way to organize our code.
     */
    $("body").removeClass("hold-transition");
    //Activate fast click
    if (options.enableFastclick && typeof FastClick != 'undefined') {
        FastClick.attach(document.body);
    }

    //Activate direct chat widget
    if (options.directChat.enable) {
        $(document).on('click', options.directChat.contactToggleSelector, function () {
            var box = $(this).parents('.direct-chat').first();
            box.toggleClass('direct-chat-contacts-open');
        });
    }

    /*
     * INITIALIZE BUTTON TOGGLE
     * ------------------------
     */
    $('.btn-group[data-toggle="btn-toggle"]').each(function () {
        var group = $(this);
        $(this).find(".btn").on('click', function (e) {
            group.find(".btn.active").removeClass("active");
            $(this).addClass("active");
            e.preventDefault();
        });

    });

}]);

adminLTE.factory('adminLTE.options', [function () {
    
    /* --------------------
     * - AdminLTE Options -
     * --------------------
     * Modify these options to suit your implementation
     */

    return {
        //Add slimscroll to navbar menus
        //This requires you to load the slimscroll plugin
        //in every page before app.js
        navbarMenuSlimscroll: true,
        navbarMenuSlimscrollWidth: "3px", //The width of the scroll bar
        navbarMenuHeight: "200px", //The height of the inner menu
        //General animation speed for JS animated elements such as box collapse/expand and
        //sidebar treeview slide up/down. This options accepts an integer as milliseconds,
        //'fast', 'normal', or 'slow'
        animationSpeed: 500,
        //Sidebar push menu toggle button selector
        sidebarToggleSelector: "[data-toggle='offcanvas']",
        //Activate sidebar push menu
        sidebarPushMenu: true,
        //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
        sidebarSlimScroll: true,
        //Enable sidebar expand on hover effect for sidebar mini
        //This option is forced to true if both the fixed layout and sidebar mini
        //are used together
        sidebarExpandOnHover: false,
        //BoxRefresh Plugin
        enableBoxRefresh: true,
        //Bootstrap.js tooltip
        enableBSToppltip: true,
        BSTooltipSelector: "[data-toggle='tooltip']",
        //Enable Fast Click. Fastclick.js creates a more
        //native touch experience with touch devices. If you
        //choose to enable the plugin, make sure you load the script
        //before AdminLTE's app.js
        enableFastclick: false,
        //Control Sidebar Tree views
        enableControlTreeView: true,
        //Control Sidebar Options
        enableControlSidebar: true,
        controlSidebarOptions: {
            //Which button should trigger the open/close event
            toggleBtnSelector: "[data-toggle='control-sidebar']",
            //The sidebar selector
            selector: ".control-sidebar",
            //Enable slide over content
            slide: true
        },
        //Box Widget Plugin. Enable this plugin
        //to allow boxes to be collapsed and/or removed
        enableBoxWidget: true,
        //Box Widget plugin options
        boxWidgetOptions: {
            boxWidgetIcons: {
                //Collapse icon
                collapse: 'fa-minus',
                //Open icon
                open: 'fa-plus',
                //Remove icon
                remove: 'fa-times'
            },
            boxWidgetSelectors: {
                //Remove button selector
                remove: '[data-widget="remove"]',
                //Collapse button selector
                collapse: '[data-widget="collapse"]'
            }
        },
        //Direct Chat plugin options
        directChat: {
            //Enable direct chat by default
            enable: true,
            //The button to open and close the chat contacts pane
            contactToggleSelector: '[data-widget="chat-pane-toggle"]'
        },
        //Define the set of colors to use globally around the website
        colors: {
            lightBlue: "#3c8dbc",
            red: "#f56954",
            green: "#00a65a",
            aqua: "#00c0ef",
            yellow: "#f39c12",
            blue: "#0073b7",
            navy: "#001F3F",
            teal: "#39CCCC",
            olive: "#3D9970",
            lime: "#01FF70",
            orange: "#FF851B",
            fuchsia: "#F012BE",
            purple: "#8E24AA",
            maroon: "#D81B60",
            black: "#222222",
            gray: "#d2d6de"
        },
        //The standard screen sizes that bootstrap uses.
        //If you change these in the variables.less file, change
        //them here too.
        screenSizes: {
            xs: 480,
            sm: 768,
            md: 992,
            lg: 1200
        }
    }
}]);
adminLTE.directive('adminlteLayout', ['adminLTE.options','adminLTE.layout', function (options,layout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            //Activate the layout maker
            layout.activate();
        }
    };
}]);
adminLTE.directive('adminlteWrapper', ['adminLTE.options', function (adminlteOptions) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            
        }
    };
}]);
adminLTE.directive('adminlteHeader', ['adminLTE.options', function (options) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            //Add slimscroll to navbar dropdown
            if (options.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
                $(".navbar .menu").slimscroll({
                    height: options.navbarMenuHeight,
                    alwaysVisible: false,
                    size: options.navbarMenuSlimscrollWidth
                }).css("width", "100%");
            }
        }
    };
}]);
adminLTE.directive('adminlteSidebar', ['adminLTE.options','adminLTE.tree','adminLTE.pushMenu', function (options,tree,pushMenu) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            //Enable sidebar tree view controls
            if (options.enableControlTreeView) {
                tree('.sidebar');
            }
            //Activate sidebar push menu
            if (options.sidebarPushMenu) {
                pushMenu.activate(options.sidebarToggleSelector);
            }
        }
    };
}]);
adminLTE.directive('adminlteContent', ['adminLTE.options', function (adminlteOptions) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

        }
    };
}]);
adminLTE.directive('adminlteFooter', ['adminLTE.options', function (adminlteOptions) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

        }
    };
}]);
adminLTE.directive('adminlteControlSidebar', ['adminLTE.options','adminLTE.controlSidebar', function (options, controlSidebar) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            //Enable control sidebar
            if (options.enableControlSidebar) {
                controlSidebar.activate();
            }
        }
    };
}]);
adminLTE.directive('adminlteBoxWidget', ['adminLTE.options', 'adminLTE.boxWidget', function (options, boxWidget) {
    var boxWidget = {
        selectors: options.boxWidgetOptions.boxWidgetSelectors,
        icons: options.boxWidgetOptions.boxWidgetIcons,
        animationSpeed: options.animationSpeed,
        activate: function (box) {
            var _this = this;
            //Listen for collapse event triggers
            box.on('click', _this.selectors.collapse, function (e) {
                e.preventDefault();
                _this.collapse($(this));
            });

            //Listen for remove event triggers
            box.on('click', _this.selectors.remove, function (e) {
                e.preventDefault();
                _this.remove($(this));
            });
        },
        collapse: function (element) {
            var _this = this;
            //Find the box parent
            var box = element.parents(".box").first();
            //Find the body and the footer
            var box_content = box.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
            if (!box.hasClass("collapsed-box")) {
                //Convert minus into plus
                element.children(":first")
                  .removeClass(_this.icons.collapse)
                  .addClass(_this.icons.open);
                //Hide the content
                box_content.slideUp(_this.animationSpeed, function () {
                    box.addClass("collapsed-box");
                });
            } else {
                //Convert plus into minus
                element.children(":first")
                  .removeClass(_this.icons.open)
                  .addClass(_this.icons.collapse);
                //Show the content
                box_content.slideDown(_this.animationSpeed, function () {
                    box.removeClass("collapsed-box");
                });
            }
        },
        remove: function (element) {
            //Find the box parent
            var box = element.parents(".box").first();
            box.slideUp(this.animationSpeed);
        }
    };
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            //Activate box widget
            if (options.enableBoxWidget) {
                boxWidget.activate(element);
            }
        }
    };
}]);
adminLTE.factory('adminLTE.interop', ['adminLTE.options', function (options) {

    return {

    }
}]);
adminLTE.factory('adminLTE.layout', ['adminLTE.options', function (options) {
    var layout = {
        activate: function () {
            var _this = this;
            _this.fix();
            _this.fixSidebar();
            
            $('body, html, .wrapper').css('height', 'auto');
            $(window, ".wrapper").resize(function () {
                _this.fix();
                _this.fixSidebar();
                
            });
        },
        fix: function () {
            // Remove overflow from .wrapper if layout-boxed exists
            $(".layout-boxed > .wrapper").css('overflow', 'hidden');
            //Get window height and the wrapper height
            var footer_height = $('.main-footer').outerHeight() || 0;
            var neg = $('.main-header').outerHeight() + footer_height;
            var window_height = $(window).height();
            var sidebar_height = $(".sidebar").height() || 0;
            //Set the min-height of the content and sidebar based on the
            //the height of the document.
            if ($("body").hasClass("fixed")) {
                $(".content-wrapper").css('min-height', window_height - footer_height);
                //if (typeof $.fn.slimScroll != 'undefined') {
                //    //Destroy if it exists
                //    $(".content-wrapper").slimScroll({ destroy: true }).height("auto");
                //    //Add slimscroll
                //    $(".content-wrapper").slimScroll({
                //        height: (window_height - footer_height) + "px",
                //        color: "#000",
                //        size: "5px",
                //        position: 'right'
                //    });
                //}
            } else {
                var postSetWidth;
                if (window_height >= sidebar_height) {
                    $(".content-wrapper").css('min-height', window_height - neg);
                    postSetWidth = window_height - neg;
                } else {
                    $(".content-wrapper").css('min-height', sidebar_height);
                    postSetWidth = sidebar_height;
                }

                //Fix for the control sidebar height
                var controlSidebar = $(options.controlSidebarOptions.selector);
                if (typeof controlSidebar !== "undefined") {
                    if (controlSidebar.height() > postSetWidth)
                        $(".content-wrapper").css('min-height', controlSidebar.height());
                }

            }
            console.log('neg: ' + neg);
            console.log('header: ' + $('.main-header').outerHeight());
            console.log('footer: ' + $('.main-footer').outerHeight());
        },
        fixSidebar: function () {
            //Make sure the body tag has the .fixed class
            if (!$("body").hasClass("fixed")) {
                //if (typeof $.fn.slimScroll != 'undefined') {
                //    $(".sidebar").slimScroll({ destroy: true }).height("auto");
                //}
                return;
            } else if (typeof $.fn.slimScroll == 'undefined' && window.console) {
                window.console.error("Error: the fixed layout requires the slimscroll plugin!");
            }
            //Enable slimscroll for fixed layout
            //if (options.sidebarSlimScroll) {
            //    if (typeof $.fn.slimScroll != 'undefined') {
            //        //Destroy if it exists
            //        $(".sidebar").slimScroll({ destroy: true }).height("auto");
            //        //Add slimscroll
            //        $(".sidebar").slimScroll({
            //            height: ($(window).height() - $(".main-header").height()) + "px",
            //            color: "rgba(0,0,0,0.2)",
            //            size: "3px"
            //        });
            //    }
            //}
        }
    };

    return layout;
}]);

adminLTE.factory('adminLTE.pushMenu', ['adminLTE.options', function (options) {
    /* PushMenu()
   * ==========
   * Adds the push menu functionality to the sidebar.
   *
   * @type Function
   * @usage: $.AdminLTE.pushMenu("[data-toggle='offcanvas']")
   */
    var pushMenu = {
        activate: function (toggleBtn) {
            //Get the screen sizes
            var screenSizes = options.screenSizes;

            //Enable sidebar toggle
            $(document).on('click', toggleBtn, function (e) {
                e.preventDefault();

                //Enable sidebar push menu
                if ($(window).width() > (screenSizes.sm - 1)) {
                    if ($("body").hasClass('sidebar-collapse')) {
                        $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
                    } else {
                        $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
                    }
                }
                    //Handle sidebar push menu for small screens
                else {
                    if ($("body").hasClass('sidebar-open')) {
                        $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
                    } else {
                        $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
                    }
                }
            });

            $(".content-wrapper").click(function () {
                //Enable hide menu when clicking on the content-wrapper on small screens
                if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
                    $("body").removeClass('sidebar-open');
                }
            });

            //Enable expand on hover for sidebar mini
            if (options.sidebarExpandOnHover
              || ($('body').hasClass('fixed')
              && $('body').hasClass('sidebar-mini'))) {
                this.expandOnHover();
            }
        },
        expandOnHover: function () {
            var _this = this;
            var screenWidth = options.screenSizes.sm - 1;
            //Expand sidebar on hover
            $('.main-sidebar').hover(function () {
                if ($('body').hasClass('sidebar-mini')
                  && $("body").hasClass('sidebar-collapse')
                  && $(window).width() > screenWidth) {
                    _this.expand();
                }
            }, function () {
                if ($('body').hasClass('sidebar-mini')
                  && $('body').hasClass('sidebar-expanded-on-hover')
                  && $(window).width() > screenWidth) {
                    _this.collapse();
                }
            });
        },
        expand: function () {
            $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
        },
        collapse: function () {
            if ($('body').hasClass('sidebar-expanded-on-hover')) {
                $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
            }
        }
    };
    return pushMenu;
}]);

adminLTE.factory('adminLTE.tree', ['adminLTE.options','adminLTE.layout', function (options,layout) {
    /* Tree()
       * ======
       * Converts the sidebar into a multilevel
       * tree view menu.
       *
       * @type Function
       * @Usage: $.AdminLTE.tree('.sidebar')
       */
    var tree = function (menu) {
        var _this = this;
        var animationSpeed = options.animationSpeed;
        $(document).off('click', menu + ' li a')
          .on('click', menu + ' li a', function (e) {
              //Get the clicked link and the next element
              var $this = $(this);
              var checkElement = $this.next();

              //Check if the next element is a menu and is visible
              if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible')) && (!$('body').hasClass('sidebar-collapse'))) {
                  //Close the menu
                  checkElement.slideUp(animationSpeed, function () {
                      checkElement.removeClass('menu-open');
                      //Fix the layout in case the sidebar stretches over the height of the window
                      //_this.layout.fix();
                  });
                  checkElement.parent("li").removeClass("active");
              }
                  //If the menu is not visible
              else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
                  //Get the parent menu
                  var parent = $this.parents('ul').first();
                  //Close all open menus within the parent
                  var ul = parent.find('ul:visible').slideUp(animationSpeed);
                  //Remove the menu-open class from the parent
                  ul.removeClass('menu-open');
                  //Get the parent li
                  var parent_li = $this.parent("li");

                  //Open the target menu and add the menu-open class
                  checkElement.slideDown(animationSpeed, function () {
                      //Add the class active to the parent li
                      checkElement.addClass('menu-open');
                      parent.find('li.active').removeClass('active');
                      parent_li.addClass('active');
                      //Fix the layout in case the sidebar stretches over the height of the window
                      layout.fix();
                  });
              }
              //if this isn't a link, prevent the page from being redirected
              if (checkElement.is('.treeview-menu')) {
                  e.preventDefault();
              }
          });
    };

    return tree;

}]);

adminLTE.factory('adminLTE.controlSidebar', ['adminLTE.options', function (options) {
    /* ControlSidebar
   * ==============
   * Adds functionality to the right sidebar
   *
   * @type Object
   * @usage $.AdminLTE.controlSidebar.activate(options)
   */
    var controlSidebar = {
        //instantiate the object
        activate: function () {
            //Get the object
            var _this = this;
            //Update options
            var o = options.controlSidebarOptions;
            //Get the sidebar
            var sidebar = $(o.selector);
            //The toggle button
            var btn = $(o.toggleBtnSelector);

            //Listen to the click event
            btn.on('click', function (e) {
                e.preventDefault();
                //If the sidebar is not open
                if (!sidebar.hasClass('control-sidebar-open')
                  && !$('body').hasClass('control-sidebar-open')) {
                    //Open the sidebar
                    _this.open(sidebar, o.slide);
                } else {
                    _this.close(sidebar, o.slide);
                }
            });

            //If the body has a boxed layout, fix the sidebar bg position
            var bg = $(".control-sidebar-bg");
            _this._fix(bg);

            //If the body has a fixed layout, make the control sidebar fixed
            if ($('body').hasClass('fixed')) {
                _this._fixForFixed(sidebar);
            } else {
                //If the content height is less than the sidebar's height, force max height
                if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
                    _this._fixForContent(sidebar);
                }
            }
        },
        //Open the control sidebar
        open: function (sidebar, slide) {
            //Slide over content
            if (slide) {
                sidebar.addClass('control-sidebar-open');
            } else {
                //Push the content by adding the open class to the body instead
                //of the sidebar itself
                $('body').addClass('control-sidebar-open');
            }
        },
        //Close the control sidebar
        close: function (sidebar, slide) {
            if (slide) {
                sidebar.removeClass('control-sidebar-open');
            } else {
                $('body').removeClass('control-sidebar-open');
            }
        },
        _fix: function (sidebar) {
            var _this = this;
            if ($("body").hasClass('layout-boxed')) {
                sidebar.css('position', 'absolute');
                sidebar.height($(".wrapper").height());
                if (_this.hasBindedResize) {
                    return;
                }
                $(window).resize(function () {
                    _this._fix(sidebar);
                });
                _this.hasBindedResize = true;
            } else {
                sidebar.css({
                    'position': 'fixed',
                    'height': 'auto'
                });
            }
        },
        _fixForFixed: function (sidebar) {
            sidebar.css({
                'position': 'fixed',
                'max-height': '100%',
                'overflow': 'auto',
                'padding-bottom': '50px'
            });
        },
        _fixForContent: function (sidebar) {
            $(".content-wrapper").css('min-height', sidebar.height());
        }
    };
    return controlSidebar;
}]);

adminLTE.factory('adminLTE.boxWidget', ['adminLTE.options', function (options) {
    /* BoxWidget
       * =========
       * BoxWidget is a plugin to handle collapsing and
       * removing boxes from the screen.
       *
       * @type Object
       * @usage $.AdminLTE.boxWidget.activate()
       *        Set all your options in the main $.AdminLTE.options object
       */
   
    return boxWidget;

}]);
adminLTE.factory('adminLTE.boxWidget', ['adminLTE.options', function (options) {

}]);