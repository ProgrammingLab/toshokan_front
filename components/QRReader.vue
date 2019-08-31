<template>
  <div>
    <canvas id="capture" ref="capture">unavailable</canvas>
  </div>
</template>

<style scoped>
#capture {
  width: 100%;
  height: 100%;
}
</style>

<script>
import jsQR from 'jsqr';

export default {
  data: () => ({
    video: null,
    dim: { width: 1280, height: 720 },
    offset: { x: 0, y: 0 },
    result: null,
  }),

  async mounted() {
    this.$refs.capture.width = this.$refs.capture.scrollWidth;
    this.$refs.capture.height = this.$refs.capture.scrollHeight;
    this.dim = { width: this.$refs.capture.width, height: this.$refs.capture.height };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', ...this.dim } })
        .then((stream) => {
          this.video = document.createElement('video');
          this.video.srcObject = stream;
          this.video.play();
          this.capture();

          const settings = stream.getVideoTracks()[0].getSettings();
          this.offset.x = this.dim.width - settings.width;
          this.offset.y = this.dim.height - settings.height;
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
    }
  },

  methods: {
    capture() {
      const ctx = this.$refs.capture.getContext('2d');
      ctx.drawImage(this.video, this.offset.x, this.offset.y);
      const code = jsQR(
        ctx.getImageData(0, 0, this.dim.width, this.dim.height).data,
        this.dim.width, this.dim.height,
      );
      if (code) {
        this.video.pause();
        ctx.strokeStyle = 'lime';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(code.location.topLeftCorner.x, code.location.topLeftCorner.y);
        ctx.lineTo(code.location.bottomLeftCorner.x, code.location.bottomLeftCorner.y);
        ctx.lineTo(code.location.bottomRightCorner.x, code.location.bottomRightCorner.y);
        ctx.lineTo(code.location.topRightCorner.x, code.location.topRightCorner.y);
        ctx.closePath();
        ctx.stroke();
        this.result = code.data;
      } else {
        window.requestAnimationFrame(this.capture);
      }
    },
  },
};
</script>
