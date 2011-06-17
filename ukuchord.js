var ukuChord = (function () {

	var stringInterval = 12;
	var fletInterval = 10;
	var flets = 5;
	var topInterval = 5;
	var bottomMargin = 3;

	var width = stringInterval * 3;
	var height = fletInterval * 5 + topInterval + bottomMargin;
	
	var parameter = {
		context: null,
		fingerstyle: "#880000",
		fingerrad: 2.5,
		linestyle: "#000000",
		finger: [1,2,3,4],
		chord: null,
		width: 0,
		dir: 'vertical'
	}
	
	var drawFlet = function() {
		var context = parameter.context;
		context.strokeStyle = parameter.lineStyle;
		context.beginPath();

		context.moveTo(0,0);
		context.lineTo(width,0);
		context.moveTo(0,topInterval);
		context.lineTo(width,topInterval);

		for (i = 0; i <= width; i += stringInterval) {
			context.moveTo(i,0);
			context.lineTo(i,height);
		}

		for (i = fletInterval + topInterval; i <= height; i += fletInterval) {
			context.moveTo(0,i);
			context.lineTo(width,i);
		}
		context.stroke();
	}
	
	var drawFinger = function(string, flet) {
		if (flet == 0) return;
		var x = width - string * stringInterval;
		var y = topInterval + ( fletInterval * flet ) - fletInterval / 2;
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

	var applyChord = function() {
		if (parameter.chord == null) return;
		parameter.finger = chordslist[parameter.chord];
	}

	var chordslist = {
		"A7":[0,0,1,0],
		"Am":[0,0,0,2],
		"B7":[2,2,3,2],
		"C": [3,0,0,0],
		"C7":[1,0,0,0],
		"C7 13":[0,0,0,3],
		"C9":[1,0,2,0],
		"Cdim": [3,2,3,2],
		"D": [0,2,2,2],
		"Dm": [0,1,2,2],
		"D7": [0,2,0,2],
		"E7":[2,0,2,1],
		"Em":[2,3,4,0],
		"F" :[0,1,0,2],
		"F7" :[0,1,3,2],
		"Bb": [1,1,2,3],
		"C9": [1,0,2,0],
		"G": [2,3,2,0],
		"G7": [2,1,2,0],
		"G9": [0,1,2,0],
		
	}
	
	return {
		chords: (
			function() {
				var r = [];
				var i = 0;
				for (x in chordslist) {
					r[i++] = x;
				}
				return r;
			}
		)(), 

		draw: function (param) {
			for (var x in param) {
				parameter[x] = param[x];
			}
			applyChord();
			parameter.context.save();

			if (parameter.dir == 'vertical') {
				 parameter.context.translate(width * 0.25  ,0);
			} else {
				parameter.context.rotate(-0.5 * Math.PI);
				parameter.context.translate(- (width*1.25),0);
			}
			parameter.context.translate(parameter.fingerrad,1);

			drawFlet();
			drawFingers();
			parameter.context.restore();
		}
	}
})();