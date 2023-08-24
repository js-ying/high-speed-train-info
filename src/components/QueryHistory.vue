<template>
  <div class="row text-center" id="query-history">
    <template v-if="queryHistoryList.length > 0">
      <div class="col-12 mt-4 mb-2" id="history-text">
        歷史查詢：共 {{ queryHistoryList.length }} / 6 筆
      </div>
      <div
        class="col-12 mb-2"
        v-for="(queryHistory, $index) in queryHistoryList"
        :key="$index"
      >
        <button
          class="btn btn-gray btn-query-history"
          @click="setHistoryToSelected(queryHistory)"
        >
          {{ queryHistory[0].name }} → {{ queryHistory[1].name }}
        </button>
      </div>
      <div class="col-12">
        <svg
          @click="removeAllHistory()"
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-x-circle-fill btn-remove-all-history"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.146-3.146a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z"
          />
        </svg>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { SelectedStation } from "@/types/station";

export default defineComponent({
  name: "QueryHistory",
  components: {},
  emits: ["setHistoryToSelected"],
  setup(props, { emit }) {
    const myStorage = window.localStorage;

    const queryHistoryList: Ref<SelectedStation[][]> = ref(
      myStorage.queryHistoryList
        ? JSON.parse(myStorage.queryHistoryList).reverse()
        : []
    );

    const setHistoryToSelected = (clickedHistory: SelectedStation[]) => {
      emit("setHistoryToSelected", clickedHistory);
    };

    const removeAllHistory = () => {
      queryHistoryList.value = [];
      myStorage.removeItem("queryHistoryList");
    };

    return {
      queryHistoryList,
      setHistoryToSelected,
      removeAllHistory
    };
  }
});
</script>

<style lang="scss">
#query-history {
  .btn-query-history {
    padding: 0.1rem 0.5rem;
  }

  .btn-remove-all-history {
    font-size: 1.25rem;
    cursor: pointer;
  }

  #history-text {
    color: $taupe-gray;
    font-size: 0.9rem;
  }
}
</style>
