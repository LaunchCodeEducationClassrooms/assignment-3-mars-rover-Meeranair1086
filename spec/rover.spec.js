const assert = require('assert');
const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  //test 7
    it("constructor sets position and default values for mode and generatorWatts", function(){
    let rover = new Rover(98382);

    assert.deepStrictEqual(
      [
        rover.position,
        rover.mode,
        rover.generatorWatts
      ],
      [98382,'NORMAL',110]

    );
  });
   
  // test 8
  it("response returned by receiveMessage contains name of message", function(){
     let rover = new Rover(98382);
     let msg= new Message("Test for name");
     let res = rover.receiveMessage(msg);
     assert.strictEqual(typeof res.message,'string');
  });
  
  //test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message",function(){
    let rover = new Rover(98382);
    let msg= new Message("Test message with two commands",[
        new Command("MODE_CHANGE","LOW_POWER"),
        new Command("STATUS_CHECK")
      ]);
    let res=rover.receiveMessage(msg);
    assert.strictEqual(Array.isArray(res.results),true);
  });
  
  //test 10
  it("responds correctly to status check command",function(){
    let rover = new Rover(98382);
    let msg= new Message("Test message status check command",[new Command("STATUS_CHECK")]);
    let res=rover.receiveMessage(msg);
    assert.deepStrictEqual(
    [
        res.results[0].roverStatus.mode,
        res.results[0].roverStatus.generatorWatts,
        res.results[0].roverStatus.position
      ],[
        'NORMAL',
        110,
        98382
      ]
    );
  });
  
  //test 11
  it("responds correctly to mode change command",function(){
    let rover = new Rover(98382);
    let msg= new Message("Test mode change",[new Command("MODE_CHANGE")],[new Command("LOW_POWER")]);
    let res=rover.receiveMessage(msg);
    assert.deepStrictEqual(
    [
        res.results[0].completed,
      ],[
        true,
      ]
    );
  });
  
  //test 12
  it("responds with false completed value when attempting to move in LOW_POWER mode",function(){
    let rover = new Rover(98382);
    let msg = new Message("Test move in LOW_POWER mode",[
      new Command("MODE_CHANGE","LOW_POWER"),
      new Command("MOVE",98382)
    ]);
    let res = rover.receiveMessage(msg);
    assert.deepStrictEqual([
      res.results[0].completed,
      res.results[1].completed,
    ],[
      true,
      false
    ]);
  });
  
  //test 13
  it("responds with position for move command",function(){
    let rover = new Rover(98382);
    let msg = new Message("Test move in NORMAL mode",[
      new Command("MOVE",98382),
      new Command("STATUS_CHECK")
    ]);
    let res = rover.receiveMessage(msg);
    assert.deepStrictEqual([
      res.results[0].completed,
      res.results[1].completed,
      res.results[1].roverStatus.position
    ],[
      true,
      true,
      98382
    ]);
  });
  });