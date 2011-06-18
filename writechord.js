$().ready(
	function() {
		var TOUCH_ENABLED = (function() {
 			var div = document.createElement('div');
   			div.setAttribute('ontouchstart', 'return');
			return typeof div.ontouchstart == 'function';
		})();
		if (TOUCH_ENABLED) {
			$("#main").bind('touchend', toggle);
		} else {
			$("#main").bind('click', toggle);
		}
		load();

		if ($("#message").text() == "Answer")
			answer();
		else
			challange();

		save();
	}
);


function save() {
	if (localStorage == null) return;
	localStorage["ukuchord/message"] = $("#message").text();
	localStorage['ukuchord/chordname'] = $("#chordname").text();
	direction.save(localStorage);
}

function load() {
	if (localStorage == null) return;
	if (localStorage['ukuchord/message'])
		$("#message").text(localStorage['ukuchord/message']);
	if (localStorage['ukuchord/chordname'])
		$("#chordname").text(localStorage['ukuchord/chordname']);
	direction.load(localStorage);
}

function toggle()
{
	if ($("#message").text() == "Challenge")
		answer();
	else
		challange();
	save();
}
function challange() {
	chord()
	$("#chordname").text(randChord());
	$("#message").text("Challenge");
}

function answer() {
	chord($("#chordname").text());
	$("#message").text("Answer");
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
				this.save();
			},
			save: function() {
				localStorage["ukuchord/direction"] = d;
			},
			load: function() {
				if (localStorage["ukuchord/direction"])
					d = localStorage["ukuchord/direction"];
			}
		}
		
	}
)();