// class PlayerCharacterHandler {
// 	leftArm: LeftArm;
// 	rightArm: RightArm;
// 	leftLeg: LeftLeg;
// 	rightLeg: RightLeg;
// 	body: Body;
// 	head: Head;
// 	constructor() {
// 		this.body = new Body();
// 		this.head = new Head();
// 		this.leftArm = new LeftArm();
// 		this.rightArm = new RightArm();
// 		this.leftLeg = new LeftLeg();
// 		this.rightLeg = new RightLeg();

// 		this.body.rightArmJoint.setLink(this.rightArm.topJoint);
// 	}

// 	show() {
// 		let player = game.getPlayer();
// 		this.body.show(
// 			player.x - this.body.getW() / 2,
// 			player.y - this.body.getH() / 2
// 		);
// 		// this.rightArm.show();
// 	}
// }
