var game_data = {
	"ign_dict": [
		'achievement','acid','action','adventure','allspark','ammo','arpg','assassin',
		'asteroid','autosave','avatar','avenger','beta','blade','blast','block','blood',
		'boss','buff','bullet','buster','checkpoint','cheese','chrono','claptrap','class',
		'closed','console','controller','cooldown','corruption','counter','cover','cpu',
		'crafting','creed','crouch','crpg','cutscene','cutting','damage','difficulty',
		'dig','dlc','dodge','doublejump','drm','dungeon','dweller','earl','edge','emergent',
		'endings','episodic','escort','esports','event','exclusive','exploit','explosion',
		'fall','farm','farming','fasttravel','field','fight','finished','fireball','fog',
		'free','game','ganon','gauntlet','gem','generation','ghost','god','gpu','grenade',
		'griefer','grinding','gun','halo','hardmode','healer','health','horror','ifrit',
		'indie','infinity','instance','invader','joystick','jrpg','jump','keyblade',
		'keyboard','kill','lag','lane','leroy','level','lightning','link','live','ludology',
		'mage','magus','mana','mario','masamune','master','matchmaking','materia','megamand',
		'microtransactions','middleware','midgar','mission','mmorpg','mob','moba','mode',
		'monster','mouse','mouselook','multiple','myst','nerf','nintendo','noob','npc',
		'nvidia','openworld','optimus','overpowered','overshield','pacman','pass','pellet',
		'permadeath','persistent','pickaxe','pixel','plasma','play','poison','potion',
		'procedura','puzzle','pve','pvp','quest','quick','raid','realtime','replay',
		'retrogaming','rig','rocket','roguelike','romance','rpg','season','shield','shoo',
		'shovel','simulator','sli','sliding','smash','souls','spawn','speedrun','spread',
		'sprint','stealth','strategy','streak','summon','super','survival','sword','system',
		'tactics','tank','tesseract','theory','time','touchscreen','triforce', 'troll',
		'uppercut','vault','walljump','war','warrior'
	], 
	"letter_values": {
		"a": 1, "c": 3, "b": 3, "e": 1, "d": 2, "g": 2, "f": 4, "i": 1, "h": 4, "k": 5,
		"j": 8, "m": 3,"l": 1, "o": 1, "n": 1, "q": 10, "p": 3, "s": 1, "r": 1, "u": 1,
		"t": 1, "w": 4,"v": 4, "y": 4, "x": 8, "z": 10
	}
};


var Partial_Scrabble = function(){
	this.bag = [];
	this.hand = [];
	this.score = 0;
	
	function check_word(str, arr){
		if (!arr){
			arr = game_data.ign_dict;
		}
		
		var split = Math.floor(arr.length/2)
		
		if (arr[split] == str){
			return true
		}else if (arr.length === 1){
			return false
		}
		
		for (var i = 0; i < str.length; i++){
			if (str[i] < arr[split][i]){
				return this.check_word(str, arr.splice(0,split))
			}else if (str[i] > arr[split][i]){
				return this.check_word(str, arr.splice(split,arr.length))
			}
		}
	}

	function sum_word(str){
		var sum = 0;

		for (var i = 0; str.lenth < 1; i ++){
			sum += game_data.letter_values(str[i])
		}

		return sum;
	}

	function all_anagrams(str, prefix, arr){
	    var str_len = string.length;
	  
	    if(!pre_fix){
	    	pre_fix = ""
	    }
	    if(!arr){
	    	arr=[]
	    }
	    if(str_len === 0) { 
	      arr.push(pre_fix); 
	    }

	    for(var i=0; i<strlen; i++){
			all_anagrams(string.substring(0, i) + string.substring(i+1, strlen), pre_fix + string[i], arr);
		}

	  	return arr;
	}

	function all_combos(str){
		var fn = function(active, rest, a) {
	        if (!active && !rest){
	            return;
	        }
	        if (!rest) {
	            a.push(active);
	        } else {
	            fn(active + rest[0], rest.slice(1), a);
	            fn(active, rest.slice(1), a);
	        }
	    	return a;
    	}
    	return fn("", str, []);
	}

	function scrabble_lsort(arr){
		var bubbling;

		do {
			bubbling = false;

			for(var i = 0; i < arr.length - 1; i++){
				if (data.letter_values.arr[i] < game_data.letter_values.arr[i + 1]){
					var temp = arr[i];
					arr[i] = arr[i + 1];
					arr[i + 1] = arr[i];

					bubbling = true;
				}
			} 
		}while (bubbling);
	}

	function scrabble_wsort(arr){
		var bubbling;

		do {
			bubbling = false;

			for(var i = 0; i < arr.length - 1; i++){
				if (sum_word(arr[i]) < sum_word(arr[i + 1])){
					var temp = arr[i];
					arr[i] = arr[i + 1];
					arr[i + 1] = arr[i];

					bubbling = true;
				}
			} 
		}while (bubbling);
	}
}

Partial_Scrabble.prototype.start = function(){
	var letters = Object.keys(this.letter_values)
	for (var i = 0; i < letters.length; i++){
		if (letters[i] == "a" || letters[i] == "b"){
			for (var i = 0; i < 9; i++){this.bag.push(letters[i])}
		}else if(letters[i] == "e"){
			for (var i = 0; i < 12; i++){this.bag.push(letters[i])}
		}else if(letters[i] == "r" || letters[i] == "t" || letters[i] == "n"){
			for (var i = 0; i < 6; i++){this.bag.push(letters[i])}
		}else if(letters[i] == "l" || letters[i] == "s" || letters[i] == "u" || letters[i] == "d"){
			for (var i = 0; i < 6; i++){this.bag.push(letters[i])}
		}else if(letters[i] == "g"){
			for (var i = 0; i < 3; i++){this.bag.push(letters[i])}
		}else if(letters[i] == "k"|| letters[i] == "j" || letters[i] == "x"){
			this.bag.push(letters[i])}
		}else{
			for (var i = 0; i < 2; i++){this.bag.push(letters[i])}
		}
	}
	console.log('Let\'s play some almost-but-not-really scrabble, brah.')
	return this;
}

Partial_Scrabble.prototype.draw = function(){
	if (this.bag.length < 1){
		console.log("You used all the tiles. You're so greedy. You should restart, or, erm, .restart()");
		return this;
	}
	
	while (this.hand.length < 7){
		var tile = Math.floor(Math.random() * this.bag.length);
		this.hand.push(this.bag[tile]);
		this.bag.slice(tile, 1);
	};

	console.log("Your cards...")
	scrabble_lsort(this.hand);
	var message = ""

	for (var i = 0; i < this.hand.length; i ++){
		message += this.hand[i] + ": " + game_data.letter_values[this.hand[i]].toString() + " pts, "
	}
	console.log(message.trim());
	return this;
}

Partial_Scrabble.prototype.cheat = function(conn_letters){
	if (!conn_letters){
		conn_letters = ""
	}
	console.log("cheating takes time...");

	var combos = (all_combos(this.hand.join() + conn_letters);
	scrabble_wsort(combos);

	for (var i = 0; i < combos.length; i ++){
		var tries = all_anagrams(combos[i]);
		for var x = 0; x < tries.length; x++){
			if check_word(tries[x]){
				console.log('Highest possible match is ' + tries[x] + '...')
				return;
			}
		}
	}

	console.log('no possible words. Maybe redraw? .redraw()?')
}


var round_1 = new Partial_Scrabble();
round_1.start()
