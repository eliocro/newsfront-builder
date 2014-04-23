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
    $scope.haf = {
      topMenu: {
        barItems: ['Menu item 1', 'Menu item 2', 'Menu item 3'],
        subItems: ['Menu item 1', 'Menu item 2', 'Menu item 3', 'Menu item 4', 'Menu item 5', 'Menu item 6']
      },
      mainMenu: {
        barItems: ['Menu item 4', 'Menu item 5', 'Menu item 6'],
        subItems: ['Menu item 1', 'Menu item 2', 'Menu item 3', 'Menu item 4', 'Menu item 5', 'Menu item 6']
      },
      footer: {
        menuItems: ['Menu item 1', 'Menu item 2', 'Menu item 3', 'Menu item 4', 'Menu item 5'],
        tagline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }
    };

    $scope.sections = [];
    $scope.overlay = false;

    $scope.createGrid = function () {
      console.log('Create grid');
      var section = {
        type: 'grid',
        title: 'The Grid',
        count: 6
      };

      $scope.sections.push(section);
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

      $scope.sections.push(section);
      $scope.saveConfig();
    };

    $scope.createList = function () {
      console.log('Create list');
      var section = {
        type: 'list',
        title: 'The List',
        count: 8
      };
      $scope.sections.push(section);
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

      $scope.sections.push(section);
      $scope.saveConfig();
    };

    $scope.createFeature = function () {
      console.log('Create feature');
      var section = {
        type: 'feature',
        title: 'Featured article'
      };

      $scope.sections.push(section);
      $scope.saveConfig();
    };

    $scope.showEditor = function (what) {
      $scope.overlay = what || true;
    };

    /* Section control */
    $scope.moveSection = function (idx, where) {
      var next = idx + where;
      if(next >= 0 && next < $scope.sections.length) {
        $scope.sections.move(idx, next);
      }
      $scope.saveConfig();
    };

    $scope.deleteSection = function (idx) {
      $scope.sections.splice(idx, 1);
      $scope.saveConfig();
    };

    /* Aux */
    $scope.getArray = function (cnt) {
      var res = [];
      for (var i = 0; i < cnt; i++) {
        res.push(i);
      }
      return res;
    };

    $scope.clearConfig = function () {
      $scope.sections = [];
      $scope.saveConfig();
    };

    $scope.getConfig = function () {
      console.log(JSON.stringify($scope.sections));
    };

    /* Save a read from cookie */
    $scope.saveConfig = function () {
      $cookieStore.put('config', $scope.sections);
    };
    $scope.sections = $cookieStore.get('config') || [];

    console.log($scope.sections);
  });

})();
