<div class="spinner-box">
  <div class="three-quarter-spinner"></div>
</div>

<style lang="scss">
  .spinner-box {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
  }
  .three-quarter-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid;
    @apply border-primary border-t-transparent;
    border-radius: 50%;
    animation: spin 0.5s linear 0s infinite;
  }
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(359deg);
    }
  }
</style>
