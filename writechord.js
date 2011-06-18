$().ready(
	function() {
		eventUtil.addTouchEnd(document.getElementById("chordarea"), toggle);
		challange();
	}
);


function toggle()
{
	if ($("#message").text() == "Challenge")
		answer();
	else
		challange();
}
function challange() {
	chord()
	$("#chordname").empty()
	$("#chordname").append(randChord());
	$("#message").empty()
	$("#message").append("Challenge");
}

function answer() {
	chord($("#chordname").text());
	$("#message").empty()
	$("#message").append("Answer");
}


function chord(chord) {
	var canvas = $("#chord").get(0);
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.save();
	ctx.scale(4.6,4.6);
	ukuChord.draw({ context: ctx, chord: chord, dir: direction.current(), finger: [0,0,0,0]});
	ctx.restore();
}

function randChord() {
	var a = ukuChord.chords[Math.floor(Math.random() * ukuChord.chords.length)];
	return a;
}

var direction = (
	function() {
		var d = 'vertical';
		return {
			current: function() {
				return d;
			},
			
			toggle: function () {
				d == 'vertical'? d = 'horizontal' : d = 'vertical';
				if ($("#message").text() == 'Challenge') {
					chord();
				} else {
					chord($("#chordname").text());
				}
			}
		}
		
	}
)();

var eventUtil = (
	function() {
		var TOUCH_ENABLED = (function() {
 			var div = document.createElement('div');
   			div.setAttribute('ontouchstart', 'return');
			return typeof div.ontouchstart == 'function';
		})();
		
		return {
			removeTouchEnd: function(dom, func) {
				if (TOUCH_ENABLED) {
					dom.removeEventListener('touchend', func, false);
				} else {
					dom.removeEventListener('mouseup', func, false);
				}
			},
			addTouchEnd: function(dom, func) {
				if (TOUCH_ENABLED) {
					dom.addEventListener('touchend', func);
				} else {
					dom.addEventListener('mouseup', func);
				}
			}
		}
	}
)();