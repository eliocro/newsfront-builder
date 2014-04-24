Array.prototype.move = function (old_index, new_index) {
    while (old_index < 0) {
        old_index += this.length;
    }
    while (new_index < 0) {
        new_index += this.length;
    }
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};

(function () {
  var app = angular.module('nf-builder', ['ngCookies']);
  app.controller('MainCtrl', function ($scope, $cookieStore) {
    $scope.overlay = false;

    $scope.createGrid = function () {
      console.log('Create grid');
      var section = {
        type: 'grid',
        title: 'The Grid',
        count: 6
      };

      $scope.conf.sections.push(section);
      $scope.saveConfig();
    };

    $scope.createSmallGrid = function () {
      console.log('Create grid');
      var section = {
        type: 'small-grid',
        title: 'The Small Grid',
        left: {
          count: 3
        },
        right: {
          count: 4
        }
      };

      $scope.conf.sections.push(section);
      $scope.saveConfig();
    };

    $scope.createList = function () {
      console.log('Create list');
      var section = {
        type: 'list',
        title: 'The List',
        count: 8
      };
      $scope.conf.sections.push(section);
      $scope.saveConfig();
    };

    $scope.createSmallList = function () {
      console.log('Create small list');
      var section = {
        type: 'small-list',
        left: {
          title: 'Small List Left',
          count: 3
        },
        center: {
          title: 'Small List Center',
          count: 5
        },
        right: {
          title: 'Small List Right',
          count: 4
        }
      };

      $scope.conf.sections.push(section);
      $scope.saveConfig();
    };

    $scope.createFeature = function () {
      console.log('Create feature');
      var section = {
        type: 'feature',
        title: 'Featured article'
      };

      $scope.conf.sections.push(section);
      $scope.saveConfig();
    };


    /* Editor Methods */
    $scope.showEditor = function (what, idx) {
      $scope.overlay = what || true;
      $scope.form = {};
      $scope.formIdx = idx;

      var section = $scope.conf.sections[idx];
      if(section) {
        $scope.form[what] = $.extend(true, {}, section);
      }
      else if(what === 'mainMenu' || what === 'topMenu') {
        // menus
        var menu = $scope.conf[what];
        $scope.form[what] = {
          barItems: menu.barItems.join(', '),
          subItems: menu.subItems.join(', '),
          description: menu.description
        };
      }
      else if(what === 'footer') {
        // footer
        var footer = $scope.conf.footer;
        $scope.form.footer = {
          menuItems: footer.menuItems.join(', '),
          tagline: footer.tagline,
          description: footer.description
        };
      }
      else {
        // conf
        $scope.form.conf = JSON.stringify($scope.conf);
      }
    };

    $scope.saveEditor = function () {
      var what = $scope.overlay;
      var section = $scope.conf.sections[$scope.formIdx];

      if(section) {
        $scope.conf.sections[$scope.formIdx] =
          $.extend(true, {}, $scope.form[what]);
      }
      else if(what === 'mainMenu' || what === 'topMenu') {
        // menus
        var menu = $scope.conf[what];
        menu.barItems = $scope.form[what].barItems.split(',');
        menu.subItems = $scope.form[what].subItems.split(',');
        menu.description = $scope.form[what].description;
      }
      else if(what === 'footer') {
        // footer
        var footer = $scope.conf.footer;
        footer.menuItems = $scope.form.footer.menuItems.split(',');
        footer.tagline = $scope.form.footer.tagline;
        footer.description = $scope.form.footer.description;
      }
      else {
        // conf
        $scope.conf = JSON.parse($scope.form.conf);
      }

      // Hide and clear
      $scope.saveConfig();
      $scope.closeEditor();
    };

    $scope.closeEditor = function () {
      $scope.overlay = false;
      $scope.form = {};
    };

    /* Section control */
    $scope.moveSection = function (idx, where) {
      var next = idx + where;
      if(next >= 0 && next < $scope.conf.sections.length) {
        $scope.conf.sections.move(idx, next);
      }
      $scope.saveConfig();
    };

    $scope.deleteSection = function (idx) {
      $scope.conf.sections.splice(idx, 1);
      $scope.saveConfig();
    };

    /* Aux */
    $scope.getArray = function (cnt) {
      var res = [];
      for (var i = 0; i < +cnt; i++) {
        res.push(i);
      }
      return res;
    };

    /* Clear the config and set a default */
    $scope.clearConfig = function () {
      $scope.conf = {
        topMenu: {
          barItems: ['Menu item 1', 'Menu item 2', 'Menu item 3'],
          subItems: ['Menu item 1', 'Menu item 2', 'Menu item 3',
            'Menu item 4', 'Menu item 5', 'Menu item 6'],
          description: ''
        },
        mainMenu: {
          barItems: ['Menu item 4', 'Menu item 5', 'Menu item 6'],
          subItems: ['Menu item 1', 'Menu item 2', 'Menu item 3',
            'Menu item 4', 'Menu item 5', 'Menu item 6'],
          description: ''
        },
        footer: {
          menuItems: ['Menu item 1', 'Menu item 2', 'Menu item 3', 'Menu item 4', 'Menu item 5'],
          tagline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          description: ''
        },
        sections: []
      };
      $scope.saveConfig();
    };

    /* Save a read from cookie */
    $scope.saveConfig = function () {
      $cookieStore.put('config', $scope.conf);
    };

    // Init
    $scope.conf = $cookieStore.get('config');
    if(!$scope.conf || !$scope.conf.topMenu) {
      $scope.clearConfig();
    }
    console.log($scope.conf);
  });

})();
