
class Ball {
    constructor(x, y) {
      /*this.x = x;
      this.y = y;*/
      var options = { restitution: 0.8, 
        friction: 1.0, 
        density: 1.0, 
        isStatic: true }; 
        this.r = 40;
        this.body = Bodies.circle(x,y,this.r,options);
        this.image = loadImage("./assets/cannonball.png");
        this.trayectoria = [this.body.position.x,this.body.position.y];
        World.add(world,this.body);
    }
    shoot(){
        var velocity = p5.Vector.fromAngle(pistola.angle); 
        velocity.mult(20);
        Matter.Body.setStatic(this.body,false);
        Matter.Body.setVelocity(this.body,{
            x:velocity.x,
            y:velocity.y}); 
    }
    display() {
        var angle = this.body.angle;
         var pos = this.body.position;
         if(this.body.velocity.x > 0 && this.body.position.x > 300)
        {
            var position = [this.body.position.x,this.body.position.y];
            this.trayectoria.push(position);
        }
        for(var i = 0; i < this.trayectoria.length; i++){
            image(this.image,this.trayectoria[i][0],this.trayectoria[i][1],5,5);

        }
        push(); 
        translate(pos.x, pos.y); 
        rotate(angle); 
        imageMode(CENTER);
        image(this.image,0,0,this.r,this.r);  
        pop(); 
        /*console.log(pos);*/
        

    }
}
