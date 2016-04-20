"use scrict";
//we use strict so as to play it on the safe side, and we can better anticipate how the browser will interpret our 
//script. 

//I'm pretending I'm pulling the game_data from a separate area, hence why it's stored in JSON format.

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

//we're storing all of the logic in a game-like object

var Partial_Scrabble = function(){
	this.bag = [];
	this.hand = [];

	//because of the way JavaScript is structured, these functions aren't truly 'private', 
	//but I like to keep my 'helpers' in my object.
	this.private = {

		//We binary sort our dictionary to find the word.
		"check_word": function check_word(str, arr){
			if (!arr){
				arr = game_data.ign_dict;
			}
			
			var split = Math.floor(arr.length/2);
			
			if (arr[split] == str){
				return true;
			}else if (arr.length === 1){
				return false;
			}
			
			for (var i = 0; i < str.length; i++){
				if (str[i] < arr[split][i]){
					return check_word(str, arr.splice(0,split));
				}else if (str[i] > arr[split][i]){
					return check_word(str, arr.splice(split,arr.length));
				}
			}
		},
		
		//we recursively find each anagram by sorting all possible rotations after the first letter,
		//whilst the whole string itself. 
		"all_anagrams": function all_anagrams(str, prefix, arr){
		    var str_len = str.length;
		  
		    if(!prefix){
		    	prefix = "";
		    }
		    if(!arr){
		    	arr=[];
		    }
		    if(str_len === 0) { 
		      arr.push(prefix); 
		    }
	
		    for(var i=0; i<str_len; i++){
			all_anagrams(str.substring(0, i) + str.substring(i+1, str_len), pre_fix + str[i], arr);
		     }
	
		  	return arr;
		},
		
		//We recursively find all non-repetetive combos of the string;
		//we are actively avoiding including any possible permutation
		"all_combos": function(arr){
			var combos = [];
  			var combine = function(prefix, arr) {
		    		for (var i = 0; i < arr.length; i++) {
		      			combos.push(prefix + arr[i]);
		      			combine(prefix + arr[i], arr.slice(i + 1));
		    		}
	  		};
  			f('', arr);
  			return combos;
		},
		
		//we sort each word or letter by its corresponding scrabble value
		"scrabble_sort": function(arr){
			var sum_word =  function(str){
				var sum = 0;
		
				for (var i = 0; i < str.length; i ++){
					sum += game_data.letter_values[str[i]];
				}
		
				return sum;
			};
			var bubbling;

			do {
				bubbling = false;
				
				console.log(arr);
				for(var i = 0; i < arr.length - 1; i++){
					if (sum_word(arr[i]) < sum_word(arr[i + 1])){
						var temp = arr[i];
						arr[i] = arr[i + 1];
						arr[i + 1] = temp;
		
						bubbling = true;
					}
				} 
			}while (bubbling);
		}
	};
};

//On start, we construct our 'scrabble bag' to grab our letters
Partial_Scrabble.prototype.start = function(){
	var letters = Object.keys(game_data.letter_values);
	var stuff_bag = function(index, l){
		for (var c = 0; c < l; c ++){
			this.bag.push(letters[index])
		}
	}

	for (var i = 0; i < letters.length; i++){
		if (letters[i] == "a" || letters[i] == "b"){
			stuff_bag(i, 9);
		}else if(letters[i] == "e"){
			stuff_bag(i, 12);
		}else if(letters[i] == "r" || letters[i] == "t" || letters[i] == "n"){
			stuff_bag(i, 6)
		}else if(letters[i] == "l" || letters[i] == "s" || letters[i] == "u" || letters[i] == "d"){
			stuff_bag(i, 4)
		}else if(letters[i] == "g"){
			stuff_bag(i, 3)
		}else if(letters[i] == "k"|| letters[i] == "j" || letters[i] == "x"){
			this.bag.push(letters[i]);
		}else{
			stuff_bag(i,2)
		}
	}
	console.log('Let\'s play some almost-but-not-really scrabble, brah.');
	return this;
};

//we can have seven letter tiles at a time 
//we draw them from teh bag
//we will sort them according to their pt value
Partial_Scrabble.prototype.draw = function(){
	if (this.bag.length < 1){
		console.log("You used all the tiles. You're so greedy. You should restart, or, erm, .restart()");
		return this;
	}
	
	while (this.hand.length < 7){
		var tile = Math.floor(Math.random() * this.bag.length);
		this.hand.push(this.bag[tile]);
		this.bag.slice(tile, 1);
	}

	console.log("Your cards...");
	this.private.scrabble_sort(this.hand);
	var message = "";

	for (var i = 0; i < this.hand.length; i ++){
		message += this.hand[i] + ": " + game_data.letter_values[this.hand[i]].toString() + " pts, ";
	}
	console.log(message.trim());
	return this;
};

//and here we find the highest scoring valid word
//this is where we use all of our private functions
//this can probably be optimized, but since we are only dealing with seven tiles
//we do not have to approximate.
Partial_Scrabble.prototype.cheat = function(conn_letters){
	//the idea is that there can be 'connecting letters'
	//as you would find on a scrabble game board
	var attempt = this.hand;
	if (conn_letters){
		attempt.push(conn_letters);
	}
	//right?
	console.log("cheating takes time...");

	//find every single combinations
	var combos = this.private.all_combos(attempt);
	//and sort them according to point value
	this.private.scrabble_sort(combos);
	//this means as we go forth into our array, our first match
	//will be our highest point earner

	for (var i = 0; i < combos.length; i ++){
		//find every anagram
		var tries = this.private.all_anagrams(combos[i]);
		for (var x = 0; x < tries.length; x++){
			console.log(tries[x])
			// is this anagram a valid word?
			if (this.private.check_word(tries[x])){
				console.log('Highest possible match is ' + tries[x] + '...');
				return this;
			}
		}
	}

	console.log('no possible words. Maybe redraw? .redraw()?');
	return this;
}

Partial_Scrabble.prototype.redraw = function(scrap){
	for (var i = 0; i < this.hand.length; i++){
		if (this.hand[i] == scrap){
			this.hand.splice(i, 1)
		}
	};
	this.draw();
	return this;
}

Partial_Scrabble.prototype.end_game = function(){
	this.hand = [];
	this.bag = [];
}

Partial_Scrabble.prototype.restart = function(){
	this.end_game();
	this.start();
}
