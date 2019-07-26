<script>
import { push } from 'svelte-spa-router';
import NewsFlash from './index/NewsFlash.svelte';
import Footer from './common/Footer.svelte';
</script>

<main class="LyMain">
  <header class="LyHead">
    <h1 class="lyHeadMd01Logo">WORLD TRAVEL</h1>
  </header>
  <section class="MdCMN01Main">
    <div class="mdCMN01Btn" on:click={() => push('/search')}>
      <span>SEARCH TRAVEL</span>
    </div>
    <p class="mdCMN01Author">
      Photo by Annie Spratt on Unsplash
    </p>
  </section>
  <NewsFlash />
  <Footer />
</main>