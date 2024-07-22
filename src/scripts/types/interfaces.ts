interface Iposition {
  x: number;
  y: number;
}
interface IpreloadConfig {
  scene: string;
  images: { [key: string]: string };
  sounds: { [key: string]: string };
  spritesheets: { [key: string]: {
    asset: string;
    width: number;
    height: number;
  } };
}
interface Isounds {
  resumeMusic: () => void;
  pauseMusic: () => void;
  playMusic: (sound: string) => void;
  stopMusic: () => void;
  play: (sound: string) => void;
  mute: (mute: boolean) => void;
  unmute: () => void;
  getVolume: () => number;
  isMute: () => boolean;
}
interface Isizes {
  width: number;
  height: number;
}
interface Irating {
  place: number;
  record: number;
  name: string;
  self: boolean;
}
interface IobjectsPull {
  acceleration: boolean;
  shield: boolean;
  dirt: boolean;
  obstacle: boolean;
}