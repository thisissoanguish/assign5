(function() {
    'use strict';

    var signupController = function(MenuService) {
        var signupCtrl = this;

        signupCtrl.user = {};
        signupCtrl.favoriteDish = {};

        signupCtrl.showError = false;
        signupCtrl.showMessage = false;

        signupCtrl.signup = function(form) {
            signupCtrl.showError = false;
            signupCtrl.showMessage = false;

            if(form.$invalid) {
                console.log('The form is not valid');
                return;
            }

            MenuService.getFavoriteDish(signupCtrl.user.favoriteDish).then(function(response) {
                signupCtrl.user.favoriteDishDetails = response.data;
                console.log(signupCtrl.favoriteDish);
                MenuService.saveUser(signupCtrl.user);
                signupCtrl.showMessage = true;
            }, function(error) {
                console.log(error);
                signupCtrl.showError = true;
            });

        }
    };


    signupController.$inject = ['MenuService'];
    angular.module('public').controller('SignupController', signupController);
})();
