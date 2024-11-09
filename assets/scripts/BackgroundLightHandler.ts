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
  }

  private setupInitialLightEffects(): void {
    const light_1_flare_left_side =
      this.light_1_flare.getChildByName("left-side");
    const light_1_flare_right_side =
      this.light_1_flare.getChildByName("right-side");

    light_1_flare_left_side.getComponent(UIOpacity).opacity = 0;
    light_1_flare_right_side.getComponent(UIOpacity).opacity = 0;
    light_1_flare_left_side.setScale(0, 0, 0);
    light_1_flare_right_side.setScale(0, 0, 0);
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
          })
          .start();
      })
      .start();
  }
}
