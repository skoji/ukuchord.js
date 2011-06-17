var ukuChord = (function () {
	var parameter = {
		context: null,
		fingerstyle: "#880000",
		fingerrad: 2.5,
		linestyle: "#000000",
		finger: [1,2,3,4],
		chord: null
	}
	var drawFlet = function() {
		var context = parameter.context;
		context.strokeStyle = parameter.lineStyle;
		context.beginPath();
		context.moveTo(0,0);
		context.lineTo(30,0);
		context.moveTo(0,5);
		context.lineTo(30,5);

		for (i = 0; i <= 30; i += 10) {
			context.moveTo(i,0);
			context.lineTo(i,58);
		}

		for (i = 15; i <= 55; i += 10) {
			context.moveTo(0,i);
			context.lineTo(30,i);
		}
		context.stroke();
	}
	
	var drawFinger = function(string, flet) {
		var x = 30 - string * 10;
		var y = 10 * flet;
		var context = parameter.context;
		context.beginPath();
		context.strokeStyle = parameter.fingerstyle;
		context.fillStyle = parameter.fingerstyle;
		context.arc(x,y, parameter.fingerrad, 0, 2 * Math.PI, true);
		context.fill();
		context.stroke();

	}
	
	var drawFingers = function() {
		for (i = 0; i < 4; i ++) {
			drawFinger(i, parameter.finger[i]);
		}
	}

	var applyChord() {
		if (parameter.chord == null) return;
		
	}
		
	return {
		draw: function (param) {
			for (var x in param) {
				parameter[x] = param[x];
			}
			applyChord():
			parameter.context.save();
			drawFlet();
			drawFingers();
			parameter.context.restore();
		}
	}
})();