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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-info-circle-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
              />
            </svg>
            發行日：2021-11-11，最後更新：2021-11
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="text-center">
        <!-- 返回按鈕 -->
        <button
          type="button"
          class="btn btn-light-blue btn-sm mt-3 mb-4"
          @click="goBack()"
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-arrow-return-left"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5.854 5.646a.5.5 0 0 1 0 .708L3.207 9l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"
            />
            <path
              fill-rule="evenodd"
              d="M13.5 2.5a.5.5 0 0 1 .5.5v4a2.5 2.5 0 0 1-2.5 2.5H3a.5.5 0 0 1 0-1h8.5A1.5 1.5 0 0 0 13 7V3a.5.5 0 0 1 .5-.5z"
            />
          </svg>
          返回
        </button>
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

    const goBack = () => {
      window.history.back();
    };

    return {
      goToHome,
      goBack
    };
  }
});
</script>

<style lang="scss" scoped>
small {
  font-size: 80%;
}

.footer {
  font-size: 0.85em;
  color: $taupe-gray;
  margin-top: 2.5rem;

  #time {
    svg {
      margin-right: 0.25rem;
    }
  }
}
</style>
