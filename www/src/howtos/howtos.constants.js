(function () {
    'use strict';

    var defaultHowTos = [
        {
            id: 1,
            categoryId: 1,
            title: 'Washing',
            image: 'img/health/washing.png',
            video: 'https://www.youtube.com/embed/zxlQn7KaCNU',
            tasks: [
                {
                    image: 'img/health/washing/how_to/tap.png',
                    audio: 'audio/health/washing/how_to/TurnTap.mp3'
                },
                {
                    image: 'img/health/washing/how_to/wet.png',
                    audio: 'audio/health/washing/how_to/WetHands.mp3'
                },
                {
                    image: 'img/health/washing/how_to/soap.png',
                    audio: 'audio/health/washing/how_to/GetSoap.mp3'
                },
                {
                    image: 'img/health/washing/how_to/rub.png',
                    audio: 'audio/health/washing/how_to/RubHands.mp3'
                },
                {
                    image: 'img/health/washing/how_to/rinse.png',
                    audio: 'audio/health/washing/how_to/RinseHands.mp3'
                },
                {
                    image: 'img/health/washing/how_to/dry.png',
                    audio: 'audio/health/washing/how_to/DryHands.mp3'
                }
            ]
        },
        {
            id: 2,
            categoryId: 0,
            title: 'Hoisting',
            image: 'img/personal/hoisting.jpg',
            video: 'video/personal/hoisting/how-to/hoisting.m4v',
            tasks: [
                {
                    image: 'img/personal/hoisting/how-to/Time_to_Hoist.jpg',
                    audio: 'audio/personal/hoisting/how-to/Time_to_hoist.mp3'
                },
                {
                    image: 'img/personal/hoisting/how-to/Time_for_Sling.jpg',
                    audio: 'audio/personal/hoisting/how-to/Time_for_sling.mp3'
                },
                {
                    image: 'img/personal/hoisting/how-to/Time_to_Lift.jpg',
                    audio: 'audio/personal/hoisting/how-to/Time_to_lift.mp3'
                },
                {
                    image: 'img/personal/hoisting/how-to/Time_for_Physiotherapy_Bed.jpg',
                    audio: 'audio/personal/hoisting/how-to/Physio_bed.mp3'
                }
            ]
        }

    ];

    angular
        .module('givesBack.howtos')
        .constant('defaultHowTos', defaultHowTos);

})();
