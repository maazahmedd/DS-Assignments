/**
 * Graphics & UI Demos
 * Target drawing and Phone Keypad implementations
 */

// ============================================
// Target Drawing
// ============================================

class TargetDrawer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.numRings = 5;
        this.color1 = '#f0f0f5';
        this.color2 = '#1a1a2e';
        this.centerColor = '#ef4444';
    }

    draw() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const maxRadius = Math.min(width, height) / 2 - 10;
        const ringWidth = maxRadius / this.numRings;

        // Clear canvas
        ctx.fillStyle = '#0a0a0f';
        ctx.fillRect(0, 0, width, height);

        // Draw rings from outside to inside
        for (let i = 0; i < this.numRings; i++) {
            const radius = maxRadius - (i * ringWidth);

            // Alternate colors
            if (i === this.numRings - 1) {
                // Center ring
                ctx.fillStyle = this.centerColor;
            } else if (i % 2 === 0) {
                ctx.fillStyle = this.color1;
            } else {
                ctx.fillStyle = this.color2;
            }

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    setNumRings(num) {
        this.numRings = Math.max(1, Math.min(10, num));
        this.draw();
    }

    setColor1(color) {
        this.color1 = color;
        this.draw();
    }

    setColor2(color) {
        this.color2 = color;
        this.draw();
    }

    setCenterColor(color) {
        this.centerColor = color;
        this.draw();
    }
}

// ============================================
// Phone Keypad
// ============================================

class PhoneKeypad {
    constructor() {
        this.displayText = '';
        this.maxLength = 15;
        this.displayElement = document.getElementById('display-text');
    }

    pressKey(key) {
        if (this.displayText.length < this.maxLength) {
            this.displayText += key;
            this.updateDisplay();
            this.playTone(key);
        }
    }

    backspace() {
        this.displayText = this.displayText.slice(0, -1);
        this.updateDisplay();
    }

    clear() {
        this.displayText = '';
        this.updateDisplay();
    }

    call() {
        if (this.displayText.length > 0) {
            // Simulate a call animation
            const originalText = this.displayText;
            this.displayElement.style.color = 'var(--success)';
            this.displayText = 'Calling...';
            this.updateDisplay();

            setTimeout(() => {
                this.displayText = originalText;
                this.displayElement.style.color = '';
                this.updateDisplay();
            }, 2000);
        }
    }

    updateDisplay() {
        // Format as phone number if appropriate length
        let formatted = this.displayText;

        if (this.displayText.length > 0 && /^\d+$/.test(this.displayText)) {
            if (this.displayText.length <= 3) {
                formatted = this.displayText;
            } else if (this.displayText.length <= 6) {
                formatted = `${this.displayText.slice(0, 3)}-${this.displayText.slice(3)}`;
            } else {
                formatted = `(${this.displayText.slice(0, 3)}) ${this.displayText.slice(3, 6)}-${this.displayText.slice(6)}`;
            }
        }

        this.displayElement.textContent = formatted;
    }

    playTone(key) {
        // DTMF-like tone simulation using Web Audio API
        if (!window.AudioContext && !window.webkitAudioContext) return;

        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

            // DTMF frequency pairs (simplified)
            const frequencies = {
                '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
                '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
                '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
                '*': [941, 1209], '0': [941, 1336], '#': [941, 1477]
            };

            const freqs = frequencies[key];
            if (!freqs) return;

            const duration = 0.15;
            const gainNode = audioCtx.createGain();
            gainNode.gain.value = 0.1;
            gainNode.connect(audioCtx.destination);

            freqs.forEach(freq => {
                const oscillator = audioCtx.createOscillator();
                oscillator.type = 'sine';
                oscillator.frequency.value = freq;
                oscillator.connect(gainNode);
                oscillator.start();
                oscillator.stop(audioCtx.currentTime + duration);
            });

            // Cleanup
            setTimeout(() => {
                gainNode.disconnect();
                audioCtx.close();
            }, duration * 1000 + 100);
        } catch (e) {
            // Audio not supported, silently fail
        }
    }
}

// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Target Drawing
    const targetCanvas = document.getElementById('target-canvas');
    const target = new TargetDrawer(targetCanvas);
    target.draw();

    // Target controls
    document.getElementById('num-rings').addEventListener('change', (e) => {
        target.setNumRings(parseInt(e.target.value) || 5);
    });

    document.getElementById('ring-color-1').addEventListener('input', (e) => {
        target.setColor1(e.target.value);
    });

    document.getElementById('ring-color-2').addEventListener('input', (e) => {
        target.setColor2(e.target.value);
    });

    document.getElementById('center-color').addEventListener('input', (e) => {
        target.setCenterColor(e.target.value);
    });

    document.getElementById('redraw-target').addEventListener('click', () => {
        target.draw();
    });

    // Phone Keypad
    const keypad = new PhoneKeypad();

    // Keypad button events
    document.querySelectorAll('.keypad-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            keypad.pressKey(btn.dataset.key);
        });
    });

    document.getElementById('keypad-clear').addEventListener('click', () => {
        keypad.clear();
    });

    document.getElementById('keypad-backspace').addEventListener('click', () => {
        keypad.backspace();
    });

    document.getElementById('keypad-call').addEventListener('click', () => {
        keypad.call();
    });

    // Keyboard support for keypad
    document.addEventListener('keydown', (e) => {
        // Only handle if not in an input field
        if (e.target.tagName === 'INPUT') return;

        const key = e.key;
        if (/^[0-9*#]$/.test(key)) {
            keypad.pressKey(key);

            // Visual feedback
            const btn = document.querySelector(`.keypad-btn[data-key="${key}"]`);
            if (btn) {
                btn.classList.add('active');
                setTimeout(() => btn.classList.remove('active'), 100);
            }
        } else if (key === 'Backspace') {
            e.preventDefault();
            keypad.backspace();
        } else if (key === 'Escape') {
            keypad.clear();
        } else if (key === 'Enter') {
            keypad.call();
        }
    });
});
