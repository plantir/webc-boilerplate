<script lang="ts">
  import { Button, TextField } from "plantir-uikit";
  import Toast from "../components/common/Toast.svelte";
  import { TestService } from "../services/test";
  let {
    token,
  }: {
    token?: any;
  } = $props();
  console.log(token);

  let username = $state("");
  let password = $state("");

  function handleSubmit(event: Event) {
    event.preventDefault();
    // Handle form submission logic here
    TestService.get().then((res) => {
      console.log(res);
    });
    console.log("Username:", username, "Password:", password);
  }
</script>

<h1>hello my dear!</h1>
<p>your token is: {token}</p>

<form class="flex flex-col gap-4 max-w-xs mt-6" onsubmit={handleSubmit}>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text">Username</span>
    </div>
    <input
      type="text"
      class="input input-bordered w-full"
      bind:value={username}
      required
    />
  </label>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text">Password</span>
    </div>
    <input
      type="password"
      class="input input-bordered w-full"
      bind:value={password}
      required
    />
  </label>
  <Button color="primary" type="submit">Submit</Button>
</form>
<Toast></Toast>
