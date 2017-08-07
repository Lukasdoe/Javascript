function circle(x_, y_, r_, s, circle_) {
    this.x = x_;
    this.y = y_;
    this.r = r_;
    this.parent = circle_;
    this.child = null;
    this.speed = s;
    this.angle = 0;
    this.extraangle = 0;

    this.show = function() {
        stroke(255);
        noFill();
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
        // this.xs = this.x + (this.r) * cos(this.angle);
        // this.ys = this.y + (this.r) * sin(this.angle);
        // line(this.x, this.y, this.xs, this.ys);
        if (this.child == null && this.parent != null) {
            this.xs = this.x + (this.r + 10) * cos(this.angle);
            this.ys = this.y + (this.r + 10) * sin(this.angle);
            line(this.x, this.y, this.xs, this.ys);
        }
    };

    this.addChild = function() {
        var newr = this.r * 0.5;
        var newx = this.x + this.r + newr;
        var newy = this.y;
        this.child = new circle(newx, newy, newr, -3 * this.speed, this);
        return this.child;
    }


    this.update = function() {
        this.angle += this.speed;
        if (this.parent != null) {
            var rsum = this.r + this.parent.r;
            this.x = this.parent.x + rsum * cos(this.angle);
            this.y = this.parent.y + rsum * sin(this.angle);
        }
    }

}