function initialConfigurationFunction(x, y) {
	var t = true;
	var f = false;
	var cell = f; //default value
	//random config
	// var grid = [
	// 	[f, f, t, f, f],
	// 	[f, f, f, f, f],
	// 	[f, t, t, f, f],
	// 	[t, f, t, t, f],
	// 	[f, f, f, f, t]
	// ]
	
	//still block
	// var grid = [
	// 	[f, f, f, f, f],
	// 	[f, f, f, f, f],
	// 	[f, t, t, f, f],
	// 	[f, t, t, f, f],
	// 	[f, f, f, f, f]
	// ]
	
	//glider
	var grid = [
		[f, f, f, f, f],
		[t, t, t, f, f],
		[f, f, t, f, f],
		[f, t, f, f, f],
		[f, f, f, f, f]
	]
	var row = grid[y+2]; //offset of 2 to make the center of the grid behave as 0,0 instead of the upper left
	if(row!=null && row[x+2]!=null) cell = row[x+2];
	return cell;
}

function numAliveSurrounding(x, y, configurationFunction) {
	var xL=x-1;
	var xR=x+1;
	var yU=y+1;
	var yD=y-1;
	var coordsToCheck = [
			[xL,yU],
			[xL,y],
			[xL,yD],
			[x, yU],
			[x, yD],
			[xR, yU],
			[xR, y],
			[xR, yD]
		]
	var total = 0;
	for(var coordIndex in coordsToCheck) {
		var coord = coordsToCheck[coordIndex];
		if(configurationFunction(coord[0], coord[1])) {
			total++;
			if(total==4) return 4;
		}
	}
	return total;
}

function wrapConfigurationFunctionInCache(configurationFunctionToWrap) {
	var cachedReturnValues = {}
	return function(x, y) {
		var cacheKey = x.toString()+","+y.toString();
		if(!cachedReturnValues.hasOwnProperty(cacheKey)) cachedReturnValues[cacheKey]=configurationFunctionToWrap(x, y);
		return cachedReturnValues[cacheKey];
	}
}

//TODO: As a future exercise, let's explore what would have happened had we not used closures but rather forced the caller of 
//theNextConfigurationFunction to pass in currentConfigurationFunction along with x and y...
function getNextConfigurationFunction(currentConfigurationFunction) {
	var theNextConfigurationFunction = function(x, y) {
		var numAliveSurroundingCurrentCell = numAliveSurrounding(x, y, currentConfigurationFunction);
		if(!currentConfigurationFunction(x, y)) {
			//dead - come to life if exactly 3 alive surrounding squares
			if(numAliveSurroundingCurrentCell == 3) return 1; else return 0;
		} 
		else {
			//alive - say alive if 2 or 3 surrounding, else die
			if(numAliveSurroundingCurrentCell == 2 || numAliveSurroundingCurrentCell  == 3) return 1; else return 0;
		}
	}
	// return theNextConfigurationFunction;
	return wrapConfigurationFunctionInCache(theNextConfigurationFunction);
}

// What if we tried to take previousConfigurationFunction as a parameter instead of using a closure / functional?
// function postInitialConfigurationFunction(x, y, previousConfigurationFunction) {
// 	var numAliveSurroundingCurrentCellAtPreviousTime = numAliveSurrounding(x, y, previousConfigurationFunction);
// 	if(previousConfigurationFunction(x, y)===0) {
// 		//dead - come to life if exactly 3 alive surrounding squares
// 		if(numAliveSurroundingCurrentCellAtPreviousTime == 3) return 1; else return 0;
// 	} 
// 	else {
// 		//alive - say alive if 2 or 3 surrounding, else die
// 		if(numAliveSurroundingCurrentCellAtPreviousTime == 2 || numAliveSurroundingCurrentCellAtPreviousTime  == 3) return 1; else return 0;
// 	}
// }

var arrayOfConfigurationFunctions = [wrapConfigurationFunctionInCache(initialConfigurationFunction)]
// var arrayOfConfigurationFunctions = [initialConfigurationFunction]

function getCorrectConfigurationFunction(t) {
	if(arrayOfConfigurationFunctions[t]==null) {
		var previousConfigurationFunction = getCorrectConfigurationFunction(t-1);
		arrayOfConfigurationFunctions[t] = getNextConfigurationFunction(previousConfigurationFunction);
	}
	var correctConfigurationFunctionForTimeT = arrayOfConfigurationFunctions[t];
	return correctConfigurationFunctionForTimeT;
}

function getCellValue(t, x, y) {
	//this is what we would have to do without the closure/functional approach:
	// if(t==0) return initialConfigurationFunction(x, y);
	// if(t==1) return postInitialConfigurationFunction(x, y, initialConfigurationFunction);
	// if(t==2) return postInitialConfigurationFunction(x, y, function(x,y) { return postInitialConfigurationFunction(x, y, initialConfigurationFunction) });
	// if(t==3) return postInitialConfigurationFunction(x, y, function(x,y) { return postInitialConfigurationFunction(x, y, function(x,y) { return postInitialConfigurationFunction(x, y, initialConfigurationFunction) }) });
	// ...
	
	//instead, we use the functional to generate a function that just takes an x and a y, so we need not call it with these super long parameter lists like above
	var correctConfigurationFunctionForTimeT = getCorrectConfigurationFunction(t);
	var cellValue = correctConfigurationFunctionForTimeT(x, y);
	return cellValue;
}

function drawGrid(t, radius) {
	console.log('---------');
	console.log('T = '+t);
	console.log('---------');
	for(var y = radius; y>=-radius; y--) {
		var rowOutput = "";
		for(var x = -radius; x<=radius; x++) {
			var displayValue = getCellValue(t, x, y) ? 'A' : '-';
			rowOutput = rowOutput + displayValue;
		}
		console.log(rowOutput + "     " + y);
	}
	console.log('');
	console.log('');
	console.log('');
	console.log('');
}

function evolveGrid(numTimesteps, radius) {
	for(var t = 0; t < numTimesteps; t++) {
		drawGrid(t, radius);
	}
}

evolveGrid(25, 8);