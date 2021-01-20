'use strict';

describe('Feature Test: ', function(){
  var plane;
  var airport;

  beforeEach(function(){
    plane = new Plane();
    airport = new Airport();
  });

  describe('normal conditions',function(){
    beforeEach(function(){
      spyOn(Math,'random').and.returnValue(0);
    });

    it('planes can land', function(){
      plane.land(airport);
      expect(airport.planes()).toContain(plane);
    });

    it('planes can takeoff', function(){
      plane.land(airport)
      plane.takeoff();
      expect(airport.planes()).not.toContain(plane);
    });
  });

  describe('stormy conditions',function(){

    it('cannot takeoff if stormy', function(){
      spyOn(Math,'random').and.returnValue(0);
      plane.land(airport)
      spyOn(airport._weather,'isStormy').and.returnValue(true);
      expect(function(){ plane.takeoff();}).toThrowError('cannot takeoff during storm');
      expect(airport.planes()).toContain(plane);
    });

    it('cannot land if stormy', function(){
      spyOn(Math,'random').and.returnValue(1);
      expect(function(){ plane.land(airport); }).toThrowError('cannot land during storm');
      expect(airport.planes()).toEqual([]);
    });
  });
});