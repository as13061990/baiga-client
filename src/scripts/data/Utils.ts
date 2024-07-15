declare global {
  interface CanvasRenderingContext2D {
    width: number;
    height: number;
  }
}

class Utils {

  public static getStretchPoint(height: number, rows: number, position: number): number {
    const piece = height / rows;
    return piece * position - piece / 2;
  }

  public static convertTime(time: number): string {
    const hours = Math.floor(time / (60 * 60));
    const minutes = Math.floor((time - (hours * 60 * 60)) / 60);
    const seconds = time - (hours * 60 * 60) - minutes * 60;
    return hours + ':' + (minutes.toString().length === 1 ? '0' + minutes : minutes) + ':' + (seconds.toString().length === 1 ? '0' + seconds : seconds);
  }

  public static link(link: string): void {
    const a = document.createElement('a');
    a.setAttribute('target', '_blank');
    document.body.appendChild(a);
    a.href = link;
    a.click();
    document.body.removeChild(a);
  }

  public static gcd(num1: number, num2: number): number {
    while (num1 && num2) num1 > num2 ? num1 %= num2 : num2 %= num1;
    num1 += num2;
    return num1;
  }

  public static declension(score: number, words: string[] = ['балл', 'балла', 'баллов']): string {
    const lastDigit = score % 10;
    let word: string;

    if (lastDigit === 1) word = words[0];
    else if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) word = words[1];
    else word = words[2];

    if (score > 10) {
      const lastDigits = score % 100;
      if (lastDigits === 11 || lastDigits === 12 || lastDigits === 13 || lastDigits === 14) word = words[2];
    }
    return word;
  }

  public static bgCoverSizeScale(scene: Phaser.Scene, texture: string): number {
    const { width, height } = scene.cameras.main;
    const sizes: Isizes = scene.textures.list[texture].frames.__BASE;
    const w = sizes.width / width;
    const h = sizes.height / height;
    const scale = w > h ? height / sizes.height : width / sizes.width;
    return scale;
  }

  public static getMainColor(img: HTMLImageElement): { hex: string, num: number } {
    const canvas = document.createElement('canvas');
    const c = canvas.getContext('2d');
    c.width = canvas.width = img.width;
    c.height = canvas.height = img.height;
    c.clearRect(0, 0, c.width, c.height);
    c.drawImage(img, 0, 0, img.width , img.height);
    
    const colors: {[key: string]: number} = {};
    const pixels = c.getImageData(0, 0, c.width, c.height);

    for (let i = 0, data = pixels.data; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (a < (255 / 2)) continue;
      const col = ((r << 16) | (g << 8) | b).toString(16);
      if (!colors[col]) colors[col] = 0;
      colors[col]++;
    }
    
    let max = 0, color: string;

    for (const key in colors) {
      if (colors[key] > max) {
        max = colors[key];
        color = key;
      }
    }
    return {
      hex: '#' + color,
      num: Number('0x' + color)
    }
  }

  public static getSizes(scene: Phaser.Scene, texture: string): Isizes {
    return scene.textures.list[texture].frames.__BASE;
  }

  public static copy(text: string): void {
    navigator.clipboard.writeText(text).then(() => {}).catch(() => {
      const textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      textarea.innerHTML = text;
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      document.documentElement.scrollTop = 0;
      window.scrollTo(0, 0);
    });
  }

  public static formatSum(sum: number): string {
    return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
}

export default Utils;