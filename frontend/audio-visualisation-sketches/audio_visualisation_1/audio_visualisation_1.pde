import ddf.minim.*;
import ddf.minim.analysis.*;

Minim minim;
AudioPlayer audioPlayer;
FFT fft;

float V, S, P = 1.0;
int pulseCount = 10;
float canvasHeight = 1000;
float canvasWidth = 1000;
float startTime;
float smoothedV = 0;
float smoothedP = 1.0;
float[] smoothedCenters;
float[] targetCenters;

void settings() {
  size((int) canvasWidth, (int) canvasHeight);
}

void setup() {
  minim = new Minim(this);
  audioPlayer = minim.loadFile("War-and-Peace-1.mp3");
  fft = new FFT(audioPlayer.bufferSize(), audioPlayer.sampleRate());
  audioPlayer.loop();
  startTime = millis();

  smoothedCenters = new float[10];
  targetCenters = new float[10];
}

void draw() {
  background(255);

  float volume = getVolume();
  float pitch = getPitch();
  smoothedV = lerp(smoothedV, map(volume, 0, 1, 0, 250), 0.02);
  smoothedP = lerp(smoothedP, 10.0 + 2.0 * sin(TWO_PI * ((millis() - startTime) / 20000)), 0.02);

  V = smoothedV;
  S = map(pitch, 0, 1, 0.2, 1.5);
  int maxPulseCount = 7;
  pulseCount = (int) map(V, 0, 5, 1, maxPulseCount);

  float spacing = canvasWidth / 10 / (maxPulseCount);

  for (int i = 0; i < pulseCount; i++) {
    print("pulse count: ", pulseCount, "\n");
    float C = canvasWidth / 10 + pulseCount * spacing;
    print("C", C, " spacing:", spacing, " ");
    drawPulse(C, S, smoothedP, V, color(99, 102, 241, 100));
  }
}

void drawPulse(float C, float S, float P, float V, int col) {
  fill(col);
  stroke(col);
  strokeWeight(2);
  beginShape();
  for (float x = 0; x < canvasWidth; x += 1) {
    float y = canvasHeight / 2;
    float amplitude = (V) / sqrt(TWO_PI * pow(P, 2));
    float exponent = -pow((S * x) - C, 2) / (2 * pow(P, 2));
    float wave = amplitude * exp(exponent);
    vertex(x, y - wave * canvasHeight * 0.4);
  }
  for (float x = canvasWidth; x >= 0; x -= 1) {
    float y = canvasHeight / 2;
    float amplitude = (V) / sqrt(TWO_PI * pow(P, 2));
    float exponent = -pow((S * x) - C, 2) / (2 * pow(P, 2));
    float wave = amplitude * exp(exponent);
    vertex(x, y + wave * canvasHeight * 0.4);
  }
  endShape(CLOSE);
}

float getVolume() {
  float total = 0;
  for (int i = 0; i < audioPlayer.bufferSize(); i++) {
    total += abs(audioPlayer.mix.get(i));
  }
  return total / audioPlayer.bufferSize();
}

float getPitch() {
  fft.forward(audioPlayer.mix);
  float avgFreq = 0;
  int count = 0;
  for (int i = 0; i < fft.specSize(); i++) {
    avgFreq += fft.getBand(i) * i;
    count += fft.getBand(i);
  }
  float pitch = count > 0 ? avgFreq / count : 0;
  float nyquist = audioPlayer.sampleRate() / 2.0;
  return pitch / nyquist;
}

void stop() {
  audioPlayer.close();
  minim.stop();
  super.stop();
}
