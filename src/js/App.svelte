<script>
import Router from 'svelte-spa-router'

import Index from './components/Index.svelte';
import Search from './components/Search.svelte';
import List from './components/List.svelte';

const routes = {
  '/': Index,
  '/search': Search,
  '/list': List
};
</script>

<Router {routes}/>