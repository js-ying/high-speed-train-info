<template>
  <div class="ad-banner">
    <div class="g-a-d-s">
      <ins class="adsbygoogle" style="display:block; width: 100%; height: 100%" data-ad-client="ca-pub-7992139989807299"
        data-ad-slot="1622239321"></ins>
    </div>
    <div class="text-small-gray pt-1 pl-2">
      高鐵資料即將收費，以廣告減少部份負擔，請見諒。<br />
      您的順手點擊廣告，可給予網站作者一臂之力，繼續提供優質的使用體驗給大家。
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdBanner',
  components: {
  },
  data() {
    return {
    };
  },
  methods: {
  },
}
</script>

<style scoped>
.g-a-d-s {
  border: 1px solid rgb(146, 140, 140);
  border-radius: 0.25rem;
  height: 268px;
  padding: 0.5rem;
}

@media screen and (max-width: 768px) {
  .g-a-d-s {
    height: 268px;
  }
}
</style>