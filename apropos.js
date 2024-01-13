function sleep(ms) {
	return new Promise((resolve) => { setTimeout(resolve, ms) });
}


async function start_channel_1() {
	//$("#mainAudio > audio").get(0).play();
	$("#mainVideo > video").get(0).play();
}

async function start_channel_2() {
	await sleep(11000);
	$("body>.logo").addClass("show");
}

async function start_channel_3() {
	function s_credit(n) {
		$(`.credit:nth-of-type(${n})`).addClass("show");
	}
	function h_credit(n) {
		$(`.credit:nth-of-type(${n})`).removeClass("show");
	}

	s_credit(1);
	await sleep(3000);
	h_credit(1);
	await sleep(1000);
	s_credit(2);
	await sleep(3000);
	h_credit(2);
	await sleep(1000);
	s_credit(3);
	await sleep(3000);
	h_credit(3);
	await sleep(1000);
}

async function start() {
	$("body > .playButton").addClass("hidden");
	await sleep(1000);
	start_channel_1();
	start_channel_2();
	start_channel_3();
}


$("body > .playButton").click(() => {
	$("body").addClass("started");
	start();
})