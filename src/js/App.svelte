<script>
import { routerStore } from './store.js';
import Index from './components/Index.svelte';
import Search from './components/Search.svelte';
import List from './components/List.svelte';

const routes = [Index, Search, List];
$:currentComponent = routes[$routerStore];
</script>

<svelte:component this={currentComponent}/>