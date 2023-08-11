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
    return `hsl(${hashCode(str) % 360}, 100%, 40%)`;
  }



  /////////////////// Alerts //////////////////////
  (function(proxied) {
    window.alert = function() {
        iosAlert(arguments[0], arguments[1], arguments[2], arguments[3]);
    }
})(window.alert);

function iosAlert() {
try {
    var $alert = document.querySelector('.alert');
    $alert.parentElement.removeChild($alert);
} catch ($error) {}

var $alert = document.createElement('span');
if (arguments[1] == null) {
    arguments[1] = window.location.protocol + '//' + window.location.hostname;
}
let onclick = true;
let text = 'OK';
let timer = 5000;
if(typeof arguments[2] !== 'undefined' ) {
   onclick = arguments[2]['onclick'];
   text = arguments[2]['text'];
}
if(typeof arguments[3] !== 'undefined' ) {
    timer = Math.round(arguments[3]);
 }
$alert.innerHTML = '<div class="alert"><div class="inner"><div class="title">' + arguments[1] + '</div><div class="text">' + arguments[0] + '</div></div><a href="#" id="btn" onclick="'+onclick+'"><div class="button">'+text+'</div></div></a>';
document.querySelector('body').appendChild($alert);
document.querySelector('.alert > a#btn').focus();

setTimeout(()=>{if(document.querySelector('.alert')) document.querySelector('.alert').remove()},timer);

setTimeout(function() {
    if(document.querySelector('.alert'))
    document.querySelector('.alert > a#btn').addEventListener("click", function() {
        $alert.parentElement.removeChild($alert);
    });
});
return false;

}

function getParam( name, url = false) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}


function thingsEqual(a, b) {
    return a.x === b.x
        && a.y === b.y;
}


function removeDuplicates(arr, equals) {
    var originalArr = arr.slice(0);
    var i, len, val;
    arr.length = 0;

    for (i = 0, len = originalArr.length; i < len; ++i) {
        val = originalArr[i];
        if (!arr.some(function(item) { return equals(item, val); })) {
            arr.push(val);
        }
    }
}

