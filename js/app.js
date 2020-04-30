(function () {
  var app = angular.module("app", []);

  app.controller("appController", function ($scope) {
    // Wypełnij tablicę pustymi wartościami
    $scope.board = Array(9).fill();

    // Bieżący gracz (X lub O)
    $scope.player = "X";

    // Kliknięcie w przycisk i ustawienie kółka/krzyżyka
    $scope.onGameBtnClick = function (keyNumber) {
      $scope.board[keyNumber - 1] = $scope.player;
      var winner = $scope.checkScore();

      if (winner) {
        var winMessage;

        if (winner == "X") {
          winMessage = "Wygrywa krzyżyk";
        } else if (winner == "O") {
          winMessage = "Wygrywa kółko";
        }

        // Opóźnienie (bez tego plansza wypełnia się dopiero po kliknięciu "OK");
        setTimeout(function () {
          if (window.confirm(winMessage + "\n Czy chcesz rozpocząć nową grę?")) {
            // Odświeżenie strony - rozpoczęcie nowej gry
            window.location.href = window.location.href;
          }
        }, 1);

        $scope.disableRemainingButtons();
      }

      $scope.changePlayer();
    };

    // Zmiana bieżącego gracza
    $scope.changePlayer = function () {
      if ($scope.player == "X") {
        $scope.player = "O";
      } else if ($scope.player == "O") {
        $scope.player = "X";
      }
    };

    // Sprawdza, czy któryś z graczy wygrał
    $scope.checkScore = function () {
      for (var i = 0; i < $scope.winningBoards.length; i++) {
        var currentCheckedBoard = $scope.winningBoards[i];

        if ($scope.board[currentCheckedBoard[0] - 1] == $scope.player
          && $scope.board[currentCheckedBoard[1] - 1] == $scope.player
          && $scope.board[currentCheckedBoard[2] - 1] == $scope.player) {
          return $scope.player;
        }
      }
    };

    // Wyłącza pozostałe przycisi po zakończeniu gry
    $scope.disableRemainingButtons = function() {
      for (var i = 0; i < 9; i++) {
        if (!$scope.board[i]) {
          $scope.board[i] = " ";
        }
      }
    }

    // Tablica plansz zwycięstw
    $scope.winningBoards = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7]
    ];
  });
})();
