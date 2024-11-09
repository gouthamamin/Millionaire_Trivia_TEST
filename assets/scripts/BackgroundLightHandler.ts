import { _decorator, Component, Node, tween, UIOpacity, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BackgroundLightHandler")
export class BackgroundLightHandler extends Component {
  @property(Node)
  private light_1_flare: Node | null = null;

  @property(Node)
  private light_2_flare: Node | null = null;

  @property(Node)
  private light_side_flare: Node | null = null;

  @property(Node)
  private middle_pillar_light: Node | null = null;

  @property(Node)
  private side_wall_light: Node | null = null;

  start() {
    console.log("BackgroundLightHandler init");
    this.setupInitialLightEffects();
    this.animateLight_1_Flare();
    this.animateMiddlePillarLights();

    this.animateSideWallLights();
  }

  private setupInitialLightEffects(): void {
    // light_2_flare
    const light_1_flare_left_side =
      this.light_1_flare.getChildByName("left-side");
    const light_1_flare_right_side =
      this.light_1_flare.getChildByName("right-side");

    light_1_flare_left_side.getComponent(UIOpacity).opacity = 0;
    light_1_flare_right_side.getComponent(UIOpacity).opacity = 0;
    light_1_flare_left_side.setScale(0, 0, 0);
    light_1_flare_right_side.setScale(0, 0, 0);

    // light_2_flare
    const light_2_flare_left_side =
      this.light_2_flare.getChildByName("left-side");
    const light_2_flare_right_side =
      this.light_2_flare.getChildByName("right-side");


    // light_side_flare
    const light_side_flare_left_side =
      this.light_side_flare.getChildByName("left-side");
    const light_side_flare_right_side =
      this.light_side_flare.getChildByName("right-side");

    // middle pillar lights
    const middle_pillar_light_left_side =
      this.middle_pillar_light.getChildByName("left-pillar");
    const middle_pillar_light_right_side =
      this.middle_pillar_light.getChildByName("right-pillar");
    
    for(let i=0;i<middle_pillar_light_left_side.children.length;i++){
      middle_pillar_light_left_side.children[i].getComponent(UIOpacity).opacity = 0;
    }
    for(let i=0;i<middle_pillar_light_right_side.children.length;i++){
      middle_pillar_light_right_side.children[i].getComponent(UIOpacity).opacity = 0;
    }


    // side wall light
    const side_wall_light_left_side =
      this.side_wall_light.getChildByName("left-wall");
    const side_wall_light_right_side =
      this.side_wall_light.getChildByName("right-wall");

    const side_wall_light_left_side_first_row_lights = side_wall_light_left_side.getChildByName("first-row-lights");
    const side_wall_light_left_side_second_row_lights = side_wall_light_left_side.getChildByName("second-row-lights");
    const side_wall_light_left_side_third_row_lights = side_wall_light_left_side.getChildByName("third-row-lights");

    for(let i=0;i<side_wall_light_left_side_first_row_lights.children.length;i++){
      side_wall_light_left_side_first_row_lights.children[i].getComponent(UIOpacity).opacity = 0;
    }
    for(let i=0;i<side_wall_light_left_side_second_row_lights.children.length;i++){
      side_wall_light_left_side_second_row_lights.children[i].getComponent(UIOpacity).opacity = 0;
    }
    for(let i=0;i<side_wall_light_left_side_third_row_lights.children.length;i++){
      side_wall_light_left_side_third_row_lights.children[i].getComponent(UIOpacity).opacity = 0;
    }


    const side_wall_light_right_side_first_row_lights = side_wall_light_right_side.getChildByName("first-row-lights");
    const side_wall_light_right_side_second_row_lights = side_wall_light_right_side.getChildByName("second-row-lights");
    const side_wall_light_right_side_third_row_lights = side_wall_light_right_side.getChildByName("third-row-lights");

    for(let i=0;i<side_wall_light_right_side_first_row_lights.children.length;i++){
      side_wall_light_right_side_first_row_lights.children[i].getComponent(UIOpacity).opacity = 0;
    }
    for(let i=0;i<side_wall_light_right_side_second_row_lights.children.length;i++){
      side_wall_light_right_side_second_row_lights.children[i].getComponent(UIOpacity).opacity = 0;
    }
    for(let i=0;i<side_wall_light_right_side_third_row_lights.children.length;i++){
      side_wall_light_right_side_third_row_lights.children[i].getComponent(UIOpacity).opacity = 0;
    }

  }

  private animateLight_1_Flare(): void {
    const left_side = this.light_1_flare.getChildByName("left-side");
    const right_side = this.light_1_flare.getChildByName("right-side");

    const left_light_ui_opacity = left_side.getComponent(UIOpacity);
    const right_light_ui_opacity = right_side.getComponent(UIOpacity);
    tween(left_side)
      .to(1, { scale: new Vec3(1, 1, 1) })
      .start();

    tween(left_light_ui_opacity)
      .to(1, { opacity: 255 })
      .call(() => {
        tween(right_side)
          .to(1, { scale: new Vec3(1, 1, 1) })
          .start();
        tween(right_light_ui_opacity)
          .to(1, { opacity: 255 })
          .call(() => {
            console.log("light_1_flare finished");
            // this.animateMiddlePillarLights();
          })
          .start();
      })
      .start();
  }

  private animateMiddlePillarLights(): void {
    const leftPillarChildren = this.middle_pillar_light.getChildByName("left-pillar").children;
    const rightPillarChildren = this.middle_pillar_light.getChildByName("right-pillar").children;

    const animateLights = (lights: Node[]) => {
      lights.forEach((light, index) => {
        const uiOpacity = light.getComponent(UIOpacity);
        tween(uiOpacity)
          .delay(index * 0.2)
          .to(0.3, { opacity: 255 })
          .to(0.3, { opacity: 0 })
          .start();
      });
    };

    this.schedule(() => {
      animateLights(leftPillarChildren);
      animateLights(rightPillarChildren);
    }, 1);
  }


//   private animateSideWallLights(): void {
//     // Get rows of lights on both left and right sides
//     const sideWallLeft = this.side_wall_light.getChildByName("left-wall");
//     const sideWallRight = this.side_wall_light.getChildByName("right-wall");
  
//     const leftRows = [
//       sideWallLeft.getChildByName("first-row-lights"),
//       sideWallLeft.getChildByName("second-row-lights"),
//       sideWallLeft.getChildByName("third-row-lights")
//     ];
  
//     const rightRows = [
//       sideWallRight.getChildByName("first-row-lights"),
//       sideWallRight.getChildByName("second-row-lights"),
//       sideWallRight.getChildByName("third-row-lights")
//     ];
  
//     const animateRowLights = (rows: Node[]) => {
//       rows.forEach((row, rowIndex) => {
//         row.children.forEach((light, lightIndex) => {
//           const uiOpacity = light.getComponent(UIOpacity);
//           tween(uiOpacity)
//             .delay(rowIndex * 0.4 + lightIndex * 0.2) // Sequential delay
//             .to(0.3, { opacity: 255 })  // Fade in
//             .to(0.3, { opacity: 0 })    // Fade out
//             .start();
//         });
//       });
//     };
  
//     // Schedule continuous animation for left and right wall lights
//     this.schedule(() => {
//       animateRowLights(leftRows);
//       animateRowLights(rightRows);
//     }, 2); // Repeat every 2 seconds
//   }


private animateSideWallLights(): void {
    // Get rows of lights on both left and right sides
    const sideWallLeft = this.side_wall_light.getChildByName("left-wall");
    const sideWallRight = this.side_wall_light.getChildByName("right-wall");
  
    const leftRows = [
      sideWallLeft.getChildByName("first-row-lights"),
      sideWallLeft.getChildByName("second-row-lights"),
      sideWallLeft.getChildByName("third-row-lights")
    ];
  
    const rightRows = [
      sideWallRight.getChildByName("first-row-lights"),
      sideWallRight.getChildByName("second-row-lights"),
      sideWallRight.getChildByName("third-row-lights")
    ];
  
    const animateRowLights = (rows: Node[]) => {
      rows.forEach((row, rowIndex) => {
        row.children.forEach((light, lightIndex) => {
          const uiOpacity = light.getComponent(UIOpacity);
          tween(uiOpacity)
            .delay(lightIndex * 0.2) // Sequential delay
            .to(0.3, { opacity: 255 })  // Fade in
            .to(0.3, { opacity: 0 })    // Fade out
            .start();
        });
      });
    };
  
    // Schedule continuous animation for left and right wall lights
    this.schedule(() => {
      animateRowLights(leftRows);
      animateRowLights(rightRows);
    }, 1.25); // Repeat every 1.5 seconds
  }
  
}
