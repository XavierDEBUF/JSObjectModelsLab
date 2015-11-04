(function(global) {
  'use strict';
  global.Shapes = {
    VERSION:'0.0.1'
  };
  function createShape(attributes) {
    attributes = attributes || {};
    attributes._id = attributes._id || " ";
    attributes.name = attributes.name || " ";
    attributes.nodes = attributes.nodes || [{}];
    if (typeof attributes._id !== 'string' || typeof attributes.name !== 'string') {
        throw {
            name: "TypeError",
            message: "'id and name' need string"
        };
    };

    var shape = {};
    shape.id = function() {
        return attributes._id;
    };
    shape.getName = function() {
        return attributes.name;
    };
    shape.toString = function() { // public methods accessing hidden parameters.
        return '(' + attributes._id + ', ' + attributes.name + ')';
    };
    var formatNodes = attributes.nodes.map(function(tabXY){
          var rObj = [[]];
          rObj = [[tabXY.x,tabXY.y]];
          return rObj;
        });
    var svg= "";
    var svgFormat=formatNodes.map(function(tabNotComa){
          var rObj ="L ";
          rObj += [tabNotComa.toString().replace(","," ")];
           //.replace("L"," ");
          return rObj;
        });


      shape.toSvgPath = function() {
        var tr=svgFormat.join(" ");
        tr=tr.replace("L","");
        svg="M";
        svg=svg.concat(tr);
        return(svg);
    };
    return shape;
  }
  function createRoad(attributes){
    attributes = attributes || {};
    attributes.categorie= attributes.categorie|| " ";
    if (typeof attributes.categorie !== 'string'){
        throw {
            name: "TypeError",
            message: "'categorie' need string"
        };
    };
    var newRoad = createShape(attributes);
    newRoad.getCategory = function(){
      return attributes.highway;
    }
    return newRoad;
  }
  function createAmenity(attributes){
    attributes = attributes || {};
    attributes.type= attributes.type|| " ";
    if (typeof attributes.type !== 'string'){
        throw {
            name: "TypeError",
            message: "'type' need string"
        };
    };
    var newAmenity = createShape(attributes);
    newAmenity.getType = function(){
      return attributes.amenity;
    }
    return newAmenity;
  }
  function createBuilding(attributes){
    attributes = attributes || {};
    attributes.area = attributes.area || 0;
    if (typeof attributes.area !== 'number'){
        throw {
            name: "TypeError",
            message: "'area' need number"
        };
    };
    var newBuilding = createShape(attributes);
    newBuilding.getArea = function(){
      var myArea = 0;
        for(var cpt = 0; cpt < attributes.nodes.length; cpt++)
        {
          var myNextCpt = (cpt + 1 == attributes.nodes.length) ? 0 : cpt + 1;
          myArea += attributes.nodes[cpt].x * attributes.nodes[myNextCpt].y - attributes.nodes[cpt].y * attributes.nodes[myNextCpt].x;
        }

        return myArea / 2;
    }
    return newBuilding;
  }
  function createNatural(attributes){
    attributes = attributes || {};
    attributes.type= attributes.type|| " ";
    if (typeof attributes.type !== 'string'){
        throw {
            name: "TypeError",
            message: "'type' need string"
        };
    };
    var newNatural = createShape(attributes);
    newNatural.getType = function(){
      return attributes.natural;
    }
    return newNatural;
  }
    global.Shapes.createShape = createShape;
    global.Shapes.createRoad = createRoad;
    global.Shapes.createAmenity=createAmenity;
    global.Shapes.createBuilding=createBuilding;
    global.Shapes.createNatural=createNatural;


  }(this));
//var p1 = createPoint({ x: -1, y: -4 });
