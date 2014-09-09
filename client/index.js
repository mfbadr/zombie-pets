(function(){
  'use strict';

  angular.module('zombie-pets', [])
  .controller('MainController', ['$scope', function($scope){

    $scope.title = 'Zombie Pets';

    $scope.toggleWeapon = function(){
      $scope.hideWeapon = !!!$scope.hideWeapon;
    };

    $scope.weapon = {};
    $scope.weapons = [];

    $scope.addWeapon = function(){
      $scope.weapons.push($scope.weapon);
      $scope.weapon = {};
      //lets use jQuery to focus on first input
      $('#name').focus();
    };

    $scope.pet = {health:100};
    $scope.pets = [];

    $scope.player1  = null;
    $scope.player2  = null;

    $scope.togglePet = function(){
      $scope.hidePet = !!!$scope.hidePet;
    };
    $scope.addPet = function(){
      if(!$scope.petForm.$valid){
        return;
      }
      var index = $scope.pet.weapon * 1;
      $scope.pet.weapon = $scope.weapons[index];
      $scope.pets.push($scope.pet);
      $scope.pet = {health:100};
    };

    $scope.setPlayer = function(num){
      $scope['player' + num] = this.p;
    };

    $scope.healthBar = function(health){
      if(health > 10){
        return {'background-color':'green', 'width':health + '%'};
      }else{
        return {'background-color':'red', 'width':health + '%'};
      }
    };

    $scope.fight = function(){
      //select who attacks first
      var num = Math.floor(Math.random() * 2) + 1,
          attacker = $scope['player' + num],
          defender;

      if(num === 1){
        defender = $scope.player2;
      }else{
        defender = $scope.player1;
      }
      //attacker hits defender
      var damage = Math.floor(Math.random() * attacker.weapon.damage);
      defender.health -= damage;
      console.log('Attacker' + attacker.name + 'hits for' + damage);
      if(defender.health <= 0){
        defender.weapon = {name:'Zombie Bite', damage:3};
        defender.isZombie = true;
      }

      //defender hits attacker
      damage = Math.floor(Math.random() * defender.weapon.damage);
      attacker.health -= damage;
      console.log('Defender ' + defender.name + ' hits for ' + damage);
      if(attacker.health <= 0){
        attacker.weapon = {name:'Zombie Bite', damage:3};
        attacker.isZombie = true;
      }

      //console.log('ATT' + attacker.name);
      //console.log('DEF' + defender.name);
    };


  }]);
})();

