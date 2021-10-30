<template>
  <div class="about">
    <div class="text-center mb-4" id="web-title" @click="goToHome">
      高鐵時刻查詢
      <small><br />Ver.1</small>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="col-6">
        <p>
          作者：JS Ying<br />
          個人網站：<a href="https://jsy.tw" target="_blanl">https://jsy.tw</a>
        </p>

        <p class="mt-4">
          <u>Ver.1 版本特色</u><br />
          1. 快速查詢：打字或點擊即可篩選車站<br />
          2. 歷史查詢：最新六筆查詢紀錄<br />
          3. 票價查詢：包含團體與法優票價<br />
          4. 車次詳細時刻表：包含該車次起迄間所有進站時刻<br />
          5. 這是我第一次挑戰深色佈景的設計，希望您會喜歡
        </p>

        <p class="pt-4">
          手機使用者可以把這個網頁變成 APP 放在桌面上。<a
            href="https://jsy.tw/blog/1370/"
            target="_blank"
            >查看更多</a
          >
        </p>

        <div class="footer">
          <div id="time">
            發行日：2021-11-11，最後更新：2021-11
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "About",
  components: {},
  setup() {
    const router = useRouter();

    const goToHome = () => {
      router.push({ path: "/" });
    };

    return {
      goToHome
    };
  }
});
</script>

<style lang="scss" scoped>
small {
  font-size: 80%;
}
</style>
