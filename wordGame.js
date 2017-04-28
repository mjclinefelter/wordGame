function WordGame() {
    var self = this;
    self.level = 0;
    self.levels = [
        ['CAT', 'BAT', 'DOG', 'PIG', 'COW'],
        ['FROG', 'DUCK'],
        ['BIGGER', 'FASTER']
    ];
    self.wordList = [];
    self.word = '';
    self.answerArray = [];
    self.wordArray = [];

    self.setWordList = function() {
        self.wordList = self.levels[self.level];
    };
    self.randomIndex = function(what) {
        var max = what.length - 1;
        var randIndex = _.random(0, max, false)
        return randIndex;
    };

    self.setWord = function() {
        var randIndex = self.randomIndex(self.wordList);
        self.word = self.wordList[randIndex];
    };

    self.wordID = function(i) {
        return self.word[i] + i.toString();
    };
    self.blackOutOne = function() {
        var randIndex = self.randomIndex(self.word);
        var id = '#' + self.wordID(randIndex);
        $(id).css('background-color', 'black');
    };
    self.drawWord = function() {
        if (!self.word) {
            self.setWord();
        }
        for (var i = 0; i < self.word.length; i++) {
            elem = $("<div/>");
            elem.addClass('letter-box');
            elem.attr('id', self.wordID(i));
            elem.html(self.word[i]);
            elem.appendTo($('#letterLine'));
            self.wordArray.push(self.wordID(i));
            elem.draggable({ cursor: 'move',});
            console.log(self.wordArray[0]);
        }
    };



    self.drawAnswerLine = function() {
      for (var i = 0; i < self.word.length; i++) {
        answer = $("<div/>");
        answer.addClass("answer-box");
        answer.attr('id',"answer-" + self.wordID(i));
        answer.appendTo($('#answerLine'));
        self.answerArray.push(self.wordID(i));
        console.log(self.answerArray[0]);
        answer.droppable({
          accept : function (draggable) {
            var id_group_drop, id_group_drag;

            //get the "id_group" stored in a data-attribute of the draggable
            id_group_drag = $(draggable).attr("data-id-group");

            //get the "id_group" stored in a data-attribute of the droppable
            id_group_drop = $(this).parent().attr("data-id-group");

            //compare the id_groups, return true if they match or false otherwise
            return id_group_drop == id_group_drag;
          }
    });
      }
    };

    self.draw = function() {
        self.drawWord();
        self.drawAnswerLine();
    };
    self.start = function() {
        $('.letter-box').remove();
        self.setWordList();
        self.setWord();
        self.draw();
    };
    self.reset = function() {
        self.start();
    };



}

$(function() {

  $("#letterLine").draggable();
  // $( "#answerLine" ).droppable({
  //   drop: function( event, ui ) {
  //     $( this )
  //       .addClass( "correct" );
  //   }
  // });

    game = new WordGame();
    game.start();
});
