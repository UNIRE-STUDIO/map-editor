function SortByProps(item1, item2) {
    "use strict";
    var props = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        props[_i - 2] = arguments[_i];
    }
        
         var cps = []; // Stores the sort attribute comparison result.
         // If the sort attribute is not specified, it is sorted in ascending order of full attributes.    
    var asc = true;
    if (props.length < 1) {
        for (var p in item1) {
            if (item1[p] > item2[p]) {
                cps.push(1);
                                 break; // Jump out of the loop when it is greater than.
            } else if (item1[p] === item2[p]) {
                cps.push(0);
            } else {
                cps.push(-1);
                                 break; // Jump out of the loop when it is less than.
            }
        }
    } else {
        for (var i = 0; i < props.length; i++) {
            var prop = props[i];
            for (var o in prop) {
                asc = prop[o] === "asc";
                if (item1[o] > item2[o]) {
                    cps.push(asc ? 1 : -1);
                                         break; // Jump out of the loop when it is greater than.
                } else if (item1[o] === item2[o]) {
                    cps.push(0);
                } else {
                    cps.push(asc ? -1 : 1);
                                         break; // Jump out of the loop when it is less than.
                }
            }
        }
    }        
         
    for (var j = 0; j < cps.length; j++) {
        if (cps[j] === 1 || cps[j] === -1) {
            return cps[j];
        }
    }
    return 0;          

}

function hashCode(str) {
    let hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }
  
  function pickColor(str) {
    // Note the last value here is now 50% instead of 80%
    return `hsl(${hashCode(str) % 360}, 100%, 50%)`;
  }