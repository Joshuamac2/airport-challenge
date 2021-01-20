'use strict';

describe('Airport', function(){
  var airport;
  var plane;
  var weather;

  beforeEach(function(){
    plane = jasmine.createSpy('plane');
    weather = jasmine.createSpyObj('weather', ['isStormy']);
    airport = new Airport(weather);
  });

  it('default 0 planes', function(){
    expect(airport.planes()).toEqual([]);
  });

  describe('normal conditions',function(){
    beforeEach(function(){
      weather.isStormy.and.returnValue(false);
    });
    it('can landing', function(){
      airport.clearForLanding(plane);
      expect(airport.planes()).toEqual([plane]);
    });
    it('can takeoff', function(){
      airport.clearForLanding(plane);
      airport.clearForTakeOff(plane);
      expect(airport.planes()).toEqual([]);
    });
  });

  describe('stormy conditions',function(){
    beforeEach(function(){
      weather.isStormy.and.returnValue(true);
    });
    it('cannot land', function(){
      expect(function(){ airport.clearForLanding(plane); }).toThrowError('cannot land during storm');
    });
    it('cannot takeoff', function(){
      expect(function(){ airport.clearForTakeOff(plane); }).toThrowError('cannot takeoff during storm');
    });
  });
});