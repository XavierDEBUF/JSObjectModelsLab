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

    global.Shapes.createShape = createShape;
  //  global.SpeedCheck.SpeedCheckError = SpeedCheckError;

     // return the newly created object.


  }(this));
//var p1 = createPoint({ x: -1, y: -4 });
