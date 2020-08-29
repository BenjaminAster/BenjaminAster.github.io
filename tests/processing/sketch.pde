
void setup() {
	size(200, 300);
}

void draw() {

	//draw green stem
	strokeWeight(10);
	stroke(0, 128, 0);
	line(100, 100, 100, 300);

	//leafs
	ellipse(105, 200, 10, 10);
	ellipse(95, 225, 10, 10);

	//change stroke back to thin black line
	strokeWeight(1);
	stroke(0);

	//draw petals
	fill(255, 100, 0);
	ellipse(50, 50, 100, 100);
	ellipse(150, 50, 100, 100);
	ellipse(50, 150, 100, 100);
	ellipse(150, 150, 100, 100);

	//draw middle part
	fill(255, 128, 0);
	ellipse(100, 100, 100, 100);
}
