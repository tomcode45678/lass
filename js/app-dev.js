var loading = false, count = 0, app = {
	start: function () {
		var add = document.getElementById('generate');
		add.onclick = function () {
			if (loading) {
				alert('The app is still generating the previous sequence.');
			}
			if (count > 27) {
				alert('WARNING: Codes will be generated but this will be slower each time, eventually this will crash your browser.');
			}
			count++;
			app.add();
			return false;
		};

		var reset = document.getElementById('reset');
		reset.onclick = function () {
			loading = false;
			count = 0;
			app.reset();
			return false;
		};
	},

	add: function () {
		var origin = document.querySelector('#codes li:last-child');
		app.sequenceCalc(origin);
	},

	sequenceCalc: function (sequenceNumber) {
		var sequenceArray = sequenceNumber.innerHTML.split("");
		var qty = 0, newSeq = [];
		loading = true;
		for (var i = 0; sequenceArray.length > i; i++) {
			qty++;
			if (sequenceArray[i] === sequenceArray[i-1]) {
				if (newSeq[i-1] === sequenceArray[i]+sequenceArray[i-1] || newSeq

[newSeq.length-1] === qty-1+sequenceArray[i-1]) {
					newSeq.splice(newSeq.length-1, 1);
				}
			} else {
				qty = 1;
			}
			newSeq.push(qty+sequenceArray[i]);
		}
		var codes = document.getElementById('codes');
		codes.innerHTML = codes.innerHTML+'<li>'+newSeq.join("")+'</li>';
		codes.scrollTop = codes.scrollHeight;
		loading = false;
	},

	reset: function () {
		var codes = document.getElementById('codes');
		codes.innerHTML = '<li>1</li>';
	}
};

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        app.start();
    }
};