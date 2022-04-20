class Pirata {
    constructor(x, y, width, height,boatPos,barcoAnimate) 
    {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      var options = { restitution: 0.8, 
        friction: 1.0, 
        density: 1.0};
      this.body = Bodies.rectangle(x,y,width,height,options);
      this.image = loadImage("./assets/boat.png");
      World.add (world,this.body);  
      this.boatPosition = boatPos;
      this.animation = barcoAnimate;
    }

    display()
    {
        var angle = this.body.angle;
        var pos = this.body.position;
        var index = floor(this.speed % this.animation.length);
        push(); 
        translate(pos.x, pos.y); 
        rotate(angle); 
        imageMode(CENTER);
        image(this.animation[index], 0, this.boatPosition, this.width, this.height);
        pop(); 

    }
    Animate()
    {
      this.speed += 0.05%1.1;
    }
}
