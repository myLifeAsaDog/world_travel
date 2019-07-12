<script>
import { onMount } from 'svelte';

let lastUpdateState = '-';
let channelState = [];

$:lastUpdateComputed =  new Date(lastUpdateState).toLocaleString();

onMount(async () => {
  const res = await fetch('./data/rss.json');
  const rss = await res.json();

  if (res.ok) {
    lastUpdateState = rss.lastUpdate;
    channelState = channelConvert(rss.channel);
	}
});

const channelConvert = (channelData) => {
  const MONTH_MAP = ['Jan.','Feb.','Mar.','Apr.','May','June','July','Aug.','Sept.','Oct.','Nov.','Dec.'];
  return channelData.map((channel) => {
    const numOfMonth = new Date(channel.pubDate).getMonth()
    return {
      title: channel.title,
      link: channel.link,
      dateStr: new Date(channel.pubDate).getDate(),
      monthStr: MONTH_MAP[numOfMonth]
    };
  });
}
</script>

<section class="MdCMN02News">
  <h2 class="mdCMN02Title">
    News<time>{lastUpdateComputed}</time>
  </h2>
  <ol class="mdCMN02List">
  {#each channelState as {title,link,dateStr,monthStr} }
    <li>
      <a href={link} rel="noopener" target="_blank">
        <dl>
          <dd>{dateStr}</dd>
          <dt>{monthStr}</dt>
        </dl>
        <p>{title}</p>
      </a>
    </li>
  {/each}
  </ol>
</section>
