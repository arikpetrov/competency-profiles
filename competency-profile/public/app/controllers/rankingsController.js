(function () {
    'use strict';

    angular
        .module('consultingControllers')
        .controller('RankingsController', RankingsController);

    RankingsController.$inject = ['competencyProfileService'];

    function RankingsController(competencyProfileService) {
        var vm = this;
        vm.level = 'all';
        vm.consultants = [];

        initialize();

        function initialize() {
            competencyProfileService.getRankings().then(function (response) {
                if (response.result === 'success') {
                    vm.consultants = response.profileList.map(function (user) {
                        return {
                            userid: user.userid,
                            name: user.displayName || user.userid,
                            level: user.level
                        };
                    });
                }
            });
        }
    }
})();