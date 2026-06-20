// src/audio/SoundEngine.js
import howlerpkg from 'howler';
const { Howl, Howler } = howlerpkg;

class EnhancedSoundGenerator {
  constructor() {
    this.initialized = false;
    
    // Configura Howler per usare il Web Audio API globale
    Howler.autoUnlock = true;
    
    const baseUrl = import.meta.env.BASE_URL || '/';
    // Inizializza i suoni
    this.sounds = {
      arcadeIntro: new Howl({ src: [`${baseUrl}audio/arcade_intro.wav`], loop: true, volume: 0.3 }),
      bong: new Howl({ src: [`${baseUrl}audio/bong_bubble.wav`], volume: 0.8 }),
      breathRelaxed: new Howl({ src: [`${baseUrl}audio/breathing_relaxed.wav`], loop: true, volume: 0 }),
      breathHeavy: new Howl({ src: [`${baseUrl}audio/breathing_heavy.wav`], loop: true, volume: 0 }),
      heartbeat: new Howl({ src: [`${baseUrl}audio/heartbeat.wav`], loop: true, volume: 0, rate: 1.0 }),
      click: new Howl({ src: [`${baseUrl}audio/ui_click.wav`], volume: 0.4 }),
      success: new Howl({ src: [`${baseUrl}audio/success_chime.wav`], volume: 0.5 }),
      dice: new Howl({ src: [`${baseUrl}audio/dice_roll.wav`], volume: 0.8 }),
      fail: new Howl({ src: [`${baseUrl}audio/siren_fail.wav`], volume: 0.4 }),
      airportChime: new Howl({ src: [`${baseUrl}audio/airport_chime.wav`], volume: 0.6 }),
      passportStamp: new Howl({ src: [`${baseUrl}audio/border_pass.wav`], volume: 0.8 })
    };

    this.bgmStarted = false;
    this.currentParanoia = 0;
  }

  async init() {
    if (this.initialized) return;
    this.initialized = true;
    // Howler precarica in automatico a meno che non si specifichi preload: false
  }

  // --- INTRO MUSIC ---
  startIntroMusic() {
    this.init();
    if (!this.sounds.arcadeIntro.playing()) {
      this.sounds.arcadeIntro.volume(0.3); // Assicuriamoci che non sia a 0
      this.sounds.arcadeIntro.play();
    }
  }

  stopIntroMusic() {
    this.sounds.arcadeIntro.stop();
    this.sounds.arcadeIntro.volume(0); // Forziamo il volume a 0 per sicurezza
  }

  // --- CONTROLLO BGM E PARANOIA ---
  async startBGM() {
    if (this.bgmStarted) return;
    this.bgmStarted = true;
    await this.init();
    
    this.sounds.breathRelaxed.play();
    this.sounds.breathRelaxed.fade(0, 0.5, 2000);
    
    this.sounds.breathHeavy.play();
    this.sounds.heartbeat.play();
    
    this.setParanoiaLevel(this.currentParanoia); // Applica il livello corrente
  }

  async stopBGM() {
    if (this.bgmStarted) {
      this.bgmStarted = false;
      this.sounds.breathRelaxed.stop();
      this.sounds.breathHeavy.stop();
      this.sounds.heartbeat.stop();
    }
  }

  // Regola il soundscape in base alla paranoia (0 - 100)
  setParanoiaLevel(paranoia) {
    this.currentParanoia = paranoia;
    if (!this.bgmStarted) return;

    // 1. Battito Cardiaco (Aumenta volume e velocità)
    if (paranoia > 5) {
      let targetVol = ((paranoia - 5) / 95); 
      let targetRate = 1.0 + ((paranoia - 5) / 95) * 1.0; // Da 1.0 a 2.0x
      this.sounds.heartbeat.fade(this.sounds.heartbeat.volume(), targetVol, 1000);
      this.sounds.heartbeat.rate(targetRate);
    } else {
      this.sounds.heartbeat.fade(this.sounds.heartbeat.volume(), 0, 1000);
      this.sounds.heartbeat.rate(1.0);
    }

    // 3. Respiro (Crossfade tra rilassato e affannoso)
    if (paranoia > 50) {
      // Fade out rilassato, fade in affannoso
      this.sounds.breathRelaxed.fade(this.sounds.breathRelaxed.volume(), 0.05, 2000);
      
      let targetHeavyVol = ((paranoia - 50) / 50) * 0.8; 
      this.sounds.breathHeavy.fade(this.sounds.breathHeavy.volume(), targetHeavyVol, 2000);
      
      // Aumenta leggermente il rate del respiro pesante
      this.sounds.breathHeavy.rate(1.0 + ((paranoia - 50) / 50) * 0.4); 
    } else {
      // Rilassato torna su, affannoso svanisce
      let targetRelaxVol = 0.5 - (paranoia / 100);
      this.sounds.breathRelaxed.fade(this.sounds.breathRelaxed.volume(), targetRelaxVol, 2000);
      this.sounds.breathHeavy.fade(this.sounds.breathHeavy.volume(), 0, 2000);
    }
  }

  // --- EFFETTI SONORI ISTANTANEI ---

  async playHover() {
    // Rimuoviamo il suono di hover (spesso troppo invadente) o usiamo click leggerissimo
  }

  async playClick() {
    let id = this.sounds.click.play();
    this.sounds.click.rate(1.0 + Math.random() * 0.2, id); // Piccola variazione casuale per organicità
  }

  async playBubble() {
    // Un suono di gorgoglio veloce per i dadi
    let id = this.sounds.bong.play();
    this.sounds.bong.volume(0.3, id);
    // Ferma subito per fare solo un piccolo "blop"
    setTimeout(() => this.sounds.bong.stop(id), 200);
  }

  async playSiren() {
    this.sounds.fail.play();
  }

  async playChime() {
    this.sounds.success.play();
  }

  async playBorderPass() {
    // Suono altamente narrativo per il passaggio del confine: 
    // Chime dell'aeroporto/stazione + timbro del passaporto!
    this.sounds.airportChime.play();
    setTimeout(() => {
      this.sounds.passportStamp.play();
    }, 800); // Il timbro arriva poco dopo il chime per un effetto "Achievement Unlocked" molto tattile
  }

  stopBorderPass() {
    this.sounds.airportChime.stop();
    this.sounds.passportStamp.stop();
  }

  async playReflexMiniGame() {
    this.sounds.dice.play();
  }

  async playFail() {
    let id = this.sounds.fail.play();
    this.sounds.fail.rate(1.0, id);
  }

  async playHeartbeat() {
    // Ora gestito dinamicamente da setParanoiaLevel
  }

  async playBreathing() {
    // Ora gestito dinamicamente da setParanoiaLevel
  }

  async playSmoke() {
    // Il tiro di bong realistico
    let id = this.sounds.bong.play();
    this.sounds.bong.volume(0.8, id);
  }
}

export const sounds = new EnhancedSoundGenerator();
