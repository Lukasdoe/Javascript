var path = [];
var end;
var next;
var circles = 1;
var circlefolders = [];
var circlesarr = [];

var gui;
var restart = function() {

}

var data = {
    enter: function() {
        if (gui != null) {
            gui.destroy();
        }
        circlefolders = [];
        background(51);
        angleMode(DEGREES);

        gui = new dat.GUI();
        var f1 = gui.addFolder('General');
        f1.add(data, 'enter').name("Restart");
        f1.add(data, 'addcircle').name("Add a circle");
        f1.add(data, 'removecircle').name("Remove all circles");
        f1.add(data, 'save').name("Save canvas");
        f1.add(data, 'generalspeed', 1, 80).name("Speed up").step(1);
        f1.add(data, 'max', 10, 100000).name("Max curve points");
        f1.add(data, 'showcircles').name("Show printer");

        circlefolders.push(gui.addFolder('Circle '.concat(circlefolders.length + 1)));
        circlefolders[0].add(circlesarr[0], "r").name("Radius");
        circlefolders[0].add(circlesarr[0], "speed").name("Speed");
        circlefolders[0].add(circlesarr[0], "angle").name("Angle");

        for (var j = 1; j < circles; j++) {
            circlefolders.push(gui.addFolder('Circle '.concat(circlefolders.length + 1)));
            circlefolders[j].add(circlesarr[j], "r").name("Radius");
            circlefolders[j].add(circlesarr[j], "speed").name("Speed");
            circlefolders[j].add(circlesarr[j], "angle").name("Angle");
        }

        var presets = gui.addFolder('Presets');
        presets.add(preset, 'presetone').name("Preset 1");
        presets.add(preset, 'presetonetimes', 1, 10).name("Edges").step(1);
        f1.open();
        circlesarr.forEach(function(element) {
            element.angle = 0;
        }, this);
        path = [];

    },
    addcircle: function() {
        next = next.addChild();
        circlesarr.push(next);
        end = next;
        circlefolders.push(gui.addFolder('Circle '.concat(circlefolders.length + 1)));
        circlefolders[circles].add(circlesarr[circles - 1], "r").name("Radius");
        circlefolders[circles].add(circlesarr[circles - 1], "speed").name("Speed");
        circlefolders[circles].add(circlesarr[circles - 1], "angle").name("Angle");
        circles++;
        this.enter();
    },
    removecircle: function() {
        location.reload();
    },
    save: function() {
        saveCanvas('Framepatch_picture', 'jpg');
    },
    generalspeed: 1,

    max: 10000,

    showcircles: true
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    sun = new circle(windowWidth / 2, windowHeight / 2, 100, 0.01, null);
    next = sun;
    circlesarr.push(next);
    end = next;
    data.enter();
}

function draw() {
    for (var j = 0; j < data.generalspeed; j++) {
        background(51);

        var next = sun;
        circlesarr.forEach(function(element) {
            element.update();
            if (data.showcircles) element.show();
        }, this);



        path.push(new p5.Vector(end.x, end.y));
    }
    beginShape();
    path.forEach(function(pos) {
        vertex(pos.x, pos.y);
    }, this);
    endShape();
    for (var j = 0; j < 100; j++) {
        if (path.length > data.max) {
            path.splice(0, 1);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

var preset = {
    presetonetimes: 4,
    presetone: function() {

        for (var i = 0; i < 11; i++) {
            next = next.addChild();
            circlesarr.push(next);
            end = next;
            circlesarr[circlesarr.length - 1].r = circlesarr[circlesarr.length - 2] * 0.5;
            circlesarr[circlesarr.length - 1].speed = circlesarr[circlesarr.length - 2] * -this.presetonetimes;
            circlesarr[circlesarr.length - 1].angle = 0;
            circlefolders.push(gui.addFolder('Circle '.concat(circlefolders.length + 1)));
            circlefolders[circles].add(circlesarr[circles - 1], "r").name("Radius");
            circlefolders[circles].add(circlesarr[circles - 1], "speed").name("Speed");
            circlefolders[circles].add(circlesarr[circles - 1], "angle").name("Angle");
            circles++;
        }

        this.enter();
    }
}