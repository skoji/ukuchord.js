$().ready(
	function() {
        $("#chordarea").bind('touchend', toggle);
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

