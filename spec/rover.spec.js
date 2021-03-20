const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  //test 7
    it("constructor sets position and default values for mode and generatorWatts", function(){
    let rover = new Rover(100);
/*
    assert.deepStrictEqual(
      [
        rover.position,
        rover.mode,
        rover.generatorWatts
      ],
      [100,'NORMAL',110]

    );*/
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
    expect(rover.position).toEqual(100);
  });
   
  // test 8
  it("response returned by receiveMessage contains name of message", function(){
     let rover = new Rover(100);
     let msg= new Message("Test for name");
     let response = rover.receiveMessage(msg);
     //assert.strictEqual(typeof response.message,'string');
     expect(response.message).toEqual('Test for name');
  });
  
  //test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message",function(){
    let rover = new Rover(100);
    let msg= new Message("Test message with two commands",[
        new Command("MODE_CHANGE","LOW_POWER"),
        new Command("STATUS_CHECK")
      ]);
    let response=rover.receiveMessage(msg);
    //assert.strictEqual(Array.isArray(response.results),true);
    expect(response.results.length).toEqual(2);
  });
  
  //test 10
  it("responds correctly to status check command",function(){
    let rover = new Rover(100);
    let msg= new Message("Test message status check command",[new Command("STATUS_CHECK")]);
    let response=rover.receiveMessage(msg);
    /*assert.deepStrictEqual(
    [
      
        response.results[0].roverStatus.mode,
        response.results[0].roverStatus.generatorWatts,
        response.results[0].roverStatus.position
      ],[
        'NORMAL',
        110,
        100
      ]
    );*/
    expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[0].roverStatus.position).toEqual(100);
  });
  
  //test 11
  it("responds correctly to mode change command",function(){
    let rover = new Rover(100);
    let msg= new Message("Test mode change",[new Command("MODE_CHANGE","LOW_POWER")]);
    let response=rover.receiveMessage(msg);
    /*assert.deepStrictEqual(
    [
      response.results[0].completed.toBeTrue
      ]);*/
      expect(response.results[0].completed).toBeTrue;
      expect(rover.mode).toEqual('LOW_POWER');
  });
  
  //test 12
  it("responds with false completed value when attempting to move in LOW_POWER mode",function(){
    let rover = new Rover(100);
    let msg = new Message("Test move in LOW_POWER mode",[
      new Command("MODE_CHANGE","LOW_POWER"),
      new Command("MOVE",100)
    ]);
    let response = rover.receiveMessage(msg);
   /* assert.deepStrictEqual([
      response.results[0].completed.toBeTrue,
      response.results[1].completed.toBeFalse
    ]);*/
    expect(rover.position).toEqual(100);
  });
  
  //test 13
  it("responds with position for move command",function(){
    let rover = new Rover(100);
    let msg = new Message("Test move in NORMAL mode",[
      new Command("MOVE",4321),
      new Command("STATUS_CHECK"),
      new Command('MOVE', 3579),
       new Command('STATUS_CHECK')
    ]);
    let response = rover.receiveMessage(msg);
    /*assert.deepStrictEqual([
      response.results[0].completed.toBeTrue,
      response.results[1].completed.toBeTrue,
      response.results[1].roverStatus.position
    ]);*/
    expect(response.results[1].roverStatus.position).toEqual(4321);
    expect(response.results[3].roverStatus.position).toEqual(3579);

    /*expect(response.results[0].completed).toBeTrue;
    expect(response.results[1].roverStatus.position).toEqual(4321);
    expect(response.results[2].completed).toBeTrue;
    expect(response.results[3].completed).toBeFalse;
    expect(response.results[4].roverStatus.position).toEqual(4321);
    expect(response.results[4].roverStatus.mode).toEqual('LOW_POWER');
    expect(response.results[4].roverStatus.generatorWatts).toEqual(110);*/
    });
  });