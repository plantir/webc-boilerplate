<script>
  import { onMount } from "svelte";
  import { toasts } from "../../stores/toast";
  onMount(() => {
    toasts.addToast({
      text: "Hello my friend",
      type: "success",
    });
  });
  toasts.addToast({
    text: "Hello my friend 2",
    type: "error",
  });
  toasts.addToast({
    text: "Hello my friend 3",
    type: "success",
  });
  setTimeout(() => {
    console.log($toasts);
  }, 1000);
</script>

<div class="toast toast-end">
  {#each $toasts as toast}
    <div
      class="alert items-start"
      class:alert-success={toast.type == "success"}
      class:alert-error={toast.type == "error"}
    >
      <span class="text-sm pr-0">{toast.text}</span>
    </div>
  {/each}
</div>
