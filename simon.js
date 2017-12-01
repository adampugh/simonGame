$(document).ready(function() {
    var playerMoves = [];
    var intemIdClass = {
        1: "green",
        2: "red",
        3: "yellow",
        4: "blue"
    };
    var generatedSequence = [];
    var level = 0;
    var playerMove = false;
    var strict = false;
    var wait = false;
    console.log(intemIdClass);
    $(".intem").click(function() {
        console.log("player move is "+playerMove);
        if (playerMove) {

            var idNumber = $(this).attr("id");
            var color = $(this).css("background-color");
            console.log(idNumber, color);
            $(".audio-" + intemIdClass[idNumber]).trigger("play");
            $(this).css("background-color", intemIdClass[idNumber]);
            setTimeout(function() {
                $("." + intemIdClass[idNumber]).css("background-color", color);
            }, 500);
            playerMoves.push(parseInt(idNumber));
            console.log(playerMoves.length, level);
            moveCheck(playerMoves.length);
            if (playerMoves.length >= level) {
                playerMove = false;
            }
        }
    });

    function computermove() {
        level += 1;
        for (var e = 0; e < level; e++) {
            (function(e) {
                console.log("value of e is = " + e);
                window.setTimeout(function() {
                    var idNumber = generatedSequence[e];
                    var color = $("." + intemIdClass[idNumber]).css("background-color");
                    $(".display").text(level);
                    $(".audio-" + intemIdClass[idNumber]).trigger("play");
                    $("." + intemIdClass[idNumber]).css("background-color", intemIdClass[idNumber]);
                    setTimeout(function() {
                        $("." + intemIdClass[idNumber]).css("background-color", color);
                    }, 500);
                    console.log(idNumber, color);
                }, e * 1000)
            }(e));
        }
        setTimeout(function(){
            playerMove = true;
        },level*1000);
        playerMoves = [];
    }
    $(".start").click(function() {
        start();
    })
    $(".strict").click(function() {
        if (strict) {
            strict = false;
            $(".signal").css("background-color", "#333");
        } else {
            strict = true;
            $(".signal").css("background-color", "red");
        }
    });

    function randomGenerator() {
        for (var e = 0; e < 20; e++) {
            var a = Math.random();
            if (a < 0.25) {
                generatedSequence[e] = 1;
            } else if (a > .25 && a < .5) {
                generatedSequence[e] = 2;
            } else if (a > .5 && a < .75) {
                generatedSequence[e] = 3;
            } else {
                generatedSequence[e] = 4;
            }
        }
    }
// on 20th MOVE GREEN BUTON SINGS AND DISPLAY SHOWS **
//WHEN moveCheck WRONG NEED TO NOTIFY WITH !! ON DISPLAY CONFIRMING THAT IS WRONG
// movecheck is checked after each press.
    function moveCheck(buttonClicks) {
        console.log(generatedSequence.slice(0, level));
        console.log("======================");
        console.log(playerMoves);
        if (playerMoves.toString() == generatedSequence.slice(0, buttonClicks).toString()) {
            console.log("NOT GAME OVER");
            console.log(buttonClicks, level);
            if (buttonClicks== generatedSequence.length){
                console.log("GAME WON");
                $(".win")[0].play();
                $(".display").text("win");
                setTimeout(reset,3000);
            }
            else if (level == buttonClicks){
                setTimeout(computermove, 1000);
            }


        } else {
            if (strict) {
                reset();
                console.log("GAME OVER");
                setTimeout(function(){
                    $(".wrong")[0].currentTime = 1.5;
                    $(".wrong")[0].play();
                    $(".display").text("!!");
                },500)
                // setTimeout(computermove, 2000);
                setTimeout(start,3000);
            } else {
                playerMove = false;
                level -= 1;
                setTimeout(function(){
                    $(".wrong")[0].currentTime = 1.5;
                    $(".wrong")[0].play();
                    $(".display").text("!!");

                },500);
                setTimeout(computermove, 2000);
                console.log("KEEP TRYING");

            }
        }
    }

    function reset() {
        playerMoves = [];
        playerMove = false;
        generatedSequence = [];
        level = 0;
        $(".display").text(level);
    };

    function start() {
        reset();
        randomGenerator();
        computermove();
        // level = 1;
    }
    randomGenerator();
    console.log(generatedSequence);

})
