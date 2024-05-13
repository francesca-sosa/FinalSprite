//Parent Sprit Classa
class Sprite {
  constructor(sprite_json, x, y, start_dir) {
    this.sprite_json = sprite_json;
    this.x = x;
    this.y = y;


    //for boids -> doesn't work -> wanted to keep in the same class but probably should've made a new class
//    this.separation = 0;
//    this.cohesion = 0;
//    this.alignment = 0;


    this.root_e = "TenderBud";

    this.cur_frame = 0;

    this.cur_bk_data = null;

    switch (start_dir) {
      case "N":
        this.x_v = 0;
        this.y_v = 20;
        this.state = "walk_N";
        break;
      case "NE":
        this.x_v = 20;
        this.y_v = 20;
        this.state = "walk_NE";
        break;
      case "E":
        this.x_v = 20;
        this.y_v = 0;
        this.state = "walk_E";
        break;
      case "SE":
        this.x_v = 20;
        this.y_v = -20;
        this.state = "walk_SE";
        break;
      case "S":
        this.x_v = 0;
        this.y_v = -20;
        this.state = "walk_S";
        break;
      case "SW":
        this.x_v = -20;
        this.y_v = -20;
        this.state = "walk_SW";
        break;
      case "W":
        this.x_v = -20;
        this.y_v = 0;
        this.state = "walk_W";
        break;
      default:
        break;
      case "NW":
        this.x_v = -20;
        this.y_v = 20;
        this.state = "walk_NW";
        break;
    }

    // Schedule random direction change every 5 seconds
    setInterval(this.random_direction.bind(this), 3000);
  }

  draw(state) {
    var ctx = canvas.getContext("2d");
    //console.log(this.sprite_json[this.root_e][this.state][this.cur_frame]['w']);

    if (
      this.sprite_json[this.root_e][this.state][this.cur_frame]["img"] == null
    ) {
      console.log("loading");
      this.sprite_json[this.root_e][this.state][this.cur_frame]["img"] =
        new Image();
      this.sprite_json[this.root_e][this.state][this.cur_frame]["img"].src =
        "Penguins/" +
        this.root_e +
        "/" +
        this.state +
        "/" +
        this.cur_frame +
        ".png";
    }

    if (this.cur_bk_data != null) {
      ctx.putImageData(this.cur_bk_data, this.x - this.x_v, this.y - this.y_v);
    }

    this.cur_bk_data = ctx.getImageData(
      this.x,
      this.y,
      this.sprite_json[this.root_e][this.state][this.cur_frame]["w"],
      this.sprite_json[this.root_e][this.state][this.cur_frame]["h"]
    );

    ctx.drawImage(
      this.sprite_json[this.root_e][this.state][this.cur_frame]["img"],
      this.x,
      this.y
    );

    this.cur_frame = this.cur_frame + 1;
    if (this.cur_frame >= this.sprite_json[this.root_e][this.state].length) {
      this.cur_frame = 0;
    }

    if (
      this.x >=
      window.innerWidth -
        this.sprite_json[this.root_e][this.state][this.cur_frame]["w"]
    ) {
      this.bound_hit("E");
    } else if (this.x <= 0) {
      this.bound_hit("W");
    } else if (
      this.y >=
      window.innerHeight -
        this.sprite_json[this.root_e][this.state][this.cur_frame]["h"]
    ) {
      this.bound_hit("S");
    } else if (this.y <= 0) {
      this.bound_hit("N");
    } else {
      this.x = this.x + this.x_v;
      this.y = this.y + this.y_v;
    }

    return false;
  }

  bound_hit(side) {
    switch (side) {
      case "N":
        this.x_v = 0;
        this.y_v = 20;
        this.state = "walk_S";
        break;
      case "E":
        this.x_v = -20;
        this.y_v = 0;
        this.state = "walk_W";
        break;
      case "S":
        this.x_v = 0;
        this.y_v = -20;
        this.state = "walk_N";
        break;
      case "W":
        this.x_v = 20;
        this.y_v = 0;
        this.state = "walk_E";
        break;
      default:
        break;
    }

    this.x = this.x + this.x_v;
    this.y = this.y + this.y_v;
  }


  //for boids -> doesn't work
//  get_random(min, max) {
//  return math.random() * (max - min) + min;
//  }


  random_direction() {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const randomIndex = Math.floor(Math.random() * directions.length);
    const randomDirection = directions[randomIndex];


    //for boids -> doesn't work
//    this.separation = get_random(5, 30);
//    this.cohesion = get_random(5, 20);
//    this.alignment = get_random(5, 10);


    switch (randomDirection) {
      case "N":
        this.x_v = 0;
        this.y_v = 20;
        this.state = "walk_N";
        break;
      case "NE":
        this.x_v = 20;
        this.y_v = 20;
        this.state = "walk_NE";
        break;
      case "E":
        this.x_v = 20;
        this.y_v = 0;
        this.state = "walk_E";
        break;
      case "SE":
        this.x_v = 20;
        this.y_v = -20;
        this.state = "walk_SE";
        break;
      case "S":
        this.x_v = 0;
        this.y_v = -20;
        this.state = "walk_S";
        break;
      case "SW":
        this.x_v = -20;
        this.y_v = -20;
        this.state = "walk_SW";
        break;
      case "W":
        this.x_v = -20;
        this.y_v = 0;
        this.state = "walk_W";
        break;
      case "NW":
        this.x_v = -20;
        this.y_v = 20;
        this.state = "walk_NW";
        break;
      default:
        break;
    }
  }
}