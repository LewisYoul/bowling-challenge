describe("Game", function(){

  function Roll4Then4(){
    game.addRoll(4)
    game.addRoll(4)
  }

  function RollSpare(){
    game.addRoll(5)
    game.addRoll(5)
  }

  function RollStrike(){
    game.addRoll(10)
  }

  beforeEach(function(){
    game = new Game();
  });

  describe("#getCurrentScore", function(){
    it("returns a current score of 0", function(){
      expect(game.getCurrentScore()).toEqual(0)
    });

    it("has a score of 40 after ten frames", function(){
      for (var i = 0; i < 10; i++){
        game.addRoll(4)
      }
      expect(game.getCurrentScore()).toEqual(40)
    });
  });

  describe("#frames", function(){
    it("is an object", function(){
      expect(game.frames).toEqual(jasmine.any(Object))
    });

    it("returns an instance of Frame as the first element", function(){
      expect(game.frames[1]).toEqual(jasmine.any(Frame))
    })
  });

  describe("#getCurrentFrame", function(){
    it("returns a current frame of 1", function(){
      expect(game.getCurrentFrame()).toEqual(1)
    });

    it("doesn't increase the frame after only one roll (below 10)", function(){
      game.addRoll(4)
      expect(game.getCurrentFrame()).toEqual(1)
    });

    it("moves on to the next frame if the first roll is 10", function(){
      game.addRoll(10)
      expect(game.getCurrentFrame()).toEqual(2)
    })

    it("rolling twice (below 5) increases the current frame by 1", function(){
      Roll4Then4();
      expect(game.getCurrentFrame()).toEqual(2)
    });

    it("has a maximum of ten frames", function(){
      for (var i = 0; i < 20; i++){
        game.addRoll(4)
      }
      expect(game.getCurrentFrame()).toEqual(10)
    });
  });

  describe("#isRollOne", function(){
    it("is set to be true by default", function(){
      expect(game.isRollOne()).toEqual(true)
    });

    it("is set to false after taking one roll", function(){
      game.addRoll(4)
      expect(game.isRollOne()).toEqual(false)
    });

    it("is set to true after making two rolls (below 5)", function(){
      Roll4Then4();
      expect(game.isRollOne()).toEqual(true)
    })

    it("is set to false after making three rolls (below 5)", function(){
      Roll4Then4()
      game.addRoll(4)
      expect(game.isRollOne()).toEqual(false)
    })
  });

  describe("#addRoll", function(){
    it("adds a roll of 4 to the current score", function(){
      game.addRoll(4)
      expect(game.getCurrentScore()).toEqual(4)
    });

    it("throws an error if the number of pins hit is > 10", function(){
      expect(function() { game.addRoll(11) }).toThrow("You can't knock down more than 10 pins")
    })

    it("throws an error if score for roll 2 would take total for frame over 10", function(){
      game.addRoll(4)
      expect(function(){ game.addRoll(7) }).toThrow("Your rolls can't sum over 10")
    });
  });

  describe("#addFrame", function(){
    it("adds one frame to the frame total", function(){
      game.addFrame()
      expect(game.getCurrentFrame()).toEqual(2)
    });

    it("doesn't add one frame when the number of frames is 10", function(){
      for (var i = 0; i <15; i++){
        game.addFrame()
      }
      expect(game.getCurrentFrame()).toEqual(10)
    });
  });

  describe("#isStrikeBonus", function(){
    it("is set to false by default", function(){
      expect(game.isStrikeBonus()).toEqual(false)
    });

    it("changes to true after rolling a 10 on your first roll", function(){
      game.addRoll(10)
      expect(game.isStrikeBonus()).toEqual(true)
    });
  });

  describe("#setStrikeBonus", function(){
    it("changes #isSpareBonus from false to true", function(){
      game.setStrikeBonus()
      expect(game.isStrikeBonus()).toEqual(true)
    });

    it("changes #isStrikeBonus from true to false", function(){
      game.setStrikeBonus()
      game.setStrikeBonus()
      expect(game.isStrikeBonus()).toEqual(false)
    });
  });

  describe("#isSpareBonus", function(){
    it("is set to false by default", function(){
      expect(game.isSpareBonus()).toEqual(false)
    });

    it("is set to true if all pins are knocked down on the second roll", function(){
      RollSpare()
      expect(game.isSpareBonus()).toEqual(true)
    });

    it("resets to false after completing bonus roll", function(){
      RollSpare()
      game.addRoll(4)
      expect(game.isSpareBonus()).toEqual(false)
    });

    it("resets to false after completing a bonus roll that is a strike", function(){
      RollSpare()
      RollStrike()
      expect(game.isSpareBonus()).toEqual(false)
    });
  });

  //DO ONCE SPARE BONUS IMPLEMENTED
  // describe("#addStrikeBonus", function(){
  //   it("adds the roll to previous Frame's bonus if strikeBonus is true", function(){
  //     game.addRoll(10)
  //     game.addRoll(4)
  //
  //   });
  // });
});