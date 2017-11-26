describe("Frame", function(){

  beforeEach(function(){
    frame = new Frame();
  });

  describe("#rollOne", function(){
    it("stores the first roll", function(){
      frame.setRollOne(3)
      expect(frame.getRollOne()).toEqual(3)
    });
  });

  describe("#rollTwo", function(){
    it("stores the second roll", function(){
      frame.setRollTwo(5)
      expect(frame.getRollTwo()).toEqual(5)
    });
  });

  describe("#bonus", function(){
    it("stores the bonus score", function(){
      frame.setBonus(7)
      expect(frame.getBonus()).toEqual(7)
    });
  })
});
