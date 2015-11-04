(function () {
    'use strict';

    /* global test,equal,module,start,stop,window,$,ok,expect */


    /*---------------------------------*/
    /*     PART ONE: SIMPLE MODULE     */
    /*---------------------------------*/
    module('SpeedCheck Module', {
        beforeEach: function() {

        }
    });
    test('Test SpeedCheck\' VERSION Property', function() {
        expect(1);
        equal(window.SpeedCheck.VERSION, '0.0.1', 'The SpeedCheck module should have a VERSION property');
    });
    // TODO: Vérifier que la création d'objets SpeedCheck est Possible
    test('Test Creation of a Default Object', function() {
      expect(2);
      notEqual(typeof window.SpeedCheck.createSpeedCheck, 'undefined', 'The SpeedCheck module sould expose a "createSpeedCheck" function');
      var speedCheck0 = window.SpeedCheck.createSpeedCheck();
      //speedCheck0.speed=42;
      //speedCheck0.licencePlate='3-DFE-456';
      equal(typeof speedCheck0, 'object', 'The "SpeedCheck" function sould return objects.');
    });

    // TODO: Vérifier que les objets créés directement avec creatSpeedCheck ne sont pas utilisables :
    // speed0 = creatSpeedCheck();
    // speed0.speed = 42; // SHOULD throw a SpeedCheckError.
    // speed0.licencePlate = '3-DFE-456'; // SOULD throw a SpeedCheckError.
    test('Test not able to directly access of a Default Object', function() {
      expect(2);

      var speed0 = window.SpeedCheck.createSpeedCheck();

    throws(function() {speed0.speed=42;}, "Speed editing - SHOULD throw a SpeedCheckError");
    throws(function() { speed0.licencePlate = '3-DFE-456'; }, "Licence plate editing - SHOULD throw a SpeedCheckError");
 });

    // TODO: Vérifier que TOUTES les fonctionnalités de createSpeedCheckFR sont correctes (effects de bords, valeurs négatives, etc.) pour tous les attributs (speed et licencePlate)
    test('SpeedCheck FR', function() {
      //expect(15);
          var mySpeed = window.SpeedCheck.createSpeedCheckFR();
          equal(mySpeed.speed, 0, "Base speed OKI");
          mySpeed.speed = 42;
          equal(mySpeed.speed, 42, "Modified speed OKI");
          throws(function() { mySpeed.speed = -42; }, "Invalid speed - negative - SHOULD throw a SpeedCheckError");
          equal(mySpeed.speed, 42, "Last good speed OKI");
          equal(mySpeed.infraction, false, "No infraction OKI (42km/h)");
          mySpeed.speed = 0;
          equal(mySpeed.infraction, false, "No infraction OKI (0km/h)");
          mySpeed.speed = 131;
          equal(mySpeed.infraction, true, "Infraction OKI (131km/h)");
          equal(mySpeed.licencePlate, "???", "Base licence plate");
          mySpeed.licencePlate = "BF108QE";
          equal(mySpeed.licencePlate, "BF108QE", "BM108QE licence plate");
          throws(function() { mySpeed.licencePlate = "123456"; }, "Invalid licence plate - 123456 - SHOULD throw a SpeedCheckError");
          equal(mySpeed.licencePlate, "BF108QE", "Last good licence plate");
          });
    // TODO: Vérifier que TOUTES les fonctionnalités de createSpeedCheckBE sont correctes (effects de bords, valeurs négatives, etc.) pour tous les attributs (speed et licencePlate)
    test('SpeedCheck BE', function() {
      //expect(15);
          var mySpeed = window.SpeedCheck.createSpeedCheckBE();
          equal(mySpeed.speed, 0, "Base speed OKI");
          mySpeed.speed = 42;
          equal(mySpeed.speed, 42, "Modified speed OKI");
          throws(function() { mySpeed.speed = -42; }, "Invalid speed - negative - SHOULD throw a SpeedCheckError");
          equal(mySpeed.speed, 42, "Last good speed OKI");
          equal(mySpeed.infraction, false, "No infraction OKI (42km/h)");
          mySpeed.speed = 0;
          equal(mySpeed.infraction, false, "No infraction OKI (0km/h)");
          mySpeed.speed = 121;
          equal(mySpeed.infraction, true, "Infraction OKI (131km/h)");
          equal(mySpeed.licencePlate, "???", "Base licence plate");
          mySpeed.licencePlate = "3-ADJ-234";
          equal(mySpeed.licencePlate, "3-ADJ-234", "3-ADJ-234 licence plate");
          throws(function() { mySpeed.licencePlate = "123456"; }, "Invalid licence plate - 123456 - SHOULD throw a SpeedCheckError");
          equal(mySpeed.licencePlate, "3-ADJ-234", "Last good licence plate");
          });

    // TODO: Vérifier que la fonction toString() fonctionne bien.
    //  - chaine de caractère attentue pour une infracion (e.g. licencePlate === 'WD366MD' et  speed === 135):
    //      "Véhicule WD366MD roule à 135 km/h. Infraction!"
    //  - chaine de caractère attendue pour sans infraction (e.g. licencePlate === 'WD366MD' et  speed === 105):
    //      "Véhicule WD366MD roule à 105 km/h. Ça va, circulez..."
    test('toString SpeedCheck', function() {
         var mySpeed = window.SpeedCheck.createSpeedCheckFR();
          mySpeed.speed = 135;
          mySpeed.licencePlate = "WD366MD";
          equal(mySpeed.toString(), "Véhicule WD366MD roule à 135 km/h. Infraction!", "FR : toString OKI (Véhicule WD366MD roule à 135 km/h. Infraction!)");
          mySpeed.speed = 105;
          equal(mySpeed.toString(), "Véhicule WD366MD roule à 105 km/h. Ça va, circulez...", "FR : toString OKI (Véhicule WD366MD roule à 105 km/h. Ça va, circulez...)");
          mySpeed = window.SpeedCheck.createSpeedCheckBE();
          mySpeed.speed = 121;
          mySpeed.licencePlate = "1-ABC-123";
          equal(mySpeed.toString(), "Véhicule 1-ABC-123 roule à 121 km/h. Infraction!", "BE : toString OKI (Véhicule 1-ABC-123 roule à 121 km/h. Infraction!)");
          mySpeed.speed = 101;
          equal(mySpeed.toString(), "Véhicule 1-ABC-123 roule à 101 km/h. Ça va, circulez...", "BE : toString OKI (Véhicule 1-ABC-123 roule à 101 km/h. Ça va, circulez...)");
        });



    /*---------------------------------*/
    /*  PART TWO: The "Shapes" module  */
    /*---------------------------------*/
        var roadAttr, amenityAttr, buildingAttr, naturalAttr;
    module('Unit Testing The "Shapes" Module', {
      beforeEach: function(){
        roadAttr = JSON.parse('{ \
          "building": false, \
          "highway": "Residential", \
          "_id": "-629863", \
          "nodes": [{ \
              "y": 369.0, \
              "x": 708.0 \
          }, { \
              "y": 396.0, \
              "x": 743.0 \
          }], \
          "name": "Rue de Colmar" \
          } \
        ');

        amenityAttr = JSON.parse('{\
        "_id":"-629724",\
        "nodes":[{"y":32.0,\
        "x":629.0},\
        {"y":42.0,\
        "x":597.0},\
        {"y":43.0,\
        "x":595.0},\
        {"y":32.0,\
        "x":629.0}],\
        "amenity":"parking"}');

        buildingAttr = JSON.parse('{"building":true,\
        "_id":"-629719",\
        "nodes":[{"y":0.0,\
        "x":0.0},\
        {"y":0.0,\
        "x":100.0},\
        {"y":100.0,\
        "x":100.0},\
        {"y":100.0,\
        "x":0.0},\
        {"y":0.0,\
        "x":0.0}]}');

        naturalAttr = JSON.parse('{"building":false,\
        "_id":"-630043",\
        "nodes":[{"y":309.0,\
        "x":222.0},\
        {"y":324.0,\
        "x":262.0},\
        {"y":335.0,\
        "x":231.0},\
        {"y":309.0,\
        "x":222.0}],\
        "name":"Bassin Paul Vatine",\
        "natural":"water"}');

      }
    });


    test('Test Shapes\' VERSION Property', function() {
        expect(1);
        equal(window.Shapes.VERSION, '0.0.1', 'The Shapes module should have a VERSION property');
    });

    test('Test Creation of a Default Object', function() {
      expect(2);
      notEqual(typeof window.Shapes.createShape(), 'undefined', 'The Shapes module sould expose a "createShape" function');
      var shape0 = window.Shapes.createShape(roadAttr);
      equal(typeof shape0 ,'object', 'The "createShape" function sould return objects.');
    });

    test('Test proper hidding of properties', function() {
      expect(5);
      var shape0 = window.Shapes.createShape(roadAttr);
      var prop;
      var props = [];
      for(prop in shape0){
        if(shape0.hasOwnProperty(prop)){
          props.push(prop);
        }
      }
      // Only 4 properties SHOULD be  visible
      //{ id: [Function], toString: [Function], toSVGPath: [Function], getName: [Function] }
      equal(props.length, 4, 'Only 4 properties SHOULD be  visible in objects created by "createShape"');
      props.forEach(function(prop){
        ok(prop === 'id' || prop === 'toString' || prop === 'toSvgPath' || prop === 'getName', 'One of "id" "toString", "toSvgPath" or "getName"');
      });

    });


    test('Test the toSVGString method', function() {
      expect(1);
      var shape0 = window.Shapes.createShape(roadAttr);
      equal(shape0.toSvgPath(), 'M 708 369 L 743 396', 'Should create a valid SVG PATH (google SVG PATH for details)');
    });

    test('Test the name accessor', function() {
      expect(1);
      var shape0 = window.Shapes.createShape(roadAttr);
      equal(shape0.getName(), 'Rue de Colmar', 'Should return the value corresponding to the "name" property in the attributes');
    });


    test('Test the createRoad function', function() {
      expect(1);
      ok(typeof window.Shapes.createRoad !== 'undefined', 'The Shapes module sould expose a "createRoad" function');
    });

    test('Test objects created with the createRoad function', function() {
      expect(2);
      var road = window.Shapes.createRoad(roadAttr);
      ok(typeof road.getCategory === 'function', 'Object Created with "createRoad" Should have a getCategory function');
      equal(road.getCategory(),'Residential', 'Should return the value corresponding to the "highway" property in the attributes');
    });

    test('Test the createAmenity function', function() {
      expect(1);
      ok(typeof window.Shapes.createAmenity !== 'undefined', 'The Shapes module sould expose a "createAmenity" function');
    });
    test('Test objects created with the  createAmenity function', function() {
      expect(2);
      var amenity = window.Shapes.createAmenity(amenityAttr);
      ok(typeof amenity.getType === 'function', 'Object Created with "createAmenity" Should have a getType function');
      equal(amenity.getType(),'parking', 'Should return the value corresponding to the "amenity" property in the attributes');
    });

    test('Test the createBuilding function', function() {
      expect(1);
      ok(typeof window.Shapes.createBuilding !== 'undefined', 'The Shapes module sould expose a "createBuilding" function');
    });

    test('Test objects created with the  createBuilding function', function() {
      expect(2);
      var building = window.Shapes.createBuilding(buildingAttr);
      ok(typeof building.getArea === 'function', 'Object Created with "createBuilding" Should have a getArea function');
      equal(building.getArea(),10000, 'Should return the area of the building computed from the set of points in the nodes attributes');
    });


    test('Test the createNatural function', function() {
      expect(1);
      ok(typeof window.Shapes.createNatural !== 'undefined', 'The Shapes module sould expose a "createNatural" function');
    });
    test('Test objects created with the  createNatural function', function() {
      expect(2);
      var natural = window.Shapes.createNatural(naturalAttr);
      ok(typeof natural.getType === 'function', 'Object Created with "createNatural" Should have a getType function');
      equal(natural.getType(),'water', 'Should return the value corresponding to the "natural" property in the attributes');
    });





    /*-----------------------------------*/
    /* PART THREE: Test with a JSON file */
    /*-----------------------------------*/

    // TODO Write the whole test module for testing with the app/data/eure.json file.
    var obj;
    module('Asynchronous Unit Test Module', {
        setup: function() {
            stop();

            // You can load a resource before loaching the test...
            $.get('test.json').success(function(data){
                obj = data;
                start();
            });

            // ... Or any asynchroneous task
            // window.setTimeout(function() {
            //     obj = {a:'OK', b:'KO'};
            //     start();
            // }, 1000);

        }
    });

    test('test 1', function() {
        equal(obj.a, 'OK', 'Message');
        equal(obj.a+'KO', 'OKKO', 'Message');
    });

    test('test 2', function() {
        equal(obj.a+obj.b, 'OKKO', 'FAil');
    });

}());
