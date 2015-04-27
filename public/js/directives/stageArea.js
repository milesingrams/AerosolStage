'use strict';

angular.module('aerosol.directives')
	.directive('stageArea', [
		function () {
			return {
				restrict: 'E',
				templateUrl: 'views/directives/stage-area.html',
				link: function (scope, elem, attr) {

					var data = [{type:'point', x:100, y:100}, {type:'line', x1:200, y1:150, x2:350, y2:150}];

					var pixelsPerMM = 1;

					var margin = {top: 30, right: 0, bottom: 0, left: 40};
					var width = elem[0].clientWidth - margin.left - margin.right;
					var height = elem[0].clientHeight - margin.top - margin.bottom;

					var xMin = 0, xMax = width/pixelsPerMM;
					var yMin = 0, yMax = height/pixelsPerMM;

					// Set axis scale domains
					var x = d3.scale.linear()
						.domain([xMin, xMax]);

					var y = d3.scale.linear()
						.domain([yMin, yMax]);

					// Create axis functions
					var xAxis = d3.svg.axis()
						.scale(x)
						.orient("top");

					var yAxis = d3.svg.axis()
						.scale(y)
						.orient("left");

					// Create zoom function
					var zoom = d3.behavior.zoom()
						.scaleExtent([1, 1000])
						.on("zoom", resetAxes);

					//***********************************  MAIN MAP  ***********************************
					var svgMainMap = d3.select(elem[0]).append("svg")
						.attr("class", "main-map")
						.append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
						.call(zoom);


					// Only allow panning and zooming with middle mouse button
					elem.on("mousedown", function (e) {
						if (e.which !== 2) {
							e.stopPropagation();
						}
					});

					elem.on("mousemove", function (e) {
						if (e.which !== 2) {
							e.stopPropagation();
						}
					});

					svgMainMap.on("dblclick.zoom", null); // disable double click zoom

					// Add background element
					svgMainMap.append("rect")
						.attr("width", "100%")
						.attr("height", "100%");

					// The container for the x Axis elements
					var xAxisElem = svgMainMap.append("g")
						.attr("class", "x axis")
						.call(xAxis);

					// The container for the y Axis elements
					var yAxisElem = svgMainMap.append("g")
						.attr("class", "y axis")
						.call(yAxis);

					// The container for the shapes
					var shapesElem = svgMainMap.append("g")
						.attr("class", "shapes");

					// Lines
					var lineShapes = shapesElem.selectAll("line")
						.data(data)
						.enter().append("line")
						.filter(function(d) { return d.type === 'line' })
						.attr("class","line")
						.attr("x1", 0)
						.attr("y1", 0)
						.attr("x2", function(d) { return d.x2-d.x1})
						.attr("y2", function(d) { return d.y2-d.y1});

					//***********************************  MINI MAP  ***********************************
					var divMiniMap = d3.select(elem[0]).append("div")
						.attr("class", "mini-map")

					var svgMiniMap = divMiniMap.append("svg")
						.append("g");

					svgMiniMap.append("rect")
						.attr("width", "100%")
						.attr("height", "100%");


					//***********************************  FUNCTIONS  ***********************************
					// This repositions axes and shapes based on current pan/zoom/window size
					function resetAxes () {
					 	xAxisElem.call(xAxis);
						yAxisElem.call(yAxis);

						// Lines
						lineShapes.attr("transform", function(d, i) {
							return "translate("+x(d.x1)+","+y(d.y1)+")scale(" + zoom.scale() + ")";
						});
					}

					// This builds the stage for the current window size
					function resize () {
						width = elem[0].clientWidth - margin.left - margin.right;
						height = elem[0].clientHeight - margin.top - margin.bottom;

						xMin = x.domain()[0];
						yMin = y.domain()[0];
						xMax = xMin+(width/pixelsPerMM)/zoom.scale();
						yMax = yMin+(height/pixelsPerMM)/zoom.scale();
						// Reset range size
						x.domain([xMin, xMax]).range([0, width]);
						y.domain([yMin, yMax]).range([0, height]);

						// Reset zoom scaling
						zoom.x(x).y(y);

						// Reset tick size
						xAxis.ticks(Math.floor(width/100)).tickSize(-height);
						yAxis.ticks(Math.floor(height/100)).tickSize(-width);

						// Move axis to new bottom
						resetAxes();
					}

					// This resets stage to max zoom
					scope.unzoom = function () {
						d3.transition().duration(750).tween("zoom", function() {
							var ix = d3.interpolate(x.domain(), [0, width/pixelsPerMM]),
								iy = d3.interpolate(y.domain(), [0, height/pixelsPerMM]);
							return function(t) {
								zoom.x(x.domain(ix(t))).y(y.domain(iy(t)));
								resetAxes();
							};
						});
					}

					resize(); // initial resize call to setup area
					d3.select(window).on('resize', resize); // call resize whenever window is resized
				}
			};
		}]);