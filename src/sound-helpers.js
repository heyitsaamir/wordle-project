// Small helper for playing short celebratory sounds without needing an
// external audio asset (keeps the bundle light and avoids network fetches).
const WIN_CHIME_NOTES = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

export function playWinSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    const context = new AudioContextClass();
    const noteDuration = 0.12;

    WIN_CHIME_NOTES.forEach((frequency, index) => {
      const startTime = context.currentTime + index * noteDuration;
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.type = 'triangle';
      oscillator.frequency.value = frequency;

      // Quick fade in/out per note so it sounds like a chime rather than a click.
      gainNode.gain.setValueAtTime(0.0001, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.2, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.3);

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.35);
    });

    const totalDurationMs = (WIN_CHIME_NOTES.length * noteDuration + 0.4) * 1000;
    setTimeout(() => context.close(), totalDurationMs);
  } catch (error) {
    // Sound is a nice-to-have; never let it break gameplay (e.g. unsupported browser).
    console.warn('Unable to play win sound', error);
  }
}
