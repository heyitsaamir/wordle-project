// Small helper for playing a short celebratory sound without needing an
// external audio asset (keeps the bundle light and avoids network fetches).
// Synthesizes a deep, brassy foghorn blast using detuned low-frequency
// oscillators through a lowpass filter.
const FOGHORN_FREQUENCIES = [110, 114]; // A2, slightly detuned for a beating "brassy" tone

export function playWinSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    const context = new AudioContextClass();
    const now = context.currentTime;
    const duration = 1.3;

    const filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 700;
    filter.connect(context.destination);

    const gainNode = context.createGain();
    // Slow attack and hold, then a gentle release, like a real foghorn blast.
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.35, now + 0.25);
    gainNode.gain.setValueAtTime(0.35, now + duration - 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    gainNode.connect(filter);

    FOGHORN_FREQUENCIES.forEach((frequency) => {
      const oscillator = context.createOscillator();
      oscillator.type = 'sawtooth';
      oscillator.frequency.value = frequency;
      oscillator.connect(gainNode);
      oscillator.start(now);
      oscillator.stop(now + duration);
    });

    setTimeout(() => context.close(), (duration + 0.2) * 1000);
  } catch (error) {
    // Sound is a nice-to-have; never let it break gameplay (e.g. unsupported browser).
    console.warn('Unable to play win sound', error);
  }
}
